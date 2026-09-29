// 從其他練習頁把單字加進「單字卡」（flashcards.html）。
// 跟單字卡共用同一份 localStorage 資料，欄位格式需與 flashcards.js 的 normalizeCard 一致。
(function () {
  "use strict";

  const STORAGE_KEY = "vocabDeckV1";
  const DICTIONARY_URL = "https://dictionary.cambridge.org/dictionary/english-chinese-traditional/";
  const buttons = new Set();
  let sheet = null;
  let toastEl = null;
  let toastTimer = null;

  /* ---------- 資料 ---------- */

  function clean(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function termKey(term) {
    return clean(term).toLowerCase();
  }

  function todayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }

  function createId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function readDeck() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data && Array.isArray(data.cards)) return data;
    } catch (error) {
      // 讀不到就當作還沒有字卡
    }
    return null;
  }

  function findCard(deck, term) {
    const key = termKey(term);
    return deck ? deck.cards.find((card) => termKey(card.term) === key) : null;
  }

  function hasTerm(term) {
    return Boolean(findCard(readDeck(), term));
  }

  // requeue：字已存在時，更新內容並排回今天複習（使用者自己填的內容才這樣做）
  function add(data, options = {}) {
    const term = clean(data.term);
    const meaning = clean(data.meaning);
    if (!term || !meaning) return "invalid";

    const deck = readDeck() || { cards: [], log: {}, settings: {} };
    const existing = findCard(deck, term);
    const now = Date.now();

    if (existing) {
      if (!options.requeue) return "exists";
      existing.meaning = meaning;
      existing.example = clean(data.example) || existing.example || "";
      existing.note = clean(data.note) || existing.note || "";
      existing.box = 0;
      existing.due = todayKey();
      existing.updatedAt = now;
    } else {
      deck.cards.unshift({
        id: createId(),
        term,
        meaning,
        example: clean(data.example),
        note: clean(data.note),
        box: 0,
        due: todayKey(),
        reviews: 0,
        lapses: 0,
        createdAt: now,
        updatedAt: now,
        lastReviewed: null
      });
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
    } catch (error) {
      return "error";
    }
    refreshButtons();
    return existing ? "updated" : "added";
  }

  /* ---------- 樣式 ---------- */

  function injectStyles() {
    if (document.getElementById("vq-styles")) return;
    const style = document.createElement("style");
    style.id = "vq-styles";
    style.textContent = `
      .vq-add { white-space: nowrap; }
      .vq-add:disabled { opacity: 1; cursor: default; background: #e3f4f1; border-color: #bfe3dc; color: #115e59; }
      .wrong-item .vq-add { margin-top: 8px; min-height: 36px; padding: 0 12px; font-size: 14px; }
      .vq-tappable .vq-word { cursor: pointer; border-radius: 4px; transition: background .12s; }
      .vq-tappable .vq-word:hover { background: #e3f4f1; box-shadow: 0 2px 0 #0f766e; }
      .vq-tappable .vq-word.vq-picked { background: #c9ece5; }
      .vq-hint { margin: 6px 0 0; color: #647184; font-size: 13px; }
      .vq-sheet { width: min(92vw, 480px); margin: 8vh auto auto; padding: 0; border: 0; border-radius: 18px;
        background: #fff; color: #17202a; box-shadow: 0 20px 60px rgba(0,0,0,.3); }
      .vq-sheet::backdrop { background: rgba(10,15,20,.5); }
      .vq-form { display: grid; gap: 12px; padding: 18px; font-family: inherit; }
      .vq-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .vq-head strong { font-size: 18px; }
      .vq-close { min-height: 40px; width: 40px; padding: 0; border: 0; border-radius: 50%; background: #eef2f5;
        color: #17202a; font-size: 22px; line-height: 1; cursor: pointer; }
      .vq-form label { display: grid; gap: 6px; color: #647184; font-size: 14px; font-weight: 700; }
      .vq-form input, .vq-form textarea { width: 100%; min-height: 46px; padding: 10px 12px; border: 1px solid #d9e2ea;
        border-radius: 10px; background: #fff; color: #17202a; font: inherit; font-size: 16px; font-weight: 400; box-sizing: border-box; }
      .vq-form textarea { resize: vertical; line-height: 1.5; }
      .vq-form input:focus, .vq-form textarea:focus { outline: 2px solid #0f766e; outline-offset: -1px; border-color: transparent; }
      .vq-row { display: flex; gap: 8px; }
      .vq-lookup { flex: none; display: inline-flex; align-items: center; padding: 0 12px; border-radius: 10px;
        background: #e3f4f1; color: #115e59; font-weight: 800; text-decoration: none; }
      .vq-tip, .vq-source, .vq-status { margin: -4px 0 0; color: #647184; font-size: 13px; font-weight: 400; }
      .vq-status { color: #a14c06; }
      .vq-submit { min-height: 50px; border: 0; border-radius: 12px; background: #0f766e; color: #fff;
        font: inherit; font-size: 16px; font-weight: 800; cursor: pointer; }
      .vq-submit:hover { background: #115e59; }
      .vq-toast { position: fixed; left: 50%; bottom: calc(24px + env(safe-area-inset-bottom)); z-index: 1000;
        transform: translateX(-50%); max-width: calc(100vw - 32px); padding: 10px 18px; border-radius: 999px;
        background: #17202a; color: #fff; font-size: 14px; font-weight: 700; text-align: center;
        box-shadow: 0 8px 24px rgba(0,0,0,.2); }
      .vq-toast a { color: #7fe0d3; margin-left: 8px; }
    `;
    document.head.append(style);
  }

  /* ---------- 提示訊息 ---------- */

  function toast(message, withLink) {
    injectStyles();
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "vq-toast";
      toastEl.setAttribute("role", "status");
      document.body.append(toastEl);
    }
    toastEl.textContent = message;
    if (withLink) {
      const link = document.createElement("a");
      link.href = "flashcards.html";
      link.textContent = "去複習";
      toastEl.append(link);
    }
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 2600);
  }

  /* ---------- 一鍵加入按鈕 ---------- */

  function syncButton(button) {
    const has = hasTerm(button.vqData.term);
    button.textContent = has ? "✓ 已加入" : "＋ 單字卡";
    button.disabled = has;
    button.setAttribute("aria-label", has ? `${button.vqData.term} 已在單字卡` : `把 ${button.vqData.term} 加入單字卡`);
  }

  function refreshButtons() {
    buttons.forEach((button) => {
      if (!button.isConnected) {
        buttons.delete(button);
        return;
      }
      syncButton(button);
    });
  }

  function addButton(data, className = "ghost-button") {
    injectStyles();
    const button = document.createElement("button");
    button.type = "button";
    button.className = `${className} vq-add`;
    button.vqData = data;
    button.addEventListener("click", () => {
      const result = add(data);
      if (result === "added") toast(`已加入「${clean(data.term)}」`, true);
      else if (result === "exists") toast("已經在單字卡裡了");
      else toast("加入失敗：瀏覽器無法儲存資料");
      syncButton(button);
    });
    syncButton(button);
    buttons.add(button);
    return button;
  }

  /* ---------- 點文章裡的單字 ---------- */

  const WORD_RE = /([A-Za-z](?:[A-Za-z'’-]*[A-Za-z])?)/;

  const ABBREVIATION_RE = /(?:^|[\s(])(?:Mr|Mrs|Ms|Dr|Prof|St|Jr|Sr|vs|etc|e\.g|i\.e|a\.m|p\.m|No|Inc|Ltd|Co)$/i;

  // 切句子，但不在 Ms. / p.m. 這類縮寫後面切，下一個字是小寫也不切
  function splitSentences(text) {
    const sentences = [];
    const re = /[.!?]+["'”’)]*\s+/g;
    let start = 0;
    let match;
    while ((match = re.exec(text))) {
      const before = text.slice(start, match.index);
      const next = text.charAt(re.lastIndex);
      if (ABBREVIATION_RE.test(before) || (next && !/[A-Z0-9"“'‘(]/.test(next))) continue;
      sentences.push(text.slice(start, re.lastIndex));
      start = re.lastIndex;
    }
    if (start < text.length) sentences.push(text.slice(start));
    return sentences;
  }

  // 句首的字轉小寫；句中大寫開頭的多半是人名、公司名，保留原樣
  function normalizeWord(word, isFirst) {
    const result = word.replace(/['’]s$/i, "");
    const isAcronym = result.length > 1 && result === result.toUpperCase();
    if (isAcronym || result === "I") return result;
    return isFirst ? result.toLowerCase() : result;
  }

  function enhanceText(el, options = {}) {
    if (!el) return;
    injectStyles();
    const text = el.textContent;
    el.textContent = "";
    splitSentences(text).forEach((sentence) => {
      let isFirst = true;
      sentence.split(WORD_RE).forEach((part, index) => {
        if (!part) return;
        if (index % 2 === 1) {
          const span = document.createElement("span");
          span.className = "vq-word";
          span.textContent = part;
          span.dataset.sentence = sentence.trim();
          if (isFirst) span.dataset.first = "1";
          isFirst = false;
          el.append(span);
        } else {
          el.append(document.createTextNode(part));
        }
      });
    });
    el.classList.add("vq-tappable");
    el.vqNote = options.note;

    if (!el.vqBound) {
      el.vqBound = true;
      el.addEventListener("click", (event) => {
        const word = event.target.closest(".vq-word");
        if (!word) return;
        el.querySelectorAll(".vq-picked").forEach((item) => item.classList.remove("vq-picked"));
        word.classList.add("vq-picked");
        openSheet({
          term: normalizeWord(word.textContent, word.dataset.first === "1"),
          example: word.dataset.sentence,
          note: typeof el.vqNote === "function" ? el.vqNote() : el.vqNote
        });
      });
    }

    const next = el.nextElementSibling;
    if (options.hint !== false && !(next && next.classList.contains("vq-hint"))) {
      const hint = document.createElement("p");
      hint.className = "vq-hint";
      hint.textContent = "點英文單字，可以加入單字卡";
      el.after(hint);
    }
  }

  /* ---------- 加入視窗 ---------- */

  function buildSheet() {
    injectStyles();
    const dialog = document.createElement("dialog");
    dialog.className = "vq-sheet";
    dialog.setAttribute("aria-labelledby", "vqTitle");
    dialog.innerHTML = `
      <form class="vq-form" method="dialog" autocomplete="off">
        <div class="vq-head">
          <strong id="vqTitle">加入單字卡</strong>
          <button class="vq-close" type="button" aria-label="關閉">×</button>
        </div>
        <label>
          英文單字或片語
          <span class="vq-row">
            <input name="term" type="text" lang="en" autocapitalize="off" autocorrect="off" spellcheck="false" required>
            <a class="vq-lookup" target="_blank" rel="noopener">查詞典</a>
          </span>
        </label>
        <p class="vq-tip">可以改成片語，例如 look forward to</p>
        <label>
          中文意思
          <input name="meaning" type="text" placeholder="查完詞典後填入" required>
        </label>
        <label>
          例句
          <textarea name="example" rows="2" lang="en"></textarea>
        </label>
        <p class="vq-source"></p>
        <p class="vq-status" hidden></p>
        <button class="vq-submit" type="submit">加入單字卡</button>
      </form>
    `;
    document.body.append(dialog);

    const form = dialog.querySelector("form");
    const termInput = form.elements.term;
    const lookup = dialog.querySelector(".vq-lookup");
    const status = dialog.querySelector(".vq-status");
    const submit = dialog.querySelector(".vq-submit");

    function syncTerm() {
      const term = clean(termInput.value);
      lookup.href = term ? DICTIONARY_URL + encodeURIComponent(term.toLowerCase()) : "#";
      const exists = term && hasTerm(term);
      status.hidden = !exists;
      status.textContent = exists ? "這個字已在單字卡，送出會更新內容並排入今天複習。" : "";
      submit.textContent = exists ? "更新並排入今天複習" : "加入單字卡";
    }

    termInput.addEventListener("input", syncTerm);
    dialog.querySelector(".vq-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = {
        term: termInput.value,
        meaning: form.elements.meaning.value,
        example: form.elements.example.value,
        note: dialog.vqNote
      };
      const result = add(data, { requeue: true });
      if (result === "invalid") {
        toast("請填英文和中文意思");
        return;
      }
      if (result === "error") {
        toast("加入失敗：瀏覽器無法儲存資料");
        return;
      }
      dialog.close();
      toast(result === "updated" ? `已更新「${clean(data.term)}」` : `已加入「${clean(data.term)}」`, true);
    });

    return { dialog, form, syncTerm };
  }

  function openSheet(data = {}) {
    if (!sheet) sheet = buildSheet();
    const { dialog, form, syncTerm } = sheet;
    form.reset();
    form.elements.term.value = clean(data.term);
    form.elements.example.value = clean(data.example);
    dialog.vqNote = clean(data.note);
    dialog.querySelector(".vq-source").textContent = dialog.vqNote ? `來源：${dialog.vqNote}` : "";
    syncTerm();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    form.elements.meaning.focus();
  }

  /* ---------- 其他分頁改了單字卡時更新按鈕 ---------- */

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) refreshButtons();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") refreshButtons();
  });

  window.VocabQuickAdd = { add, hasTerm, addButton, enhanceText, openSheet };
})();
