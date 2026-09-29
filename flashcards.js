"use strict";

const STORAGE_KEY = "vocabDeckV1";
const LEGACY_KEY = "englishFlashcardState";
// 間隔複習：每張卡有一個等級（box），答「記得」升一級，下次複習間隔依等級拉長（天）。
const INTERVALS = [0, 1, 2, 4, 7, 15, 30, 60, 120];
const MASTERED_BOX = 6;
const PRACTICE_SIZE = 10;
const VIEW_TITLES = { review: "複習", add: "新增單字", deck: "字卡庫", more: "更多" };

const els = {};
document.querySelectorAll("[id]").forEach((el) => {
  els[el.id] = el;
});

const state = loadState();
let session = null;
let deckFilter = "all";
let editingId = null;
let toastTimer = null;

/* ---------- 日期 ---------- */

function dateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function today() {
  return dateKey();
}

function addDays(key, days) {
  const [y, m, d] = key.split("-").map(Number);
  return dateKey(new Date(y, m - 1, d + days));
}

function daysBetween(fromKey, toKey) {
  const [y1, m1, d1] = fromKey.split("-").map(Number);
  const [y2, m2, d2] = toKey.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

/* ---------- 資料 ---------- */

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function clean(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function termKey(term) {
  return clean(term).toLowerCase();
}

function loadState() {
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    data = null;
  }
  if (!data) {
    data = migrateLegacy();
  }
  return normalizeState(data || {});
}

// 舊版「不會單字卡」的資料（同一個網站、同一個瀏覽器）自動搬過來。
function migrateLegacy() {
  try {
    const old = JSON.parse(localStorage.getItem(LEGACY_KEY));
    if (old && Array.isArray(old.cards) && old.cards.length) {
      return {
        cards: old.cards.map((card) => ({
          ...card,
          note: [card.note, card.tag].filter(Boolean).join(" · ")
        }))
      };
    }
  } catch (error) {
    // 舊資料壞掉就略過
  }
  return null;
}

function normalizeState(data) {
  const seen = new Set();
  const cards = (Array.isArray(data.cards) ? data.cards : [])
    .map(normalizeCard)
    .filter((card) => {
      if (!card || seen.has(termKey(card.term))) return false;
      seen.add(termKey(card.term));
      return true;
    });

  return {
    cards,
    log: data.log && typeof data.log === "object" ? data.log : {},
    settings: {
      direction: "en",
      accent: "us",
      autoSpeak: false,
      sessionLimit: 50,
      ...(data.settings || {})
    }
  };
}

function normalizeCard(raw) {
  if (!raw || !clean(raw.term) || !clean(raw.meaning)) return null;
  const box = Number.isInteger(raw.box)
    ? Math.min(Math.max(raw.box, 0), INTERVALS.length - 1)
    : raw.mastered ? MASTERED_BOX : 0;
  return {
    id: raw.id ? String(raw.id) : createId(),
    term: clean(raw.term),
    meaning: clean(raw.meaning),
    example: clean(raw.example),
    note: clean(raw.note),
    box,
    due: /^\d{4}-\d{2}-\d{2}$/.test(raw.due) ? raw.due : today(),
    reviews: Number(raw.reviews) || (Number(raw.correct) || 0) + (Number(raw.wrong) || 0),
    lapses: Number(raw.lapses ?? raw.wrong) || 0,
    createdAt: Number(raw.createdAt) || Date.now(),
    updatedAt: Number(raw.updatedAt) || Date.now(),
    lastReviewed: Number(raw.lastReviewed) || null
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    showToast("儲存失敗：瀏覽器空間不足或封鎖了儲存");
  }
}

function getCard(id) {
  return state.cards.find((card) => card.id === id);
}

function findByTerm(term) {
  const key = termKey(term);
  return state.cards.find((card) => termKey(card.term) === key);
}

function getDueCards() {
  const t = today();
  return state.cards
    .filter((card) => card.due <= t)
    .sort((a, b) => a.due.localeCompare(b.due) || a.box - b.box || b.lapses - a.lapses);
}

function isMastered(card) {
  return card.box >= MASTERED_BOX;
}

function addCard(data) {
  const term = clean(data.term);
  const meaning = clean(data.meaning);
  if (!term || !meaning) return null;

  const existing = findByTerm(term);
  if (existing) {
    existing.meaning = meaning;
    existing.example = clean(data.example) || existing.example;
    existing.note = clean(data.note) || existing.note;
    existing.box = 0;
    existing.due = today();
    existing.updatedAt = Date.now();
    return { card: existing, updated: true };
  }

  const card = normalizeCard({ ...data, term, meaning, box: 0, due: today(), createdAt: Date.now() });
  state.cards.unshift(card);
  requestPersistentStorage();
  return { card, updated: false };
}

function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(() => {});
  }
}

/* ---------- 排程 ---------- */

function nextSchedule(card, grade) {
  const t = today();
  if (grade === "again") {
    return { box: 0, due: t };
  }
  if (grade === "hard") {
    const box = Math.max(1, card.box);
    return { box, due: addDays(t, Math.max(1, Math.round(INTERVALS[box] / 2))) };
  }
  const box = Math.min(card.box + 1, INTERVALS.length - 1);
  return { box, due: addDays(t, INTERVALS[box]) };
}

function intervalText(days) {
  if (days <= 0) return "等下再看";
  if (days === 1) return "明天";
  if (days < 30) return `${days} 天後`;
  return `${Math.round(days / 30)} 個月後`;
}

function dueText(card) {
  const days = daysBetween(today(), card.due);
  if (days <= 0) return { text: "今天", cls: "now" };
  if (isMastered(card)) return { text: "已熟悉", cls: "mastered" };
  if (days === 1) return { text: "明天", cls: "" };
  return { text: `${days} 天後`, cls: "" };
}

function logReview() {
  const t = today();
  state.log[t] = (state.log[t] || 0) + 1;
}

function streakDays() {
  let key = today();
  if (!state.log[key]) key = addDays(key, -1);
  let count = 0;
  while (state.log[key]) {
    count += 1;
    key = addDays(key, -1);
  }
  return count;
}

/* ---------- 發音 ---------- */

// 用手機／電腦內建的語音；名稱在前面的是各平台比較自然的聲音。
const ACCENTS = {
  us: { lang: "en-US", name: "美式", prefer: /Samantha|Ava|Allison|Google US|Aria|Jenny|Guy/i },
  uk: { lang: "en-GB", name: "英式", prefer: /Daniel|Serena|Kate|Arthur|Google UK|Sonia|Libby|Ryan/i }
};
const accentVoices = { us: null, uk: null };
let voicesLoaded = false;
const warnedMissing = {};

function pickVoices() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  voicesLoaded = voices.length > 0;
  Object.entries(ACCENTS).forEach(([key, accent]) => {
    const matching = voices.filter((v) => v.lang.replace("_", "-").toLowerCase() === accent.lang.toLowerCase());
    accentVoices[key] = matching.find((v) => accent.prefer.test(v.name)) || matching.find((v) => v.localService) || matching[0] || null;
  });
}

if ("speechSynthesis" in window) {
  pickVoices();
  speechSynthesis.addEventListener("voiceschanged", pickVoices);
}

function speak(text, accentKey = state.settings.accent) {
  if (!text) return;
  if (!("speechSynthesis" in window)) {
    showToast("這個瀏覽器不支援發音");
    return;
  }
  const accent = ACCENTS[accentKey] ? accentKey : "us";
  if (!voicesLoaded) pickVoices();
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = ACCENTS[accent].lang;
  utterance.rate = 0.9;
  if (accentVoices[accent]) {
    utterance.voice = accentVoices[accent];
  } else if (voicesLoaded && !warnedMissing[accent]) {
    warnedMissing[accent] = true;
    showToast(`這個裝置沒有${ACCENTS[accent].name}語音，會用預設聲音唸`);
  }
  speechSynthesis.speak(utterance);
}

/* ---------- 分頁 ---------- */

function showTab(name) {
  if (!VIEW_TITLES[name]) name = "review";
  document.querySelectorAll(".view").forEach((view) => {
    view.hidden = view.dataset.view !== name;
  });
  document.querySelectorAll(".tabbar button").forEach((button) => {
    if (button.dataset.tab === name) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  els.viewTitle.textContent = VIEW_TITLES[name];
  if (location.hash.slice(1) !== name) {
    history.replaceState(null, "", `#${name}`);
  }
  if (name === "review") renderHome();
  if (name === "deck") renderDeck();
  if (name === "add") renderRecent();
  if (name === "more") renderMore();
  window.scrollTo(0, 0);
}

function currentTab() {
  const view = document.querySelector(".view:not([hidden])");
  return view ? view.dataset.view : "review";
}

/* ---------- 複習首頁 ---------- */

function renderBadge() {
  const due = getDueCards().length;
  els.dueBadge.hidden = !state.cards.length;
  els.dueBadge.textContent = due ? `今天 ${due} 張` : "今天完成";
}

function renderHome() {
  renderBadge();
  const due = getDueCards();
  const total = state.cards.length;
  els.dueCount.textContent = due.length;
  els.statTotal.textContent = total;
  els.statToday.textContent = state.log[today()] || 0;
  els.statStreak.textContent = streakDays();

  if (session) {
    els.reviewIdle.hidden = true;
    els.reviewDone.hidden = true;
    els.reviewSession.hidden = false;
    return;
  }

  els.reviewSession.hidden = true;
  if (!els.reviewDone.hidden) return;
  els.reviewIdle.hidden = false;

  if (!total) {
    els.idleHint.textContent = "還沒有字卡。遇到不會的英文單字，就到「新增」記下來。";
    els.startReview.textContent = "新增第一個單字";
    els.startReview.dataset.mode = "add";
    els.startReview.hidden = false;
    els.practiceMore.hidden = true;
    return;
  }

  if (due.length) {
    const limit = state.settings.sessionLimit;
    els.idleHint.textContent = due.length > limit
      ? `這一輪先複習 ${limit} 張，剩下的可以再開一輪。`
      : "先想一下意思，再翻面對答案，誠實選「忘記／模糊／記得」。";
    els.startReview.textContent = "開始複習";
    els.startReview.dataset.mode = "review";
    els.startReview.hidden = false;
    els.practiceMore.hidden = true;
    return;
  }

  const next = state.cards.reduce((min, card) => (card.due < min ? card.due : min), "9999-12-31");
  const nextCount = state.cards.filter((card) => card.due === next).length;
  const days = daysBetween(today(), next);
  els.idleHint.textContent = `今天的都複習完了。${days === 1 ? "明天" : `${days} 天後`}有 ${nextCount} 張要複習。`;
  els.startReview.hidden = true;
  els.practiceMore.hidden = false;
}

/* ---------- 複習流程 ---------- */

function startSession(cards) {
  if (!cards.length) return;
  session = {
    queue: cards.map((card) => card.id),
    total: cards.length,
    finished: 0,
    results: { again: 0, hard: 0, good: 0 },
    lapsed: new Set(),
    revealed: false,
    dir: "en"
  };
  els.reviewIdle.hidden = true;
  els.reviewDone.hidden = true;
  els.reviewSession.hidden = false;
  renderSessionCard();
}

function startDueReview() {
  startSession(getDueCards().slice(0, state.settings.sessionLimit));
}

function startPractice() {
  const weakest = [...state.cards]
    .sort((a, b) => b.lapses - a.lapses || a.box - b.box || (a.lastReviewed || 0) - (b.lastReviewed || 0))
    .slice(0, PRACTICE_SIZE);
  startSession(shuffle(weakest));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderSessionCard() {
  while (session.queue.length && !getCard(session.queue[0])) {
    session.queue.shift();
    session.total = Math.max(session.finished, session.total - 1);
  }
  if (!session.queue.length) {
    finishSession();
    return;
  }

  const card = getCard(session.queue[0]);
  const setting = state.settings.direction;
  const dir = setting === "mix" ? (Math.random() < 0.5 ? "en" : "zh") : setting;
  session.dir = dir;
  session.revealed = false;

  els.cardDirection.textContent = dir === "en" ? "看英文，想中文意思" : "看中文，想英文單字";
  els.cardPrompt.textContent = dir === "en" ? card.term : card.meaning;
  els.cardPrompt.lang = dir === "en" ? "en" : "zh-Hant";
  els.promptVoices.hidden = dir !== "en";
  els.cardAnswer.textContent = dir === "en" ? card.meaning : card.term;
  els.cardAnswer.lang = dir === "en" ? "zh-Hant" : "en";
  els.answerVoices.hidden = dir === "en";
  els.cardExample.textContent = card.example;
  els.exampleWrap.hidden = !card.example;
  els.cardNote.textContent = card.note;
  els.cardNote.hidden = !card.note;

  els.cardBack.hidden = true;
  els.tapHint.hidden = false;
  els.gradeRow.hidden = true;
  els.revealBtn.hidden = false;

  const t = today();
  els.ivAgain.textContent = intervalText(daysBetween(t, nextSchedule(card, "again").due));
  els.ivHard.textContent = intervalText(daysBetween(t, nextSchedule(card, "hard").due));
  els.ivGood.textContent = intervalText(daysBetween(t, nextSchedule(card, "good").due));

  const percent = session.total ? (session.finished / session.total) * 100 : 0;
  els.progressFill.style.width = `${percent}%`;
  els.progressText.textContent = `${session.finished} / ${session.total}`;

  if (dir === "en" && state.settings.autoSpeak) speak(card.term);
}

function reveal() {
  if (!session || session.revealed) return;
  session.revealed = true;
  els.cardBack.hidden = false;
  els.tapHint.hidden = true;
  els.revealBtn.hidden = true;
  els.gradeRow.hidden = false;
  const card = getCard(session.queue[0]);
  if (card && session.dir === "zh" && state.settings.autoSpeak) speak(card.term);
}

function grade(result) {
  if (!session || !session.revealed) return;
  const card = getCard(session.queue[0]);
  if (!card) {
    renderSessionCard();
    return;
  }

  Object.assign(card, nextSchedule(card, result));
  card.reviews += 1;
  card.lastReviewed = Date.now();
  if (result === "again" && !session.lapsed.has(card.id)) {
    card.lapses += 1;
    session.lapsed.add(card.id);
  }
  logReview();
  saveState();

  session.queue.shift();
  if (result === "again") {
    session.queue.push(card.id);
  } else {
    session.finished += 1;
    session.results[result] += 1;
  }
  if (result === "again") session.results.again += 1;

  renderBadge();
  renderSessionCard();
}

function finishSession() {
  const results = session ? session.results : { again: 0, hard: 0, good: 0 };
  session = null;
  els.reviewSession.hidden = true;
  els.reviewIdle.hidden = true;
  els.reviewDone.hidden = false;
  els.doneGood.textContent = results.good;
  els.doneHard.textContent = results.hard;
  els.doneAgain.textContent = results.again;
  const left = getDueCards().length;
  els.doneHint.textContent = left
    ? `今天還有 ${left} 張要複習，可以再開一輪。`
    : "今天的複習都完成了，明天再來！";
  renderBadge();
}

function quitSession() {
  session = null;
  els.reviewDone.hidden = true;
  renderHome();
}

/* ---------- 新增 ---------- */

function updateLookupLink() {
  const term = clean(els.termInput.value);
  if (term) {
    els.lookupLink.href = `https://dictionary.cambridge.org/dictionary/english-chinese-traditional/${encodeURIComponent(term.toLowerCase())}`;
    els.lookupLink.setAttribute("aria-disabled", "false");
  } else {
    els.lookupLink.href = "#";
    els.lookupLink.setAttribute("aria-disabled", "true");
  }
}

function handleAdd(event) {
  event.preventDefault();
  const result = addCard({
    term: els.termInput.value,
    meaning: els.meaningInput.value,
    example: els.exampleInput.value,
    note: els.noteInput.value
  });
  if (!result) {
    showToast("請填英文和中文意思");
    return;
  }
  saveState();
  els.addForm.reset();
  updateLookupLink();
  els.termInput.focus();
  showToast(result.updated
    ? `「${result.card.term}」已經有了，已更新並排入今天複習`
    : `已加入「${result.card.term}」`);
  renderBadge();
  renderRecent();
}

function parseLine(line) {
  const [first = "", example = "", note = ""] = line.split("|").map(clean);
  let term = "";
  let meaning = "";
  const separators = [/\t/, /\s+[-–—=]\s+/, /\s*[:：]\s*/, /\s*[,，]\s*/];
  for (const re of separators) {
    const match = first.match(re);
    if (match) {
      term = first.slice(0, match.index);
      meaning = first.slice(match.index + match[0].length);
      break;
    }
  }
  if (!term) {
    // 「deadline 截止日期」：從第一個中文字切開
    const match = first.match(/^(.+?)\s*([　-鿿＀-￯].*)$/);
    if (match) {
      term = match[1];
      meaning = match[2];
    }
  }
  return { term, meaning, example, note };
}

function handleBulkAdd() {
  const lines = els.bulkInput.value.split(/\r?\n/).map(clean).filter(Boolean);
  let added = 0;
  let updated = 0;
  const failed = [];
  lines.forEach((line) => {
    const result = addCard(parseLine(line));
    if (!result) failed.push(line);
    else if (result.updated) updated += 1;
    else added += 1;
  });
  if (!added && !updated) {
    showToast("沒有讀到單字，請檢查格式");
    return;
  }
  saveState();
  els.bulkInput.value = failed.join("\n");
  showToast(`新增 ${added} 張${updated ? `、更新 ${updated} 張` : ""}${failed.length ? `，${failed.length} 行格式不對` : ""}`);
  renderBadge();
  renderRecent();
}

function renderRecent() {
  const recent = [...state.cards].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
  els.recentWrap.hidden = !recent.length;
  els.recentList.innerHTML = recent.map(deckItemHtml).join("");
}

/* ---------- 字卡庫 ---------- */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function deckItemHtml(card) {
  const due = dueText(card);
  return `
    <li class="deck-item">
      <button class="deck-open" type="button" data-edit="${escapeHtml(card.id)}">
        <span class="deck-head">
          <span class="deck-term" lang="en">${escapeHtml(card.term)}</span>
          <span class="due-pill ${due.cls}">${due.text}</span>
        </span>
        <span class="deck-meaning">${escapeHtml(card.meaning)}</span>
      </button>
      <button class="icon-btn" type="button" data-speak="${escapeHtml(card.id)}" aria-label="播放 ${escapeHtml(card.term)} 發音">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>
      </button>
    </li>
  `;
}

function renderDeck() {
  const query = clean(els.searchInput.value).toLowerCase();
  const t = today();
  let cards = state.cards.filter((card) => {
    if (deckFilter === "due" && card.due > t) return false;
    if (deckFilter === "hard" && card.lapses < 2) return false;
    if (deckFilter === "mastered" && !isMastered(card)) return false;
    if (!query) return true;
    return `${card.term} ${card.meaning} ${card.example} ${card.note}`.toLowerCase().includes(query);
  });

  if (deckFilter === "due") cards.sort((a, b) => a.due.localeCompare(b.due));
  else if (deckFilter === "hard") cards.sort((a, b) => b.lapses - a.lapses);
  else if (deckFilter === "mastered") cards.sort((a, b) => a.term.localeCompare(b.term));
  else cards.sort((a, b) => b.createdAt - a.createdAt);

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.dataset.filter === deckFilter));
  });

  els.deckCount.textContent = `共 ${cards.length} 張`;
  if (!cards.length) {
    const empty = !state.cards.length
      ? "還沒有字卡，到「新增」記下第一個不會的單字吧。"
      : query ? "找不到符合的字卡。" : "這個分類目前沒有字卡。";
    els.deckList.innerHTML = `<li class="empty">${empty}</li>`;
    return;
  }
  els.deckList.innerHTML = cards.map(deckItemHtml).join("");
}

function handleListClick(event) {
  const speakBtn = event.target.closest("[data-speak]");
  if (speakBtn) {
    const card = getCard(speakBtn.dataset.speak);
    if (card) speak(card.term);
    return;
  }
  const editBtn = event.target.closest("[data-edit]");
  if (editBtn) openEdit(editBtn.dataset.edit);
}

/* ---------- 編輯 ---------- */

function openEdit(id) {
  const card = getCard(id);
  if (!card) return;
  editingId = id;
  els.editTerm.value = card.term;
  els.editMeaning.value = card.meaning;
  els.editExample.value = card.example;
  els.editNote.value = card.note;
  const due = daysBetween(today(), card.due);
  els.editInfo.textContent = `複習 ${card.reviews} 次 · 忘記 ${card.lapses} 次 · 下次：${due <= 0 ? "今天" : intervalText(due)}`;
  els.editDialog.showModal();
}

function closeEdit() {
  editingId = null;
  if (els.editDialog.open) els.editDialog.close();
}

function saveEdit(event) {
  event.preventDefault();
  const card = getCard(editingId);
  if (!card) {
    closeEdit();
    return;
  }
  const term = clean(els.editTerm.value);
  const meaning = clean(els.editMeaning.value);
  if (!term || !meaning) {
    showToast("英文和中文意思都要填");
    return;
  }
  const other = findByTerm(term);
  if (other && other.id !== card.id) {
    showToast(`已經有「${other.term}」這張字卡`);
    return;
  }
  Object.assign(card, {
    term,
    meaning,
    example: clean(els.editExample.value),
    note: clean(els.editNote.value),
    updatedAt: Date.now()
  });
  saveState();
  closeEdit();
  showToast("已儲存");
  refreshCurrent();
}

function relearnEdit() {
  const card = getCard(editingId);
  if (!card) return;
  card.box = 0;
  card.due = today();
  saveState();
  closeEdit();
  showToast(`「${card.term}」已排入今天複習`);
  refreshCurrent();
}

function deleteEdit() {
  const card = getCard(editingId);
  if (!card) return;
  if (!confirm(`刪除「${card.term}」這張字卡？`)) return;
  state.cards = state.cards.filter((item) => item.id !== card.id);
  saveState();
  closeEdit();
  showToast("已刪除");
  refreshCurrent();
}

function refreshCurrent() {
  renderBadge();
  const tab = currentTab();
  if (tab === "deck") renderDeck();
  if (tab === "add") renderRecent();
  if (tab === "review") renderHome();
  if (tab === "more") renderMore();
}

/* ---------- 更多 ---------- */

function renderMore() {
  document.querySelectorAll('input[name="direction"]').forEach((input) => {
    input.checked = input.value === state.settings.direction;
  });
  document.querySelectorAll('input[name="accent"]').forEach((input) => {
    input.checked = input.value === state.settings.accent;
  });
  els.autoSpeak.checked = Boolean(state.settings.autoSpeak);
  els.sessionLimit.value = String(state.settings.sessionLimit);
  els.statLearning.textContent = state.cards.filter((card) => !isMastered(card)).length;
  els.statMastered.textContent = state.cards.filter(isMastered).length;
  els.statReviews.textContent = Object.values(state.log).reduce((sum, n) => sum + n, 0);
}

function exportBackup() {
  if (!state.cards.length) {
    showToast("還沒有字卡可以備份");
    return;
  }
  const payload = { app: "vocab-cards", version: 1, exportedAt: new Date().toISOString(), ...state };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `單字卡備份-${today()}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function importBackup(file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch (error) {
    showToast("讀不到這個檔案，請選擇匯出的 .json 備份");
    return;
  }
  const incoming = Array.isArray(data) ? data : data && Array.isArray(data.cards) ? data.cards : null;
  if (!incoming) {
    showToast("這個檔案裡沒有字卡資料");
    return;
  }

  let added = 0;
  let skipped = 0;
  incoming.map(normalizeCard).filter(Boolean).forEach((card) => {
    if (findByTerm(card.term)) {
      skipped += 1;
      return;
    }
    if (getCard(card.id)) card.id = createId();
    state.cards.push(card);
    added += 1;
  });

  if (data && data.log && typeof data.log === "object") {
    Object.entries(data.log).forEach(([key, count]) => {
      state.log[key] = Math.max(state.log[key] || 0, Number(count) || 0);
    });
  }

  saveState();
  refreshCurrent();
  showToast(`匯入 ${added} 張${skipped ? `，${skipped} 張已存在所以略過` : ""}`);
}

function clearAll() {
  if (!state.cards.length) {
    showToast("目前沒有字卡");
    return;
  }
  if (!confirm(`確定要刪除全部 ${state.cards.length} 張字卡嗎？建議先匯出備份。刪除後無法復原。`)) return;
  state.cards = [];
  session = null;
  saveState();
  refreshCurrent();
  showToast("已刪除全部字卡");
}

/* ---------- 提示 ---------- */

function showToast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.hidden = true;
  }, 2400);
}

/* ---------- 事件 ---------- */

document.querySelectorAll(".tabbar button").forEach((button) => {
  button.addEventListener("click", () => showTab(button.dataset.tab));
});
window.addEventListener("hashchange", () => showTab(location.hash.slice(1)));

els.startReview.addEventListener("click", () => {
  if (els.startReview.dataset.mode === "add") showTab("add");
  else startDueReview();
});
els.practiceMore.addEventListener("click", startPractice);
els.quitReview.addEventListener("click", quitSession);
els.doneBack.addEventListener("click", () => {
  els.reviewDone.hidden = true;
  renderHome();
});
// 卡片上的「美式／英式」按鈕只負責發音，點卡片其他地方才翻面。
els.flashcard.addEventListener("click", (event) => {
  const button = event.target.closest("[data-accent]");
  if (!button) {
    reveal();
    return;
  }
  const card = session && getCard(session.queue[0]);
  if (!card) return;
  const target = button.closest("[data-say]").dataset.say;
  speak(target === "example" ? card.example : card.term, button.dataset.accent);
});
els.revealBtn.addEventListener("click", reveal);
els.gradeRow.addEventListener("click", (event) => {
  const button = event.target.closest("[data-grade]");
  if (button) grade(button.dataset.grade);
});

els.addForm.addEventListener("submit", handleAdd);
els.termInput.addEventListener("input", updateLookupLink);
els.termInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    els.meaningInput.focus();
  }
});
els.bulkAdd.addEventListener("click", handleBulkAdd);
els.recentList.addEventListener("click", handleListClick);

els.searchInput.addEventListener("input", renderDeck);
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    deckFilter = chip.dataset.filter;
    renderDeck();
  });
});
els.deckList.addEventListener("click", handleListClick);

els.editForm.addEventListener("submit", saveEdit);
els.editCancel.addEventListener("click", closeEdit);
els.editRelearn.addEventListener("click", relearnEdit);
els.editDelete.addEventListener("click", deleteEdit);
els.editDialog.addEventListener("click", (event) => {
  if (event.target === els.editDialog) closeEdit();
});

document.querySelectorAll('input[name="direction"]').forEach((input) => {
  input.addEventListener("change", () => {
    state.settings.direction = input.value;
    saveState();
  });
});
document.querySelectorAll('input[name="accent"]').forEach((input) => {
  input.addEventListener("change", () => {
    state.settings.accent = input.value;
    saveState();
    speak("schedule", input.value); // 試聽：schedule 美英唸法差很多
  });
});
els.autoSpeak.addEventListener("change", () => {
  state.settings.autoSpeak = els.autoSpeak.checked;
  saveState();
});
els.sessionLimit.addEventListener("change", () => {
  state.settings.sessionLimit = Number(els.sessionLimit.value);
  saveState();
});
els.exportBtn.addEventListener("click", exportBackup);
els.importBtn.addEventListener("click", () => els.importFile.click());
els.importFile.addEventListener("change", () => {
  const file = els.importFile.files[0];
  if (file) importBackup(file);
  els.importFile.value = "";
});
els.clearAll.addEventListener("click", clearAll);

// 電腦鍵盤：空白鍵翻面，1／2／3 評分
document.addEventListener("keydown", (event) => {
  if (!session || currentTab() !== "review" || els.editDialog.open) return;
  const target = event.target instanceof Element ? event.target : document.body;
  if (target.closest("input, textarea, select")) return;
  const onButton = target.closest("button, a");
  if ((event.key === " " || event.key === "Enter") && !session.revealed && !onButton) {
    event.preventDefault();
    reveal();
  } else if (session.revealed && ["1", "2", "3"].includes(event.key)) {
    grade({ 1: "again", 2: "hard", 3: "good" }[event.key]);
  }
});

// 其他練習頁可能剛加入單字，先重新讀取，避免用舊資料覆蓋掉。
function reloadState() {
  const fresh = loadState();
  state.cards = fresh.cards;
  state.log = fresh.log;
  state.settings = fresh.settings;
}

window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  reloadState();
  refreshCurrent();
});

// 回到這頁（或隔天再打開）時更新「今天要複習」
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  reloadState();
  refreshCurrent();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

try {
  if (!localStorage.getItem(STORAGE_KEY) && state.cards.length) saveState();
} catch (error) {
  // 無法使用 localStorage（例如私密瀏覽被封鎖）時仍可顯示頁面
}
showTab(location.hash.slice(1) || "review");
