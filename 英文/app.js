const today = new Date();
const todayKey = formatDateKey(today);

const weeklyPacks = [
  {
    name: "職場與預約",
    lessons: [
      lesson(
        [
          ["confirm", "確認", "Please confirm your appointment by Friday."],
          ["schedule", "安排；行程", "The meeting is on my schedule."],
          ["invoice", "發票", "We sent the invoice this morning."],
          ["available", "有空的；可取得的", "The manager is available after 3 p.m."],
          ["repair", "修理", "The printer needs repair."]
        ],
        "Good morning, Ms. Lee. This is David from Green Office Supply. I am calling to confirm your delivery for tomorrow afternoon. If the time is not convenient, please contact us before 5 p.m. today.",
        "早安，李小姐。我是 Green Office Supply 的 David。我打來確認您明天下午的配送。如果時間不方便，請在今天下午五點前聯絡我們。",
        "The manager is not available now. She ___ a client in the meeting room.",
        ["is meeting", "meet", "meets", "met"],
        "is meeting",
        "now 表示現在進行中的動作，所以用 is meeting。",
        "請用英文寫一句：你想確認明天下午的會議時間。",
        "I would like to confirm the meeting time for tomorrow afternoon."
      ),
      lesson(
        [
          ["purchase", "購買", "The company will purchase new computers."],
          ["delay", "延誤", "The flight delay lasted two hours."],
          ["department", "部門", "Please contact the sales department."],
          ["receipt", "收據", "Keep your receipt for a refund."],
          ["attend", "參加", "I will attend the training session."]
        ],
        "Attention, passengers. Flight 218 to Tokyo has been delayed because of bad weather. The new departure time is 6:45 p.m. Please check the monitors near Gate 12 for updates.",
        "各位旅客請注意。飛往東京的 218 班機因天氣不佳延誤。新的起飛時間是晚上 6:45。請查看 12 號登機門附近的螢幕以取得更新。",
        "Please keep your ___ if you want to return the item.",
        ["receipt", "department", "schedule", "repair"],
        "receipt",
        "退貨通常需要收據，所以答案是 receipt。",
        "請用英文寫一句：你的班機因為天氣延誤了。",
        "My flight was delayed because of bad weather."
      ),
      lesson(
        [
          ["recommend", "推薦", "Can you recommend a good restaurant?"],
          ["policy", "政策；規定", "Please read the company policy."],
          ["reserve", "預訂", "I would like to reserve a table for two."],
          ["increase", "增加", "Sales increased last month."],
          ["complete", "完成", "Please complete the form online."]
        ],
        "Thank you for calling City Fitness Center. Our office hours are from 8 a.m. to 9 p.m. Members can reserve exercise classes online. Please complete your reservation at least one day before the class.",
        "感謝您致電 City Fitness Center。我們的辦公時間是上午 8 點到晚上 9 點。會員可以在線上預約運動課程。請至少在課程前一天完成預約。",
        "Members can ___ classes online.",
        ["reserve", "delay", "repair", "attend"],
        "reserve",
        "reserve classes 是預約課程，最符合句意。",
        "請用英文寫一句：你想預訂兩人座位。",
        "I would like to reserve a table for two."
      ),
      lesson(
        [
          ["submit", "提交", "Please submit the report by noon."],
          ["review", "檢查；回顧", "The supervisor will review your application."],
          ["branch", "分店；分公司", "The new branch opens next Monday."],
          ["customer", "顧客", "The customer asked for a refund."],
          ["training", "訓練", "All staff must attend safety training."]
        ],
        "This is a reminder that all employees must submit the safety form by noon on Friday. If you have questions, please ask your supervisor before the end of the day.",
        "提醒各位員工，所有人都必須在星期五中午前提交安全表格。如果有問題，請在今天下班前詢問主管。",
        "All staff must ___ safety training next week.",
        ["attend", "invoice", "delay", "reserve"],
        "attend",
        "attend training 是參加訓練。",
        "請用英文寫一句：你會在星期五中午前提交報告。",
        "I will submit the report by noon on Friday."
      ),
      lesson(
        [
          ["replace", "替換", "We need to replace the old printer."],
          ["appointment", "預約", "I have a dental appointment at 2 p.m."],
          ["location", "地點", "The new office location is near the station."],
          ["discount", "折扣", "This coupon gives you a ten percent discount."],
          ["prepare", "準備", "Please prepare the slides before the meeting."]
        ],
        "The marketing meeting has been moved to Room 305. Please prepare your sales numbers and bring a copy of last month's report. The meeting will begin at 10 a.m.",
        "行銷會議已移到 305 會議室。請準備你的銷售數字，並帶一份上個月報告的影本。會議將在上午 10 點開始。",
        "Please ___ the slides before the meeting.",
        ["prepare", "replace", "increase", "repair"],
        "prepare",
        "prepare the slides 是準備投影片。",
        "請用英文寫一句：會議地點改到 305 室。",
        "The meeting location has changed to Room 305."
      ),
      lesson(
        [
          ["deliver", "配送；遞送", "The package will be delivered tomorrow."],
          ["budget", "預算", "The project is over budget."],
          ["approve", "批准", "The director approved the plan."],
          ["contact", "聯絡", "Please contact me by email."],
          ["equipment", "設備", "The office needs new equipment."]
        ],
        "Your package will be delivered between 1 p.m. and 3 p.m. tomorrow. If nobody is available to receive it, the driver will leave a notice at your door.",
        "您的包裹將於明天下午 1 點到 3 點之間送達。如果沒有人可以收件，司機會在門口留下通知。",
        "The director ___ the plan yesterday.",
        ["approved", "approve", "approves", "approving"],
        "approved",
        "yesterday 是過去時間，所以用 approved。",
        "請用英文寫一句：包裹會在明天下午送達。",
        "The package will be delivered tomorrow afternoon."
      ),
      lesson(
        [
          ["annual", "年度的", "The annual report is ready."],
          ["benefit", "福利；好處", "This job has good benefits."],
          ["cancel", "取消", "We need to cancel the reservation."],
          ["require", "需要；要求", "This position requires two years of experience."],
          ["update", "更新", "Please update your contact information."]
        ],
        "The annual staff meeting will take place next Thursday at 9 a.m. All employees are required to attend. Please update your contact information before the meeting.",
        "年度員工會議將於下週四上午 9 點舉行。所有員工都必須參加。請在會議前更新你的聯絡資料。",
        "All employees are ___ to attend the meeting.",
        ["required", "require", "requiring", "requires"],
        "required",
        "be required to 是被要求做某事。",
        "請用英文寫一句：所有員工都必須參加年度會議。",
        "All employees are required to attend the annual meeting."
      )
    ]
  },
  {
    name: "購物、旅遊與客服",
    lessons: [
      lesson(
        [
          ["exchange", "交換；兌換", "I would like to exchange this shirt."],
          ["refund", "退款", "The store gave me a refund."],
          ["damaged", "損壞的", "The box arrived damaged."],
          ["warranty", "保固", "The camera has a one-year warranty."],
          ["charge", "收費", "There is an extra charge for delivery."]
        ],
        "Thank you for shopping with us. If your item is damaged, please bring your receipt to the service desk within seven days. We can offer an exchange or a refund.",
        "感謝您在本店購物。如果商品損壞，請在七天內帶收據到服務櫃台。我們可以提供換貨或退款。",
        "The store gave me a ___ for the damaged item.",
        ["refund", "schedule", "branch", "policy"],
        "refund",
        "商品有問題時，店家可能會給 refund，也就是退款。",
        "請用英文寫一句：你想換這件襯衫。",
        "I would like to exchange this shirt."
      ),
      lesson(
        [
          ["boarding", "登機", "Boarding will begin at Gate 6."],
          ["luggage", "行李", "My luggage is too heavy."],
          ["arrival", "抵達", "The arrival time is 8:20 p.m."],
          ["departure", "出發", "The departure gate has changed."],
          ["passport", "護照", "Please show your passport."]
        ],
        "Passengers on Flight 509 should proceed to Gate 6. Boarding will begin in fifteen minutes. Please have your passport and boarding pass ready.",
        "搭乘 509 班機的旅客請前往 6 號登機門。登機將在十五分鐘後開始。請準備好護照和登機證。",
        "Please have your passport and boarding pass ___.",
        ["ready", "late", "empty", "closed"],
        "ready",
        "have something ready 是把某物準備好。",
        "請用英文寫一句：登機會在十五分鐘後開始。",
        "Boarding will begin in fifteen minutes."
      ),
      lesson(
        [
          ["complaint", "抱怨；投訴", "The customer made a complaint."],
          ["respond", "回覆", "Please respond to the email today."],
          ["issue", "問題", "We are working on the issue."],
          ["apologize", "道歉", "We apologize for the delay."],
          ["solution", "解決方法", "We found a solution."]
        ],
        "We apologize for the problem with your order. Our team is checking the issue now and will respond by email this afternoon with a solution.",
        "很抱歉您的訂單發生問題。我們的團隊正在確認問題，今天下午會用 email 回覆解決方法。",
        "We apologize ___ the delay.",
        ["for", "to", "at", "by"],
        "for",
        "apologize for something 表示為某事道歉。",
        "請用英文寫一句：我們今天下午會回覆你。",
        "We will respond to you this afternoon."
      ),
      lesson(
        [
          ["membership", "會員資格", "Membership includes free classes."],
          ["renew", "續約；更新", "I need to renew my membership."],
          ["fee", "費用", "The monthly fee is thirty dollars."],
          ["access", "使用權限", "Members have access to the gym."],
          ["expire", "到期", "My card will expire next month."]
        ],
        "Your gym membership will expire at the end of this month. To renew it, please visit the front desk or complete the payment online.",
        "您的健身房會員資格將在本月底到期。若要續約，請到櫃台辦理或在線上完成付款。",
        "My membership will ___ next month.",
        ["expire", "attend", "approve", "deliver"],
        "expire",
        "expire 是到期，常用於卡片、會員、期限。",
        "請用英文寫一句：我需要續約我的會員資格。",
        "I need to renew my membership."
      ),
      lesson(
        [
          ["brochure", "手冊", "Please read the travel brochure."],
          ["tour", "旅遊行程", "The city tour starts at 9 a.m."],
          ["guide", "導遊；指南", "Our guide speaks English."],
          ["included", "包含的", "Breakfast is included."],
          ["itinerary", "行程表", "The itinerary is on page two."]
        ],
        "The city tour starts at 9 a.m. Breakfast is included, but lunch is not. Please check the itinerary for meeting times and locations.",
        "城市旅遊上午 9 點開始。早餐包含在內，但午餐不包含。請查看行程表確認集合時間和地點。",
        "Breakfast is ___, but lunch is not.",
        ["included", "expired", "damaged", "delayed"],
        "included",
        "included 表示已包含在內。",
        "請用英文寫一句：早餐包含在旅遊費用裡。",
        "Breakfast is included in the tour price."
      ),
      lesson(
        [
          ["rent", "租用", "We need to rent a car."],
          ["vehicle", "車輛", "This vehicle is easy to drive."],
          ["license", "駕照；執照", "Please show your driver's license."],
          ["insurance", "保險", "Insurance is included in the price."],
          ["return", "歸還", "Please return the car by 6 p.m."]
        ],
        "To rent a vehicle, please show your driver's license and a credit card. Insurance is included, but you must return the car with a full tank of gas.",
        "若要租車，請出示駕照和信用卡。保險已包含在價格中，但您必須加滿油後還車。",
        "Please ___ the car by 6 p.m.",
        ["return", "refund", "respond", "review"],
        "return",
        "return the car 是歸還車輛。",
        "請用英文寫一句：我需要租一台車。",
        "I need to rent a car."
      ),
      lesson(
        [
          ["survey", "問卷調查", "Please complete the customer survey."],
          ["satisfied", "滿意的", "Most customers were satisfied."],
          ["quality", "品質", "The quality of the product is high."],
          ["improve", "改善", "We want to improve our service."],
          ["comment", "評論；意見", "Thank you for your comments."]
        ],
        "Please complete our customer survey. Your comments will help us improve the quality of our service. The survey takes about three minutes.",
        "請完成我們的顧客問卷。您的意見會幫助我們改善服務品質。這份問卷大約需要三分鐘。",
        "Your comments will help us ___ our service.",
        ["improve", "expire", "cancel", "charge"],
        "improve",
        "improve service 是改善服務。",
        "請用英文寫一句：這份問卷大約需要三分鐘。",
        "The survey takes about three minutes."
      )
    ]
  },
  {
    name: "餐廳與訂餐",
    lessons: [
      lesson(
        [
          ["menu", "菜單", "Please look at the menu first."],
          ["order", "點餐；訂購", "I would like to order a sandwich."],
          ["serve", "服務；供應", "Breakfast is served until 10 a.m."],
          ["recommendation", "推薦", "Do you have any recommendations?"],
          ["vegetarian", "素食的", "Do you have a vegetarian meal?"]
        ],
        "Welcome to Bella Cafe. Breakfast is served until 10 a.m. If you need a vegetarian meal, please ask our server for recommendations.",
        "歡迎來到 Bella Cafe。早餐供應到上午 10 點。如果您需要素食餐點，請向服務人員詢問推薦。",
        "Breakfast is ___ until 10 a.m.",
        ["served", "ordered", "charged", "updated"],
        "served",
        "餐點被供應常用 be served。",
        "請用英文寫一句：你想點一份三明治。",
        "I would like to order a sandwich."
      ),
      lesson(
        [
          ["reservation", "訂位", "I made a reservation for six people."],
          ["table", "桌位", "We need a table by the window."],
          ["waiter", "男服務生", "The waiter brought us water."],
          ["special", "特餐；特別的", "Today's special is grilled fish."],
          ["dessert", "甜點", "Would you like dessert?"]
        ],
        "Good evening. I have a reservation for six people under the name Chen. If possible, we would like a table by the window.",
        "晚安。我有一個陳先生名下六人的訂位。如果可以，我們想要靠窗的桌位。",
        "I have a reservation ___ six people.",
        ["for", "at", "by", "to"],
        "for",
        "reservation for six people 表示六人的訂位。",
        "請用英文寫一句：你有六人的訂位。",
        "I have a reservation for six people."
      ),
      lesson(
        [
          ["bill", "帳單", "Could we have the bill, please?"],
          ["cash", "現金", "I paid in cash."],
          ["credit card", "信用卡", "Do you accept credit cards?"],
          ["tip", "小費", "The tip is not included."],
          ["separate", "分開的", "Can we have separate checks?"]
        ],
        "Thank you for dining with us. You may pay by cash or credit card. Please note that the tip is not included in the bill.",
        "感謝您在本店用餐。您可以用現金或信用卡付款。請注意，小費不包含在帳單內。",
        "The tip is not ___ in the bill.",
        ["included", "damaged", "expired", "reserved"],
        "included",
        "included in the bill 表示包含在帳單裡。",
        "請用英文寫一句：你想用信用卡付款。",
        "I would like to pay by credit card."
      ),
      lesson(
        [
          ["spicy", "辣的", "This soup is very spicy."],
          ["fresh", "新鮮的", "The salad is fresh."],
          ["ingredient", "食材；成分", "What ingredients are in this dish?"],
          ["allergy", "過敏", "I have a peanut allergy."],
          ["sauce", "醬汁", "The sauce is too sweet."]
        ],
        "Before you order, please tell your server about any food allergies. Some dishes contain peanuts, milk, or seafood.",
        "點餐前，請告訴服務人員您是否有食物過敏。有些餐點含有花生、牛奶或海鮮。",
        "Please tell your server about any food ___.",
        ["allergies", "menus", "tables", "tips"],
        "allergies",
        "food allergy 是食物過敏，複數可用 allergies。",
        "請用英文寫一句：你對花生過敏。",
        "I have a peanut allergy."
      ),
      lesson(
        [
          ["takeout", "外帶", "I would like this for takeout."],
          ["delivery", "外送；配送", "Delivery takes about thirty minutes."],
          ["container", "容器", "Please put it in a container."],
          ["napkin", "餐巾紙", "Could I have some napkins?"],
          ["straw", "吸管", "Do you need a straw?"]
        ],
        "Takeout orders are ready near the front counter. If you need extra napkins or straws, please ask a staff member.",
        "外帶訂單可在前方櫃台附近領取。如果您需要額外餐巾紙或吸管，請詢問員工。",
        "Delivery takes ___ thirty minutes.",
        ["about", "under", "with", "during"],
        "about",
        "about thirty minutes 表示大約三十分鐘。",
        "請用英文寫一句：你想外帶這份餐點。",
        "I would like this meal for takeout."
      ),
      lesson(
        [
          ["taste", "味道；品嚐", "This coffee tastes good."],
          ["portion", "份量", "The portion is large."],
          ["refill", "續杯", "Free refills are available."],
          ["bottle", "瓶子", "I ordered a bottle of water."],
          ["cup", "杯子", "Could I have a cup of tea?"]
        ],
        "Coffee refills are free before noon. After noon, each refill costs one dollar. Please bring your cup to the counter.",
        "中午以前咖啡可免費續杯。中午之後，每次續杯一美元。請把杯子帶到櫃台。",
        "Coffee refills are free ___ noon.",
        ["before", "beside", "inside", "without"],
        "before",
        "before noon 表示中午以前。",
        "請用英文寫一句：你想要一杯茶。",
        "I would like a cup of tea."
      ),
      lesson(
        [
          ["manager", "經理", "The manager came to our table."],
          ["compliment", "讚美", "She gave the chef a compliment."],
          ["service", "服務", "The service was excellent."],
          ["busy", "忙碌的", "The restaurant is busy tonight."],
          ["wait", "等待", "We had to wait for twenty minutes."]
        ],
        "We are very busy tonight, so there may be a short wait for tables. Thank you for your patience.",
        "今晚餐廳非常忙碌，所以可能需要稍等桌位。感謝您的耐心等候。",
        "There may be a short ___ for tables.",
        ["wait", "refund", "budget", "license"],
        "wait",
        "wait for tables 表示等候桌位。",
        "請用英文寫一句：餐廳今晚很忙。",
        "The restaurant is very busy tonight."
      )
    ]
  },
  {
    name: "飯店與住宿",
    lessons: [
      lesson(
        [
          ["check in", "辦理入住", "We can check in after 3 p.m."],
          ["check out", "退房", "Please check out before 11 a.m."],
          ["front desk", "櫃台", "Please call the front desk."],
          ["guest", "房客；客人", "The hotel has many guests today."],
          ["key card", "房卡", "My key card does not work."]
        ],
        "Welcome to Lake Hotel. Check-in begins at 3 p.m. If your key card does not work, please visit the front desk.",
        "歡迎來到 Lake Hotel。入住從下午 3 點開始。如果您的房卡無法使用，請到櫃台。",
        "Check-in ___ at 3 p.m.",
        ["begins", "begin", "beginning", "begun"],
        "begins",
        "主詞 Check-in 是單數概念，所以用 begins。",
        "請用英文寫一句：你的房卡不能使用。",
        "My key card does not work."
      ),
      lesson(
        [
          ["single room", "單人房", "I booked a single room."],
          ["double room", "雙人房", "We need a double room."],
          ["suite", "套房", "The suite has a living room."],
          ["non-smoking", "禁菸的", "I prefer a non-smoking room."],
          ["view", "景觀", "The room has a nice view."]
        ],
        "Your double room is on the eighth floor. It is a non-smoking room with a city view. Breakfast is included.",
        "您的雙人房在八樓。這是一間禁菸房，有城市景觀。早餐包含在內。",
        "I prefer a ___ room.",
        ["non-smoking", "damaged", "separate", "expired"],
        "non-smoking",
        "non-smoking room 是禁菸房。",
        "請用英文寫一句：你比較想要禁菸房。",
        "I prefer a non-smoking room."
      ),
      lesson(
        [
          ["housekeeping", "客房清潔", "Housekeeping cleans the room daily."],
          ["towel", "毛巾", "Could I have extra towels?"],
          ["blanket", "毯子", "We need another blanket."],
          ["pillow", "枕頭", "This pillow is too soft."],
          ["laundry", "洗衣", "Laundry service is available."]
        ],
        "Housekeeping service is available until 4 p.m. If you need extra towels or another blanket, please call the front desk.",
        "客房清潔服務到下午 4 點。如果您需要額外毛巾或另一條毯子，請打電話給櫃台。",
        "If you need extra towels, please ___ the front desk.",
        ["call", "serve", "expire", "rent"],
        "call",
        "call the front desk 表示打給櫃台。",
        "請用英文寫一句：你需要額外毛巾。",
        "I need extra towels."
      ),
      lesson(
        [
          ["elevator", "電梯", "The elevator is near the lobby."],
          ["lobby", "大廳", "Please wait in the lobby."],
          ["floor", "樓層", "Our room is on the fifth floor."],
          ["parking", "停車", "Free parking is available."],
          ["shuttle", "接駁車", "The airport shuttle leaves hourly."]
        ],
        "The airport shuttle leaves from the lobby every hour. Free parking is available behind the hotel.",
        "機場接駁車每小時從大廳出發。飯店後方提供免費停車。",
        "The shuttle leaves from the lobby every ___.",
        ["hour", "invoice", "menu", "refund"],
        "hour",
        "every hour 表示每小時。",
        "請用英文寫一句：接駁車每小時出發。",
        "The shuttle leaves every hour."
      ),
      lesson(
        [
          ["reservation number", "訂房編號", "Here is my reservation number."],
          ["cancelation", "取消", "Cancelation is free before Friday."],
          ["rate", "價格；費率", "The room rate is lower online."],
          ["deposit", "押金；訂金", "A deposit is required."],
          ["receipt", "收據", "Can I get a receipt?"]
        ],
        "To cancel your hotel reservation, please provide your reservation number. Cancelation is free until 6 p.m. today.",
        "若要取消飯店訂房，請提供您的訂房編號。今天下午 6 點前取消免費。",
        "Please provide your reservation ___.",
        ["number", "dessert", "quality", "luggage"],
        "number",
        "reservation number 是訂房編號。",
        "請用英文寫一句：這是你的訂房編號。",
        "Here is my reservation number."
      ),
      lesson(
        [
          ["air conditioner", "冷氣", "The air conditioner is too loud."],
          ["heater", "暖氣", "The heater is not working."],
          ["remote control", "遙控器", "The remote control is missing."],
          ["safe", "保險箱", "There is a safe in the room."],
          ["light", "燈", "The bathroom light is broken."]
        ],
        "We are sorry that the heater is not working. A technician will come to your room in twenty minutes.",
        "很抱歉暖氣無法使用。技術人員會在二十分鐘內到您的房間。",
        "The heater is not ___.",
        ["working", "included", "reserved", "charged"],
        "working",
        "not working 表示無法運作。",
        "請用英文寫一句：浴室的燈壞了。",
        "The bathroom light is broken."
      ),
      lesson(
        [
          ["quiet", "安靜的", "The room is quiet at night."],
          ["comfortable", "舒適的", "The bed is comfortable."],
          ["clean", "乾淨的", "The bathroom is clean."],
          ["noisy", "吵雜的", "The street is noisy."],
          ["excellent", "很棒的", "The service was excellent."]
        ],
        "Thank you for staying with us. We hope your room was clean and comfortable. Please leave a comment about your stay.",
        "感謝您入住本飯店。希望您的房間乾淨且舒適。請留下住宿意見。",
        "We hope your room was clean ___ comfortable.",
        ["and", "but", "or", "so"],
        "and",
        "clean and comfortable 是並列形容詞。",
        "請用英文寫一句：房間很乾淨又舒適。",
        "The room is clean and comfortable."
      )
    ]
  },
  {
    name: "辦公室設備與維修",
    lessons: [
      lesson(
        [
          ["printer", "印表機", "The printer is out of paper."],
          ["scanner", "掃描器", "The scanner is next to the printer."],
          ["copier", "影印機", "The copier needs toner."],
          ["paper", "紙", "Please add more paper."],
          ["toner", "碳粉", "We need to order toner."]
        ],
        "The printer in the sales office is out of paper. Please add more paper before printing large documents.",
        "業務辦公室的印表機沒紙了。列印大型文件前，請先補紙。",
        "The printer is out ___ paper.",
        ["of", "for", "at", "by"],
        "of",
        "out of paper 表示沒有紙了。",
        "請用英文寫一句：印表機沒紙了。",
        "The printer is out of paper."
      ),
      lesson(
        [
          ["keyboard", "鍵盤", "My keyboard is not working."],
          ["mouse", "滑鼠", "The mouse is wireless."],
          ["monitor", "螢幕", "The monitor is too dark."],
          ["cable", "線材", "This cable is too short."],
          ["charger", "充電器", "I forgot my charger."]
        ],
        "If your keyboard or mouse is not working, please check the cable first. If the problem continues, contact IT support.",
        "如果鍵盤或滑鼠無法使用，請先檢查線材。如果問題持續，請聯絡 IT 支援。",
        "Please check the cable ___.",
        ["first", "never", "already", "near"],
        "first",
        "check the cable first 表示先檢查線材。",
        "請用英文寫一句：我的鍵盤不能使用。",
        "My keyboard is not working."
      ),
      lesson(
        [
          ["software", "軟體", "The software needs an update."],
          ["install", "安裝", "Please install the new app."],
          ["password", "密碼", "I forgot my password."],
          ["account", "帳號", "Your account is ready."],
          ["login", "登入", "I cannot log in to my account."]
        ],
        "The accounting software will be updated tonight. Please save your work and log out before 6 p.m.",
        "會計軟體今晚會更新。請在下午 6 點前儲存工作並登出。",
        "Please save your work and ___ out before 6 p.m.",
        ["log", "serve", "rent", "wait"],
        "log",
        "log out 是登出。",
        "請用英文寫一句：我忘記我的密碼了。",
        "I forgot my password."
      ),
      lesson(
        [
          ["technician", "技術人員", "A technician will arrive soon."],
          ["fix", "修理", "Can you fix the computer?"],
          ["problem", "問題", "There is a problem with the monitor."],
          ["restart", "重新啟動", "Please restart the computer."],
          ["screen", "螢幕畫面", "The screen is frozen."]
        ],
        "A technician will visit your office this afternoon to fix the frozen screen. Please restart the computer before the visit.",
        "技術人員今天下午會到您的辦公室修理卡住的螢幕畫面。請在到訪前重新啟動電腦。",
        "Please restart the computer ___ the visit.",
        ["before", "until", "inside", "across"],
        "before",
        "before the visit 表示到訪前。",
        "請用英文寫一句：螢幕畫面卡住了。",
        "The screen is frozen."
      ),
      lesson(
        [
          ["supply", "用品", "Office supplies are in the cabinet."],
          ["cabinet", "櫃子", "The files are in the cabinet."],
          ["folder", "資料夾", "Please put the papers in a folder."],
          ["stapler", "釘書機", "The stapler is on my desk."],
          ["envelope", "信封", "I need a large envelope."]
        ],
        "Office supplies are stored in the cabinet near the meeting room. Please tell the office manager if supplies are low.",
        "辦公用品放在會議室附近的櫃子裡。如果用品不夠，請告訴辦公室經理。",
        "Office supplies are stored ___ the cabinet.",
        ["in", "on", "to", "by"],
        "in",
        "in the cabinet 表示在櫃子裡。",
        "請用英文寫一句：我需要一個大信封。",
        "I need a large envelope."
      ),
      lesson(
        [
          ["desk", "辦公桌", "My desk is near the window."],
          ["chair", "椅子", "This chair is comfortable."],
          ["drawer", "抽屜", "The keys are in the drawer."],
          ["lamp", "檯燈", "The desk lamp is broken."],
          ["trash can", "垃圾桶", "The trash can is full."]
        ],
        "The desk lamp in Room 204 is broken. Please do not use it until maintenance replaces it.",
        "204 室的檯燈壞了。在維修人員更換前，請不要使用。",
        "Please do not use it ___ maintenance replaces it.",
        ["until", "because", "through", "among"],
        "until",
        "until 表示直到某時間前都不要做。",
        "請用英文寫一句：垃圾桶滿了。",
        "The trash can is full."
      ),
      lesson(
        [
          ["maintenance", "維修", "Maintenance will start at noon."],
          ["request", "請求；申請", "Please submit a repair request."],
          ["broken", "壞掉的", "The elevator is broken."],
          ["replace", "更換", "We will replace the old cable."],
          ["urgent", "緊急的", "This is an urgent problem."]
        ],
        "For urgent repair problems, please submit a maintenance request online. A technician will contact you within one business day.",
        "若有緊急維修問題，請在線上提交維修申請。技術人員會在一個工作天內聯絡您。",
        "Please submit a maintenance request ___.",
        ["online", "quiet", "fresh", "separate"],
        "online",
        "submit online 表示在線上提交。",
        "請用英文寫一句：這是一個緊急問題。",
        "This is an urgent problem."
      )
    ]
  },
  {
    name: "會議與簡報",
    lessons: [
      lesson(
        [
          ["agenda", "議程", "The agenda has five items."],
          ["topic", "主題", "Today's topic is customer service."],
          ["discuss", "討論", "We will discuss the budget."],
          ["minute", "會議紀錄", "Please send the meeting minutes."],
          ["participant", "參與者", "All participants received the agenda."]
        ],
        "Today's meeting agenda has five items. We will discuss the budget first and review customer comments after lunch.",
        "今天的會議議程有五個項目。我們會先討論預算，午餐後再檢視顧客意見。",
        "We will discuss the budget ___.",
        ["first", "empty", "late", "broken"],
        "first",
        "first 表示首先。",
        "請用英文寫一句：今天的議程有五個項目。",
        "Today's agenda has five items."
      ),
      lesson(
        [
          ["presentation", "簡報", "Her presentation was clear."],
          ["slide", "投影片", "Please check slide three."],
          ["chart", "圖表", "The chart shows sales growth."],
          ["graph", "圖形；曲線圖", "This graph is easy to understand."],
          ["data", "資料", "The data is from last year."]
        ],
        "Please send your presentation slides to the team before 4 p.m. The sales chart should be on the first slide.",
        "請在下午 4 點前把簡報投影片寄給團隊。銷售圖表應放在第一張投影片。",
        "The chart ___ sales growth.",
        ["shows", "show", "showing", "shown"],
        "shows",
        "主詞 chart 是單數，所以用 shows。",
        "請用英文寫一句：她的簡報很清楚。",
        "Her presentation was clear."
      ),
      lesson(
        [
          ["projector", "投影機", "The projector is not working."],
          ["microphone", "麥克風", "Please use the microphone."],
          ["speaker", "講者；喇叭", "The speaker arrived early."],
          ["volume", "音量", "Please lower the volume."],
          ["screen", "螢幕", "The screen is behind you."]
        ],
        "The projector in Conference Room B is not working. Please use Conference Room C for your presentation today.",
        "B 會議室的投影機無法使用。今天請使用 C 會議室進行簡報。",
        "Please use Conference Room C ___ your presentation.",
        ["for", "at", "by", "of"],
        "for",
        "use something for something 表示為了某用途使用。",
        "請用英文寫一句：投影機不能使用。",
        "The projector is not working."
      ),
      lesson(
        [
          ["deadline", "截止日期", "The deadline is Friday."],
          ["progress", "進度", "We discussed the project progress."],
          ["task", "任務", "Each team member has a task."],
          ["assign", "指派", "The manager assigned tasks."],
          ["finish", "完成", "Please finish the report today."]
        ],
        "The project deadline is Friday. Each team member should finish the assigned task and report progress by Thursday afternoon.",
        "專案截止日期是星期五。每位團隊成員應完成被指派的任務，並在星期四下午前回報進度。",
        "Each team member should finish the ___ task.",
        ["assigned", "fresh", "included", "noisy"],
        "assigned",
        "assigned task 是被指派的任務。",
        "請用英文寫一句：截止日期是星期五。",
        "The deadline is Friday."
      ),
      lesson(
        [
          ["postpone", "延後", "The meeting was postponed."],
          ["reschedule", "重新安排", "Can we reschedule the meeting?"],
          ["cancel", "取消", "The event was canceled."],
          ["available", "有空的", "Are you available tomorrow?"],
          ["calendar", "行事曆", "Please check your calendar."]
        ],
        "The client meeting has been postponed to next Tuesday. Please check your calendar and tell me if you are available.",
        "客戶會議已延到下週二。請查看您的行事曆，並告訴我您是否有空。",
        "The meeting has been postponed ___ next Tuesday.",
        ["to", "for", "in", "at"],
        "to",
        "postpone to a date 表示延到某日期。",
        "請用英文寫一句：我們可以重新安排會議嗎？",
        "Can we reschedule the meeting?"
      ),
      lesson(
        [
          ["summary", "摘要", "Please write a short summary."],
          ["decision", "決定", "We made a final decision."],
          ["agree", "同意", "I agree with your idea."],
          ["suggest", "建議", "She suggested a new plan."],
          ["question", "問題", "Do you have any questions?"]
        ],
        "After the meeting, please send a short summary of our decisions. Include any questions that still need answers.",
        "會議後，請寄出我們決定事項的簡短摘要。請包含仍需要回答的任何問題。",
        "Please send a short summary ___ our decisions.",
        ["of", "under", "across", "during"],
        "of",
        "summary of something 表示某事的摘要。",
        "請用英文寫一句：你同意這個想法。",
        "I agree with this idea."
      ),
      lesson(
        [
          ["conference", "研討會；大型會議", "The conference starts Monday."],
          ["session", "場次；課程", "The training session is full."],
          ["register", "報名；登記", "Please register online."],
          ["badge", "名牌", "Wear your badge at all times."],
          ["attendee", "出席者", "There are 200 attendees."]
        ],
        "Conference attendees must register online before Friday. Please wear your badge during all sessions.",
        "研討會出席者必須在星期五前線上報名。請在所有場次期間配戴名牌。",
        "Attendees must register online ___ Friday.",
        ["before", "inside", "among", "beside"],
        "before",
        "before Friday 表示星期五前。",
        "請用英文寫一句：請在線上報名。",
        "Please register online."
      )
    ]
  },
  {
    name: "人資與求職",
    lessons: [
      lesson(
        [
          ["resume", "履歷", "Please send your resume."],
          ["interview", "面試", "The interview is on Tuesday."],
          ["position", "職位", "I applied for the sales position."],
          ["candidate", "候選人", "The candidate has experience."],
          ["experience", "經驗", "She has five years of experience."]
        ],
        "Thank you for applying for the sales position. Please send your resume before Friday. Selected candidates will be invited for an interview.",
        "感謝您應徵業務職位。請在星期五前寄送履歷。被選中的候選人將受邀面試。",
        "Please send your resume ___ Friday.",
        ["before", "between", "inside", "without"],
        "before",
        "before Friday 表示星期五前。",
        "請用英文寫一句：你應徵業務職位。",
        "I applied for the sales position."
      ),
      lesson(
        [
          ["hire", "雇用", "The company will hire two assistants."],
          ["employee", "員工", "New employees start Monday."],
          ["manager", "經理", "The manager interviewed me."],
          ["salary", "薪水", "The salary is paid monthly."],
          ["benefits", "福利", "The job includes good benefits."]
        ],
        "The company plans to hire two new assistants this month. The position includes health benefits and a monthly salary.",
        "公司計畫這個月雇用兩位新助理。此職位包含健康福利和月薪。",
        "The company plans ___ two assistants.",
        ["to hire", "hire", "hired", "hiring"],
        "to hire",
        "plan to do something 表示計畫做某事。",
        "請用英文寫一句：公司會雇用兩位助理。",
        "The company will hire two assistants."
      ),
      lesson(
        [
          ["training", "訓練", "Training begins next week."],
          ["orientation", "新人說明", "Orientation is at 9 a.m."],
          ["policy", "政策；規定", "Read the company policy."],
          ["uniform", "制服", "Employees must wear uniforms."],
          ["schedule", "班表；行程", "The work schedule is online."]
        ],
        "New employee orientation begins at 9 a.m. Please bring your ID and read the company policy before the training session.",
        "新進員工說明會上午 9 點開始。請攜帶身分證，並在訓練課程前閱讀公司規定。",
        "Please read the policy ___ the training session.",
        ["before", "afterward", "already", "nearby"],
        "before",
        "before the session 表示課程前。",
        "請用英文寫一句：訓練下週開始。",
        "Training begins next week."
      ),
      lesson(
        [
          ["promotion", "升遷；促銷", "She received a promotion."],
          ["performance", "表現", "His performance improved."],
          ["review", "考核；檢視", "My performance review is tomorrow."],
          ["goal", "目標", "We set a sales goal."],
          ["improve", "改善", "I want to improve my skills."]
        ],
        "Performance reviews will take place next month. Please prepare a list of your goals and explain how your work has improved.",
        "績效考核將在下個月舉行。請準備你的目標清單，並說明你的工作如何改善。",
        "Please prepare a list ___ your goals.",
        ["of", "at", "by", "to"],
        "of",
        "a list of goals 表示目標清單。",
        "請用英文寫一句：我想改善我的技能。",
        "I want to improve my skills."
      ),
      lesson(
        [
          ["vacation", "假期", "I will take a vacation in July."],
          ["leave", "請假；休假", "She is on leave today."],
          ["sick", "生病的", "He called in sick."],
          ["approve", "批准", "The manager approved my leave."],
          ["request", "申請", "Please submit a leave request."]
        ],
        "Employees should submit vacation requests two weeks early. Your manager must approve the request before you make travel plans.",
        "員工應提前兩週提交休假申請。在您安排旅行計畫前，主管必須批准申請。",
        "Your manager must ___ the request.",
        ["approve", "expire", "deliver", "taste"],
        "approve",
        "approve the request 表示批准申請。",
        "請用英文寫一句：請提交休假申請。",
        "Please submit a leave request."
      ),
      lesson(
        [
          ["shift", "班次", "My shift starts at 8 a.m."],
          ["overtime", "加班", "Overtime must be approved."],
          ["part-time", "兼職的", "He has a part-time job."],
          ["full-time", "全職的", "She works full-time."],
          ["break", "休息", "Employees get a ten-minute break."]
        ],
        "Overtime must be approved by a manager. Please record your extra hours before the end of your shift.",
        "加班必須由主管批准。請在班次結束前記錄額外工時。",
        "Please record your extra hours before the end of your ___.",
        ["shift", "badge", "dessert", "folder"],
        "shift",
        "end of your shift 表示你的班次結束。",
        "請用英文寫一句：我的班次上午 8 點開始。",
        "My shift starts at 8 a.m."
      ),
      lesson(
        [
          ["contract", "合約", "Please sign the contract."],
          ["sign", "簽署", "Sign your name here."],
          ["agreement", "協議", "We reached an agreement."],
          ["probation", "試用期", "The probation period is three months."],
          ["notice", "通知", "Please give two weeks' notice."]
        ],
        "Please read the employment contract carefully before you sign it. The probation period is three months.",
        "簽署雇用合約前，請仔細閱讀。試用期為三個月。",
        "Please read the contract carefully ___ you sign it.",
        ["before", "because", "around", "among"],
        "before",
        "before you sign it 表示簽署前。",
        "請用英文寫一句：請在這裡簽名。",
        "Please sign your name here."
      )
    ]
  },
  {
    name: "銀行與付款",
    lessons: [
      lesson(
        [
          ["bank", "銀行", "The bank opens at 9 a.m."],
          ["account", "帳戶", "I opened a savings account."],
          ["deposit", "存款", "I made a deposit yesterday."],
          ["withdraw", "提款", "I need to withdraw cash."],
          ["balance", "餘額", "Please check my account balance."]
        ],
        "The bank opens at 9 a.m. Customers can make deposits, withdraw cash, or check account balances at the counter.",
        "銀行上午 9 點開門。顧客可以在櫃台存款、提款或查詢帳戶餘額。",
        "I need to withdraw ___.",
        ["cash", "policy", "luggage", "speaker"],
        "cash",
        "withdraw cash 是提款。",
        "請用英文寫一句：你想查詢帳戶餘額。",
        "I would like to check my account balance."
      ),
      lesson(
        [
          ["payment", "付款", "Your payment was received."],
          ["cashier", "收銀員", "Please pay the cashier."],
          ["amount", "金額", "The total amount is fifty dollars."],
          ["change", "零錢；找零", "Here is your change."],
          ["total", "總計", "The total is eighty dollars."]
        ],
        "Your total amount is eighty dollars. You can pay the cashier by cash, credit card, or mobile payment.",
        "您的總金額是八十美元。您可以用現金、信用卡或行動支付向收銀員付款。",
        "You can pay the cashier ___ cash.",
        ["by", "on", "at", "of"],
        "by",
        "by cash 表示用現金。",
        "請用英文寫一句：總金額是八十美元。",
        "The total amount is eighty dollars."
      ),
      lesson(
        [
          ["transfer", "轉帳", "I transferred money online."],
          ["fee", "手續費；費用", "There is a small transfer fee."],
          ["online banking", "網路銀行", "Online banking is convenient."],
          ["recipient", "收款人", "Enter the recipient's name."],
          ["confirm", "確認", "Please confirm the transfer."]
        ],
        "To transfer money online, enter the recipient's name and account number. Please confirm the information before you send the payment.",
        "若要線上轉帳，請輸入收款人姓名和帳號。送出付款前請確認資料。",
        "Please confirm the information ___ you send the payment.",
        ["before", "after", "under", "without"],
        "before",
        "付款前確認資料，用 before。",
        "請用英文寫一句：我在線上轉帳。",
        "I transferred money online."
      ),
      lesson(
        [
          ["loan", "貸款", "She applied for a home loan."],
          ["interest", "利息", "The interest rate is low."],
          ["rate", "利率；費率", "The rate changes every year."],
          ["approve", "批准", "The bank approved the loan."],
          ["document", "文件", "Please bring these documents."]
        ],
        "Your loan application has been approved. Please bring your documents to the bank and sign the agreement by Friday.",
        "您的貸款申請已核准。請在星期五前攜帶文件到銀行並簽署協議。",
        "Your loan application has been ___.",
        ["approved", "damaged", "included", "postponed"],
        "approved",
        "application has been approved 表示申請已被核准。",
        "請用英文寫一句：銀行核准了貸款。",
        "The bank approved the loan."
      ),
      lesson(
        [
          ["ATM", "自動提款機", "The ATM is outside the bank."],
          ["PIN", "密碼", "Do not share your PIN."],
          ["card", "卡片", "My bank card is missing."],
          ["machine", "機器", "The machine is out of service."],
          ["receipt", "收據", "Do you need a receipt?"]
        ],
        "For your safety, do not share your PIN with anyone. If your bank card is missing, contact us immediately.",
        "為了您的安全，請不要與任何人分享密碼。如果您的金融卡遺失，請立刻聯絡我們。",
        "Do not share your PIN ___ anyone.",
        ["with", "for", "to", "by"],
        "with",
        "share something with someone 表示和某人分享某物。",
        "請用英文寫一句：我的金融卡不見了。",
        "My bank card is missing."
      ),
      lesson(
        [
          ["currency", "貨幣", "What currency do you need?"],
          ["exchange rate", "匯率", "The exchange rate is better today."],
          ["foreign", "外國的", "I need foreign currency."],
          ["cash", "現金", "How much cash do you need?"],
          ["passport", "護照", "Please show your passport."]
        ],
        "To exchange foreign currency, please show your passport. Today's exchange rate is listed on the screen.",
        "若要兌換外幣，請出示護照。今天的匯率列在螢幕上。",
        "Please show your passport ___ exchange currency.",
        ["to", "by", "in", "of"],
        "to",
        "to exchange currency 表示為了兌換貨幣。",
        "請用英文寫一句：今天的匯率比較好。",
        "The exchange rate is better today."
      ),
      lesson(
        [
          ["statement", "對帳單", "I received my bank statement."],
          ["monthly", "每月的", "The monthly fee is five dollars."],
          ["charge", "費用；收費", "There is a service charge."],
          ["overdue", "逾期的", "The payment is overdue."],
          ["due date", "到期日", "The due date is June 30."]
        ],
        "Your monthly statement is now available online. Please pay any overdue charges before the due date.",
        "您的每月對帳單現在可在線上查看。請在到期日前支付任何逾期費用。",
        "Please pay overdue charges before the due ___.",
        ["date", "view", "screen", "menu"],
        "date",
        "due date 是到期日。",
        "請用英文寫一句：到期日是六月三十日。",
        "The due date is June 30."
      )
    ]
  },
  {
    name: "健康與保險",
    lessons: [
      lesson(
        [
          ["doctor", "醫生", "I need to see a doctor."],
          ["clinic", "診所", "The clinic opens at 8 a.m."],
          ["appointment", "預約", "I have a doctor's appointment."],
          ["patient", "病人", "The patient is waiting."],
          ["symptom", "症狀", "What symptoms do you have?"]
        ],
        "The clinic opens at 8 a.m. If you have flu symptoms, please make an appointment before visiting the doctor.",
        "診所上午 8 點開門。如果您有流感症狀，看醫生前請先預約。",
        "Please make an appointment ___ visiting the doctor.",
        ["before", "beside", "during", "inside"],
        "before",
        "before visiting 表示拜訪或就診前。",
        "請用英文寫一句：我需要看醫生。",
        "I need to see a doctor."
      ),
      lesson(
        [
          ["medicine", "藥", "Take this medicine twice a day."],
          ["pharmacy", "藥局", "The pharmacy is next to the clinic."],
          ["prescription", "處方箋", "Do you have a prescription?"],
          ["dose", "劑量", "Take one dose after meals."],
          ["side effect", "副作用", "This medicine has side effects."]
        ],
        "Please take one dose of this medicine after meals. If you have any side effects, call the pharmacy.",
        "請飯後服用此藥一劑。如果您有任何副作用，請打電話給藥局。",
        "Take one dose ___ meals.",
        ["after", "between", "inside", "over"],
        "after",
        "after meals 表示飯後。",
        "請用英文寫一句：藥局在診所旁邊。",
        "The pharmacy is next to the clinic."
      ),
      lesson(
        [
          ["insurance", "保險", "Do you have health insurance?"],
          ["claim", "理賠；申請", "Please file an insurance claim."],
          ["coverage", "保障範圍", "What is my coverage?"],
          ["medical", "醫療的", "Medical costs are rising."],
          ["card", "卡片", "Please show your insurance card."]
        ],
        "Please show your insurance card when you arrive. Our staff will check your coverage before the appointment.",
        "抵達時請出示保險卡。我們的員工會在預約前確認您的保障範圍。",
        "Our staff will check your ___ before the appointment.",
        ["coverage", "dessert", "keyboard", "view"],
        "coverage",
        "insurance coverage 是保險保障範圍。",
        "請用英文寫一句：你有健康保險嗎？",
        "Do you have health insurance?"
      ),
      lesson(
        [
          ["emergency", "緊急狀況", "This is an emergency."],
          ["ambulance", "救護車", "Call an ambulance now."],
          ["injury", "受傷", "He has a leg injury."],
          ["accident", "意外", "There was a traffic accident."],
          ["hospital", "醫院", "The hospital is nearby."]
        ],
        "If this is an emergency, call an ambulance immediately. The nearest hospital is five minutes away.",
        "如果這是緊急狀況，請立刻叫救護車。最近的醫院距離五分鐘。",
        "Call an ambulance ___.",
        ["immediately", "monthly", "comfortable", "separate"],
        "immediately",
        "immediately 表示立刻。",
        "請用英文寫一句：這是緊急狀況。",
        "This is an emergency."
      ),
      lesson(
        [
          ["fever", "發燒", "I have a fever."],
          ["cough", "咳嗽", "She has a bad cough."],
          ["headache", "頭痛", "I have a headache."],
          ["sore throat", "喉嚨痛", "He has a sore throat."],
          ["rest", "休息", "You should get some rest."]
        ],
        "You have a fever and a sore throat. Please drink water, take this medicine, and get some rest.",
        "您發燒且喉嚨痛。請喝水、服用此藥並休息。",
        "You should get some ___.",
        ["rest", "cash", "data", "toner"],
        "rest",
        "get some rest 表示休息一下。",
        "請用英文寫一句：我頭痛。",
        "I have a headache."
      ),
      lesson(
        [
          ["dentist", "牙醫", "I have a dentist appointment."],
          ["toothache", "牙痛", "I have a toothache."],
          ["cleaning", "清潔", "I need a teeth cleaning."],
          ["pain", "疼痛", "The pain started yesterday."],
          ["checkup", "檢查", "My checkup is next week."]
        ],
        "Your dental checkup is scheduled for next Wednesday. If you have a toothache or serious pain, please call us sooner.",
        "您的牙科檢查安排在下週三。如果您牙痛或嚴重疼痛，請更早打電話給我們。",
        "Your checkup is scheduled ___ next Wednesday.",
        ["for", "on", "at", "by"],
        "for",
        "scheduled for a date 表示安排在某日期。",
        "請用英文寫一句：我牙痛。",
        "I have a toothache."
      ),
      lesson(
        [
          ["healthy", "健康的", "A healthy diet is important."],
          ["exercise", "運動", "I exercise three times a week."],
          ["diet", "飲食", "Her diet includes vegetables."],
          ["habit", "習慣", "Sleep is an important habit."],
          ["advice", "建議", "The doctor gave me advice."]
        ],
        "The doctor gave me advice about healthy habits. She suggested more exercise, better sleep, and a balanced diet.",
        "醫生給了我關於健康習慣的建議。她建議更多運動、更好的睡眠和均衡飲食。",
        "She suggested more ___.",
        ["exercise", "invoice", "parking", "badge"],
        "exercise",
        "suggested more exercise 表示建議更多運動。",
        "請用英文寫一句：健康的飲食很重要。",
        "A healthy diet is important."
      )
    ]
  },
  {
    name: "交通與通勤",
    lessons: [
      lesson(
        [
          ["station", "車站", "The train station is nearby."],
          ["platform", "月台", "The train leaves from platform 2."],
          ["ticket", "票", "I bought a train ticket."],
          ["route", "路線", "This route is faster."],
          ["fare", "票價", "The bus fare is two dollars."]
        ],
        "The express train leaves from platform 2 at 8:15. Please buy your ticket before you go to the platform.",
        "快車 8:15 從 2 號月台出發。前往月台前請先買票。",
        "The train leaves ___ platform 2.",
        ["from", "with", "over", "under"],
        "from",
        "leave from platform 2 表示從 2 號月台出發。",
        "請用英文寫一句：車站在附近。",
        "The train station is nearby."
      ),
      lesson(
        [
          ["bus stop", "公車站", "The bus stop is across the street."],
          ["driver", "司機", "The bus driver was friendly."],
          ["passenger", "乘客", "Passengers should wear seat belts."],
          ["traffic", "交通", "Traffic is heavy today."],
          ["delay", "延誤", "The bus delay was short."]
        ],
        "Due to heavy traffic, Bus 12 will be delayed by ten minutes. Please wait at the bus stop.",
        "由於交通繁忙，12 號公車將延誤十分鐘。請在公車站等候。",
        "Bus 12 will be delayed ___ ten minutes.",
        ["by", "to", "at", "of"],
        "by",
        "delayed by ten minutes 表示延誤十分鐘。",
        "請用英文寫一句：今天交通很繁忙。",
        "Traffic is heavy today."
      ),
      lesson(
        [
          ["subway", "捷運；地鐵", "I take the subway to work."],
          ["line", "路線；線", "Take the red line."],
          ["transfer", "轉乘", "Transfer at Central Station."],
          ["exit", "出口", "Use Exit 3."],
          ["map", "地圖", "Please check the subway map."]
        ],
        "Take the red line and transfer at Central Station. Use Exit 3 to reach the office building.",
        "搭乘紅線並在中央車站轉乘。使用 3 號出口可抵達辦公大樓。",
        "Use Exit 3 ___ reach the office building.",
        ["to", "by", "at", "of"],
        "to",
        "to reach 表示為了抵達。",
        "請用英文寫一句：我搭捷運上班。",
        "I take the subway to work."
      ),
      lesson(
        [
          ["taxi", "計程車", "Let's take a taxi."],
          ["address", "地址", "Please give the driver the address."],
          ["meter", "計程表", "The taxi meter is running."],
          ["receipt", "收據", "Can I get a receipt?"],
          ["destination", "目的地", "What is your destination?"]
        ],
        "Please give the taxi driver the address of your destination. Ask for a receipt before you leave the taxi.",
        "請把目的地地址給計程車司機。下車前請索取收據。",
        "Ask for a receipt ___ you leave the taxi.",
        ["before", "inside", "above", "until"],
        "before",
        "before you leave 表示你離開前。",
        "請用英文寫一句：請把地址給司機。",
        "Please give the driver the address."
      ),
      lesson(
        [
          ["parking lot", "停車場", "The parking lot is full."],
          ["garage", "車庫；停車場", "The garage is under the building."],
          ["permit", "許可證", "You need a parking permit."],
          ["space", "空位", "There are no parking spaces."],
          ["vehicle", "車輛", "Do not park large vehicles here."]
        ],
        "Employees need a parking permit to use the garage. Visitor parking spaces are near the main entrance.",
        "員工需要停車許可證才能使用停車場。訪客停車位在主要入口附近。",
        "Employees need a parking ___.",
        ["permit", "dessert", "screen", "survey"],
        "permit",
        "parking permit 是停車許可證。",
        "請用英文寫一句：停車場滿了。",
        "The parking lot is full."
      ),
      lesson(
        [
          ["commute", "通勤", "My commute takes forty minutes."],
          ["distance", "距離", "The distance is short."],
          ["arrive", "抵達", "I usually arrive early."],
          ["leave", "離開", "I leave home at 7 a.m."],
          ["on time", "準時", "The train arrived on time."]
        ],
        "My commute takes forty minutes by train. I leave home at 7 a.m. and usually arrive at the office on time.",
        "我搭火車通勤要四十分鐘。我早上 7 點離家，通常準時到辦公室。",
        "I usually arrive ___ the office on time.",
        ["at", "on", "by", "of"],
        "at",
        "arrive at the office 表示抵達辦公室。",
        "請用英文寫一句：我的通勤要四十分鐘。",
        "My commute takes forty minutes."
      ),
      lesson(
        [
          ["bicycle", "腳踏車", "I ride a bicycle to work."],
          ["helmet", "安全帽", "Wear a helmet when you ride."],
          ["lane", "車道", "Use the bicycle lane."],
          ["walk", "走路", "I walk to the station."],
          ["safe", "安全的", "This road is safe for bikes."]
        ],
        "Please use the bicycle lane and wear a helmet. The city wants to make commuting safer for everyone.",
        "請使用自行車道並戴安全帽。市政府希望讓每個人的通勤更安全。",
        "Wear a helmet ___ you ride.",
        ["when", "unless", "afterward", "inside"],
        "when",
        "when you ride 表示騎車時。",
        "請用英文寫一句：我走路到車站。",
        "I walk to the station."
      )
    ]
  },
  {
    name: "生產與出貨",
    lessons: [
      lesson(
        [
          ["factory", "工廠", "The factory is outside the city."],
          ["produce", "生產", "The factory produces shoes."],
          ["product", "產品", "This product is popular."],
          ["worker", "工人", "Factory workers start at 7 a.m."],
          ["machine", "機器", "The machine needs maintenance."]
        ],
        "The factory produces office chairs. Workers should check each machine before production begins.",
        "這間工廠生產辦公椅。工人應在生產開始前檢查每台機器。",
        "Workers should check each machine ___ production begins.",
        ["before", "between", "without", "toward"],
        "before",
        "before production begins 表示生產開始前。",
        "請用英文寫一句：工廠生產辦公椅。",
        "The factory produces office chairs."
      ),
      lesson(
        [
          ["warehouse", "倉庫", "The boxes are in the warehouse."],
          ["inventory", "庫存", "We checked the inventory."],
          ["stock", "庫存", "This item is out of stock."],
          ["shelf", "架子", "Put the boxes on the shelf."],
          ["label", "標籤", "Each box needs a label."]
        ],
        "The warehouse team will check inventory on Friday. Please put labels on all boxes before they are stored.",
        "倉庫團隊會在星期五檢查庫存。箱子入庫前請貼上標籤。",
        "Each box needs a ___.",
        ["label", "passport", "pillow", "tip"],
        "label",
        "box needs a label 表示箱子需要標籤。",
        "請用英文寫一句：這個商品缺貨。",
        "This item is out of stock."
      ),
      lesson(
        [
          ["shipment", "貨運；出貨", "The shipment arrived late."],
          ["ship", "運送", "We will ship the order tomorrow."],
          ["package", "包裹", "The package is heavy."],
          ["tracking", "追蹤", "The tracking number is in the email."],
          ["carrier", "承運商", "The carrier will pick up the boxes."]
        ],
        "Your shipment will leave the warehouse tomorrow morning. The tracking number will be sent by email.",
        "您的貨物明天早上會離開倉庫。追蹤號碼將以 email 寄出。",
        "The tracking number will be sent ___ email.",
        ["by", "at", "for", "of"],
        "by",
        "by email 表示透過 email。",
        "請用英文寫一句：我們明天會運送訂單。",
        "We will ship the order tomorrow."
      ),
      lesson(
        [
          ["quality control", "品質控管", "Quality control is important."],
          ["inspect", "檢查", "Please inspect the products."],
          ["defect", "瑕疵", "This product has a defect."],
          ["standard", "標準", "The product meets our standard."],
          ["sample", "樣品", "We tested a product sample."]
        ],
        "Quality control staff will inspect product samples today. Any item with a defect should be removed from the shipment.",
        "品質控管人員今天會檢查產品樣品。任何有瑕疵的商品都應從出貨中移除。",
        "Any item with a defect should be ___.",
        ["removed", "included", "reserved", "renewed"],
        "removed",
        "be removed 表示被移除。",
        "請用英文寫一句：這個產品有瑕疵。",
        "This product has a defect."
      ),
      lesson(
        [
          ["supplier", "供應商", "Our supplier is in Japan."],
          ["material", "材料", "We need more raw materials."],
          ["order", "訂單", "The order was placed yesterday."],
          ["shortage", "短缺", "There is a material shortage."],
          ["deliver", "送達", "The supplier will deliver parts."]
        ],
        "Our supplier reported a material shortage. Some parts will be delivered next week instead of this Friday.",
        "我們的供應商回報材料短缺。有些零件將在下週送達，而不是這個星期五。",
        "Some parts will be delivered ___ week.",
        ["next", "open", "full", "quiet"],
        "next",
        "next week 表示下週。",
        "請用英文寫一句：我們需要更多原料。",
        "We need more raw materials."
      ),
      lesson(
        [
          ["deadline", "期限", "The production deadline is Monday."],
          ["schedule", "排程", "The production schedule changed."],
          ["complete", "完成", "We completed the order."],
          ["process", "流程", "The process takes two days."],
          ["efficient", "有效率的", "The new process is efficient."]
        ],
        "The production schedule has changed. To meet the deadline, the team must complete the first process by Thursday.",
        "生產排程已變更。為了趕上期限，團隊必須在星期四前完成第一個流程。",
        "The team must complete the first process ___ Thursday.",
        ["by", "of", "with", "into"],
        "by",
        "by Thursday 表示星期四前或最晚星期四。",
        "請用英文寫一句：新流程很有效率。",
        "The new process is efficient."
      ),
      lesson(
        [
          ["safety", "安全", "Safety is our first concern."],
          ["helmet", "安全帽", "Wear a helmet in the factory."],
          ["glove", "手套", "Workers must wear gloves."],
          ["warning", "警告", "Read the warning sign."],
          ["accident", "意外", "Report any accident immediately."]
        ],
        "For safety, workers must wear helmets and gloves in the production area. Report any accident immediately.",
        "為了安全，工人在生產區必須戴安全帽和手套。任何意外都要立刻通報。",
        "Workers must wear helmets and ___.",
        ["gloves", "menus", "badges", "receipts"],
        "gloves",
        "helmets and gloves 是安全帽和手套。",
        "請用英文寫一句：安全是我們第一個考量。",
        "Safety is our first concern."
      )
    ]
  },
  {
    name: "活動與公告",
    lessons: [
      lesson(
        [
          ["event", "活動", "The event starts at 6 p.m."],
          ["announcement", "公告", "Please read the announcement."],
          ["invite", "邀請", "We invited all employees."],
          ["guest", "來賓", "Guests should sign in."],
          ["host", "主持；主辦", "Our company will host the event."]
        ],
        "Our company will host a charity event next Friday. Guests should sign in at the front desk before entering the hall.",
        "我們公司下週五將主辦慈善活動。來賓進入大廳前應在櫃台簽到。",
        "Guests should sign in ___ entering the hall.",
        ["before", "behind", "through", "among"],
        "before",
        "before entering 表示進入前。",
        "請用英文寫一句：活動下午六點開始。",
        "The event starts at 6 p.m."
      ),
      lesson(
        [
          ["registration", "報名；登記", "Registration opens Monday."],
          ["form", "表格", "Please complete the form."],
          ["deadline", "截止日", "The registration deadline is Friday."],
          ["limited", "有限的", "Seats are limited."],
          ["available", "可取得的", "Tickets are available online."]
        ],
        "Registration for the workshop opens Monday. Seats are limited, so please complete the online form before Friday.",
        "工作坊報名星期一開始。座位有限，所以請在星期五前完成線上表格。",
        "Seats are ___.",
        ["limited", "damaged", "included", "overdue"],
        "limited",
        "Seats are limited 表示座位有限。",
        "請用英文寫一句：票可以在線上取得。",
        "Tickets are available online."
      ),
      lesson(
        [
          ["workshop", "工作坊", "The workshop is about marketing."],
          ["speaker", "講者", "The speaker is from Canada."],
          ["topic", "主題", "The topic is online sales."],
          ["schedule", "時間表", "The schedule is on the website."],
          ["break", "休息", "There is a break at 10 a.m."]
        ],
        "The marketing workshop begins at 9 a.m. The first speaker will discuss online sales, and there will be a break at 10 a.m.",
        "行銷工作坊上午 9 點開始。第一位講者會討論線上銷售，上午 10 點會有休息時間。",
        "The first speaker will discuss online ___.",
        ["sales", "gloves", "blankets", "fees"],
        "sales",
        "online sales 是線上銷售。",
        "請用英文寫一句：工作坊上午九點開始。",
        "The workshop begins at 9 a.m."
      ),
      lesson(
        [
          ["ceremony", "典禮", "The ceremony starts at noon."],
          ["award", "獎項", "She received an award."],
          ["celebrate", "慶祝", "We will celebrate the new office."],
          ["achievement", "成就", "This is a great achievement."],
          ["photo", "照片", "We took a group photo."]
        ],
        "The award ceremony will begin at noon. After the ceremony, employees will take a group photo in the lobby.",
        "頒獎典禮將在中午開始。典禮後，員工會在大廳拍團體照。",
        "Employees will take a group photo ___ the lobby.",
        ["in", "on", "at", "for"],
        "in",
        "in the lobby 表示在大廳裡。",
        "請用英文寫一句：她得到一個獎項。",
        "She received an award."
      ),
      lesson(
        [
          ["notice", "通知", "The notice is on the door."],
          ["closed", "關閉的", "The office is closed today."],
          ["holiday", "假日", "Monday is a national holiday."],
          ["reopen", "重新開放", "The store will reopen Tuesday."],
          ["regular", "正常的；固定的", "Regular hours start next week."]
        ],
        "Please note that the office will be closed on Monday for a national holiday. Regular hours will resume on Tuesday.",
        "請注意，辦公室星期一因國定假日關閉。星期二恢復正常營業時間。",
        "Regular hours will resume ___ Tuesday.",
        ["on", "in", "for", "by"],
        "on",
        "on Tuesday 表示在星期二。",
        "請用英文寫一句：辦公室今天關閉。",
        "The office is closed today."
      ),
      lesson(
        [
          ["donation", "捐款", "We collected donations."],
          ["charity", "慈善", "The charity helps children."],
          ["volunteer", "志工", "Volunteers should arrive early."],
          ["collect", "收集", "We will collect food."],
          ["support", "支持", "Thank you for your support."]
        ],
        "Volunteers should arrive at 8 a.m. to help collect donations. Thank you for supporting our charity event.",
        "志工應於上午 8 點抵達協助收集捐款。感謝您支持我們的慈善活動。",
        "Volunteers should arrive ___ 8 a.m.",
        ["at", "on", "by", "of"],
        "at",
        "at 8 a.m. 表示在上午 8 點。",
        "請用英文寫一句：謝謝你的支持。",
        "Thank you for your support."
      ),
      lesson(
        [
          ["feedback", "回饋", "Please give us feedback."],
          ["survey", "問卷", "Complete the survey online."],
          ["improve", "改善", "Your feedback helps us improve."],
          ["opinion", "意見", "We value your opinion."],
          ["result", "結果", "The survey results are ready."]
        ],
        "After the event, please complete the online survey. Your feedback will help us improve future events.",
        "活動後，請完成線上問卷。您的回饋會幫助我們改善未來活動。",
        "Your feedback will help us ___ future events.",
        ["improve", "expire", "withdraw", "replace"],
        "improve",
        "help us improve 表示幫助我們改善。",
        "請用英文寫一句：我們重視你的意見。",
        "We value your opinion."
      )
    ]
  }
];

const tasks = [
  ["vocab", "字彙 10 分鐘", "唸出單字和例句，遮住中文回想意思。"],
  ["listen", "聽讀 8 分鐘", "先聽英文，再跟讀 2 次，最後看翻譯。"],
  ["grammar", "文法 5 分鐘", "做一題並確認自己為什麼選這個答案。"],
  ["output", "輸出 5 分鐘", "用英文寫 1-3 句，練習把意思說出來。"]
];

const state = loadState();
const todayRecord = currentDay();
const activeLessonNumber = todayRecord.lessonNumber;
const currentWeekIndex = Math.floor(activeLessonNumber / 7);
const currentPack = weeklyPacks[currentWeekIndex % weeklyPacks.length];
const lessonIndex = activeLessonNumber % currentPack.lessons.length;
const lessonForToday = currentPack.lessons[lessonIndex];
const pendingReviewWeekIndex = getPendingReviewWeekIndex();
const reviewWeekIndex = pendingReviewWeekIndex ?? currentWeekIndex;
const reviewPack = weeklyPacks[reviewWeekIndex % weeklyPacks.length];
const weekKey = `study-week-${reviewWeekIndex + 1}`;
const reviewReady = pendingReviewWeekIndex !== null || Boolean(state.weeklyTests[weekKey]);

const sentenceTranslations = {
  "Please confirm your appointment by Friday.": "請在星期五前確認您的預約。",
  "The meeting is on my schedule.": "這場會議在我的行程表上。",
  "We sent the invoice this morning.": "我們今天早上寄出了發票。",
  "The manager is available after 3 p.m.": "經理下午三點後有空。",
  "The printer needs repair.": "這台印表機需要維修。",
  "The manager is not available now. She ___ a client in the meeting room.": "經理現在沒空。她正在會議室與一位客戶會面。",
  "The company will purchase new computers.": "公司將購買新電腦。",
  "The flight delay lasted two hours.": "班機延誤持續了兩個小時。",
  "Please contact the sales department.": "請聯絡業務部門。",
  "Keep your receipt for a refund.": "請保留收據以便退款。",
  "I will attend the training session.": "我會參加這場訓練課程。",
  "Please keep your ___ if you want to return the item.": "如果你想退貨，請保留你的收據。",
  "Can you recommend a good restaurant?": "你可以推薦一家好餐廳嗎？",
  "Please read the company policy.": "請閱讀公司規定。",
  "I would like to reserve a table for two.": "我想預訂兩人座位。",
  "Sales increased last month.": "上個月銷售額增加了。",
  "Please complete the form online.": "請在線上完成表格。",
  "Members can ___ classes online.": "會員可以在線上預約課程。",
  "Please submit the report by noon.": "請在中午前提交報告。",
  "The supervisor will review your application.": "主管會審查你的申請。",
  "The new branch opens next Monday.": "新分店下週一開幕。",
  "The customer asked for a refund.": "顧客要求退款。",
  "All staff must attend safety training.": "所有員工都必須參加安全訓練。",
  "All staff must ___ safety training next week.": "所有員工下週都必須參加安全訓練。",
  "We need to replace the old printer.": "我們需要更換舊印表機。",
  "I have a dental appointment at 2 p.m.": "我下午兩點有牙醫預約。",
  "The new office location is near the station.": "新辦公室地點在車站附近。",
  "This coupon gives you a ten percent discount.": "這張優惠券可享九折優惠。",
  "Please prepare the slides before the meeting.": "請在會議前準備投影片。",
  "Please ___ the slides before the meeting.": "請在會議前準備投影片。",
  "The package will be delivered tomorrow.": "包裹明天會送達。",
  "The project is over budget.": "這個專案超出預算。",
  "The director approved the plan.": "主管批准了這個計畫。",
  "Please contact me by email.": "請用電子郵件聯絡我。",
  "The office needs new equipment.": "辦公室需要新設備。",
  "The director ___ the plan yesterday.": "主管昨天批准了這個計畫。",
  "The annual report is ready.": "年度報告準備好了。",
  "This job has good benefits.": "這份工作有很好的福利。",
  "We need to cancel the reservation.": "我們需要取消預約。",
  "This position requires two years of experience.": "這個職位需要兩年經驗。",
  "Please update your contact information.": "請更新您的聯絡資料。",
  "All employees are ___ to attend the meeting.": "所有員工都被要求參加會議。"
};

render();

document.getElementById("resetToday").addEventListener("click", () => {
  const day = currentDay();
  if (day.lessonFinished && state.studyCursor === day.lessonNumber + 1) {
    state.studyCursor = day.lessonNumber;
  }
  state.days[todayKey] = {
    tasks: {},
    writing: "",
    lessonNumber: activeLessonNumber,
    lessonFinished: false
  };
  saveState();
  render();
});

document.getElementById("extraLesson").addEventListener("click", () => {
  startExtraLesson();
});

document.getElementById("speakText").addEventListener("click", () => {
  speak(lessonForToday.reading, "listen");
});

document.getElementById("showTranslation").addEventListener("click", () => {
  const translation = document.getElementById("translationText");
  const button = document.getElementById("showTranslation");
  translation.hidden = !translation.hidden;
  button.textContent = translation.hidden ? "顯示翻譯" : "收起翻譯";
});

document.getElementById("saveWriting").addEventListener("click", () => {
  const text = document.getElementById("writingBox").value.trim();
  currentDay().writing = text;
  if (text.length > 0) {
    completeTask("output");
    document.getElementById("writingHint").textContent = "已儲存。明天回來時，你會看到進度被保留下來。";
  } else {
    saveState();
    document.getElementById("writingHint").textContent = "先寫一句也可以，重點是每天有輸出。";
  }
});

document.getElementById("sampleAnswer").addEventListener("click", () => {
  document.getElementById("writingHint").textContent = lessonForToday.sample;
});

document.getElementById("showWritingTranslation").addEventListener("click", () => {
  const translation = document.getElementById("writingTranslation");
  const button = document.getElementById("showWritingTranslation");
  translation.hidden = !translation.hidden;
  button.textContent = translation.hidden ? "顯示中文" : "收起中文";
});

document.getElementById("showQuizTranslation").addEventListener("click", () => {
  const translation = document.getElementById("quizTranslation");
  const button = document.getElementById("showQuizTranslation");
  translation.hidden = !translation.hidden;
  button.textContent = translation.hidden ? "題目中文" : "收起中文";
});

document.getElementById("startWeeklyTest").addEventListener("click", () => {
  renderWeeklyQuiz(true);
});

document.getElementById("submitWeeklyTest").addEventListener("click", () => {
  submitWeeklyTest();
});

document.getElementById("clearWrongWords").addEventListener("click", () => {
  if (!confirm("確定要清空所有錯題紀錄嗎？")) return;
  state.wrongWords = [];
  saveState();
  renderWrongWords();
});

function lesson(words, reading, translation, question, options, answer, explain, prompt, sample) {
  return {
    words,
    reading,
    translation,
    quiz: { question, options, answer, explain },
    prompt,
    sample
  };
}

function render() {
  renderTasks();
  renderWords();
  renderReading();
  renderQuiz();
  renderWriting();
  renderStats();
  renderWeeklySummary();
  renderWrongWords();
  renderGrammarMistakes();
  updateExtraLessonButton();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(([id, title, note]) => {
    const item = document.createElement("article");
    item.className = "task";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(currentDay().tasks[id]);
    checkbox.addEventListener("change", () => {
      currentDay().tasks[id] = checkbox.checked;
      const justCompleted = updateLessonCompletion();
      saveState();
      if (justCompleted && state.studyCursor % 7 === 0) {
        window.location.reload();
        return;
      }
      renderStats();
      updateExtraLessonButton();
    });

    const text = document.createElement("span");
    text.textContent = title;
    label.append(checkbox, text);

    const small = document.createElement("small");
    small.textContent = note;
    item.append(label, small);
    list.append(item);
  });
}

function renderWords() {
  const list = document.getElementById("wordList");
  list.innerHTML = "";

  lessonForToday.words.forEach(([word, meaning, example]) => {
    const item = document.createElement("div");
    item.className = "word-item";
    const body = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = word;

    const meaningText = document.createElement("span");
    meaningText.className = "word-meaning";
    meaningText.textContent = meaning;

    const exampleText = document.createElement("span");
    exampleText.className = "word-example";
    exampleText.textContent = example;

    const exampleTranslation = document.createElement("span");
    exampleTranslation.className = "example-translation";
    exampleTranslation.textContent = getSentenceTranslation(example, word);
    exampleTranslation.hidden = true;

    body.append(title, meaningText, exampleText, exampleTranslation);

    const actions = document.createElement("div");
    actions.className = "word-actions";

    const exampleButton = document.createElement("button");
    exampleButton.className = "ghost-button";
    exampleButton.type = "button";
    exampleButton.textContent = "例句中文";
    exampleButton.addEventListener("click", () => {
      exampleTranslation.hidden = !exampleTranslation.hidden;
      exampleButton.textContent = exampleTranslation.hidden ? "例句中文" : "收起例句";
    });

    const speakButton = document.createElement("button");
    speakButton.className = "ghost-button";
    speakButton.type = "button";
    speakButton.textContent = "唸";
    speakButton.addEventListener("click", () => speak(example, "vocab"));

    actions.append(exampleButton, speakButton);
    item.append(body, actions);
    list.append(item);
  });
}

function renderReading() {
  document.getElementById("readingText").textContent = lessonForToday.reading;
  document.getElementById("translationText").textContent = lessonForToday.translation;
  document.getElementById("translationText").hidden = true;
  document.getElementById("showTranslation").textContent = "顯示翻譯";
}

function renderQuiz() {
  document.getElementById("quizQuestion").textContent = lessonForToday.quiz.question;
  document.getElementById("quizTranslation").textContent = getSentenceTranslation(lessonForToday.quiz.question);
  document.getElementById("quizTranslation").hidden = true;
  document.getElementById("showQuizTranslation").textContent = "題目中文";
  document.getElementById("quizFeedback").textContent = "";
  const options = document.getElementById("quizOptions");
  options.innerHTML = "";

  lessonForToday.quiz.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      const correct = option === lessonForToday.quiz.answer;
      [...options.querySelectorAll("button")].forEach((optionButton) => {
        optionButton.disabled = true;
      });
      button.textContent = `${correct ? "O" : "X"} ${option}`;
      button.classList.add(correct ? "is-correct" : "is-wrong");
      if (!correct) {
        const correctButton = [...options.querySelectorAll("button")]
          .find((optionButton) => optionButton.textContent === lessonForToday.quiz.answer);
        if (correctButton) {
          correctButton.textContent = `O ${lessonForToday.quiz.answer}`;
          correctButton.classList.add("is-correct");
        }
        saveGrammarMistake(option);
        renderGrammarMistakes();
      }
      document.getElementById("quizFeedback").textContent = correct
        ? `答對了。${lessonForToday.quiz.explain}`
        : `這題答案是 ${lessonForToday.quiz.answer}。${lessonForToday.quiz.explain}`;
      completeTask("grammar");
    });
    options.append(button);
  });
}

function renderWriting() {
  document.getElementById("writingPrompt").textContent = "Write one English sentence for today's situation. Use today's vocabulary if you can.";
  document.getElementById("writingTranslation").textContent = lessonForToday.prompt;
  document.getElementById("writingTranslation").hidden = true;
  document.getElementById("showWritingTranslation").textContent = "顯示中文";
  document.getElementById("writingBox").value = currentDay().writing || "";
  document.getElementById("writingHint").textContent = "";
}

function renderStats() {
  const doneCount = Object.values(currentDay().tasks).filter(Boolean).length;
  const percent = Math.round((doneCount / tasks.length) * 100);
  document.getElementById("todayScore").textContent = `${percent}%`;
  document.getElementById("todayBar").style.width = `${percent}%`;
  document.getElementById("streakDays").textContent = calculateStreak();
  const activeProgress = currentDay().lessonFinished ? 0 : doneCount;
  document.getElementById("totalDone").textContent = ((state.studyCursor || 0) * tasks.length) + activeProgress;
  document.getElementById("phaseName").textContent = getPhaseName();
}

function renderWeeklySummary() {
  const result = state.weeklyTests[weekKey];
  const status = document.getElementById("weeklyStatus");
  const quiz = document.getElementById("weeklyQuiz");
  const weeklyResult = document.getElementById("weeklyResult");

  quiz.innerHTML = "";
  document.getElementById("startWeeklyTest").disabled = !reviewReady;
  document.getElementById("submitWeeklyTest").hidden = true;

  if (result) {
    status.textContent = `複習主題：${reviewPack.name}。已考過：${result.score}/${result.total} 題答對，最近一次交卷是 ${result.date}。可以重考，成績會更新。`;
    weeklyResult.textContent = result.mistakes.length
      ? `本週錯題：${result.mistakes.map((item) => item.word).join("、")}`
      : "漂亮，本週測驗沒有錯題。";
  } else {
    const readyText = pendingReviewWeekIndex !== null
      ? "你已完成這 7 天，可以開始週複習。"
      : "累積完成 7 個每日練習後，這裡會變成週複習。";
    status.textContent = `複習主題：${reviewPack.name}。${readyText}測驗只會考這 7 天練過的單字。`;
    weeklyResult.textContent = "";
  }
}

function renderWeeklyQuiz(started) {
  if (!reviewReady) {
    document.getElementById("weeklyResult").textContent = "完成 7 個每日練習後，週複習才會開放。";
    return;
  }

  const quiz = document.getElementById("weeklyQuiz");
  const questions = buildWeeklyQuestions();
  quiz.innerHTML = "";
  document.getElementById("weeklyResult").textContent = "";
  document.getElementById("weeklyStatus").textContent = started
    ? `週測驗共 ${questions.length} 題，只複習「${reviewPack.name}」這 7 天的單字。`
    : "";
  document.getElementById("submitWeeklyTest").hidden = false;

  questions.forEach((question, index) => {
    const block = document.createElement("div");
    block.className = "weekly-question";

    const title = document.createElement("strong");
    title.textContent = `${index + 1}. ${question.word}`;
    block.append(title);

    question.options.forEach((option) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `weekly-${index}`;
      radio.value = option;
      label.append(radio, document.createTextNode(option));
      block.append(label);
    });

    quiz.append(block);
  });
}

function submitWeeklyTest() {
  const questions = buildWeeklyQuestions();
  const mistakes = [];
  let score = 0;

  questions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="weekly-${index}"]:checked`);
    const answer = selected ? selected.value : "";
    if (answer === question.meaning) {
      score += 1;
    } else {
      mistakes.push({
        word: question.word,
        correct: question.meaning,
        chosen: answer || "未作答",
        example: question.example
      });
    }
  });

  state.weeklyTests[weekKey] = {
    date: todayKey,
    packName: reviewPack.name,
    score,
    total: questions.length,
    mistakes
  };
  saveMistakes(mistakes);
  saveState();

  document.getElementById("weeklyResult").textContent = mistakes.length
    ? `得分 ${score}/${questions.length}。錯的單字已加入錯題紀錄。`
    : `得分 ${score}/${questions.length}。這週單字掌握得很好。`;
  document.getElementById("submitWeeklyTest").hidden = true;
  renderWeeklySummary();
  renderWrongWords();
  updateExtraLessonButton();
}

function renderWrongWords() {
  const list = document.getElementById("wrongWordList");
  const wrongWords = [...state.wrongWords].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  list.innerHTML = "";

  if (wrongWords.length === 0) {
    const empty = document.createElement("p");
    empty.className = "weekly-status";
    empty.textContent = "目前沒有錯題。週測驗答錯後，單字會自動出現在這裡。";
    list.append(empty);
    return;
  }

  wrongWords.forEach((item) => {
    const block = document.createElement("div");
    block.className = "wrong-item";
    block.innerHTML = `
      <strong>${item.word} <span>錯 ${item.count} 次</span></strong>
      <span>正解：${item.correct}</span>
      <span>上次選：${item.chosen}</span>
      <span>${item.example}</span>
    `;
    list.append(block);
  });
}

function renderGrammarMistakes() {
  const list = document.getElementById("grammarMistakeList");
  const mistakes = [...state.grammarMistakes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  list.innerHTML = "";

  if (mistakes.length === 0) return;

  const title = document.createElement("h3");
  title.textContent = "文法錯題紀錄";
  list.append(title);

  mistakes.forEach((item) => {
    const block = document.createElement("div");
    block.className = "grammar-mistake";
    block.innerHTML = `
      <strong>${item.question}</strong>
      <span>中文：${item.translation}</span>
      <span>你選：${item.chosen}</span>
      <span>正解：${item.answer}</span>
      <span>${item.explain}</span>
      <span>錯 ${item.count} 次</span>
    `;
    list.append(block);
  });
}

function completeTask(id) {
  currentDay().tasks[id] = true;
  const justCompleted = updateLessonCompletion();
  saveState();
  if (justCompleted && state.studyCursor % 7 === 0) {
    window.location.reload();
    return;
  }
  renderTasks();
  renderStats();
  updateExtraLessonButton();
}

function updateLessonCompletion() {
  const day = currentDay();
  const doneCount = Object.values(day.tasks || {}).filter(Boolean).length;
  const isDone = doneCount === tasks.length;

  if (isDone && !day.lessonFinished) {
    day.lessonFinished = true;
    state.completedDates[todayKey] = true;
    state.studyCursor = Math.max(state.studyCursor || 0, day.lessonNumber + 1);
    return true;
  }

  return false;
}

function updateExtraLessonButton() {
  const button = document.getElementById("extraLesson");
  const day = currentDay();
  const pendingReview = getPendingReviewWeekIndex() !== null;
  button.disabled = !day.lessonFinished || pendingReview;
  button.textContent = pendingReview ? "先做週複習" : "加練下一課";
}

function startExtraLesson() {
  const day = currentDay();
  const pendingReview = getPendingReviewWeekIndex() !== null;

  if (!day.lessonFinished) {
    alert("完成目前這課的 4 個任務後，就可以加練下一課。");
    return;
  }

  if (pendingReview) {
    alert("你已完成 7 個每日練習，請先做週複習，再進入下一週。");
    return;
  }

  state.days[todayKey] = {
    tasks: {},
    writing: "",
    lessonNumber: state.studyCursor || 0,
    lessonFinished: false
  };
  saveState();
  window.location.reload();
}

function speak(text, taskId) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
  if (taskId) completeTask(taskId);
}

function currentDay() {
  if (!state.days[todayKey]) {
    state.days[todayKey] = {
      tasks: {},
      writing: "",
      lessonNumber: state.studyCursor || 0,
      lessonFinished: false
    };
  } else {
    const day = state.days[todayKey];
    day.tasks = day.tasks || {};
    day.writing = day.writing || "";
    if (!Number.isInteger(day.lessonNumber)) {
      day.lessonNumber = state.studyCursor || 0;
    }
    day.lessonFinished = Boolean(day.lessonFinished);
  }
  return state.days[todayKey];
}

function loadState() {
  const raw = localStorage.getItem("englishPracticeState");
  let loaded;

  if (!raw) {
    loaded = {};
  } else {
    try {
      loaded = JSON.parse(raw);
    } catch {
      loaded = {};
    }
  }

  return {
    startDate: loaded.startDate || todayKey,
    days: loaded.days || {},
    studyCursor: Number.isInteger(loaded.studyCursor)
      ? loaded.studyCursor
      : deriveStudyCursor(loaded.days || {}),
    completedDates: loaded.completedDates || deriveCompletedDates(loaded.days || {}),
    weeklyTests: loaded.weeklyTests || {},
    wrongWords: loaded.wrongWords || [],
    grammarMistakes: loaded.grammarMistakes || []
  };
}

function deriveStudyCursor(days) {
  return Object.values(days).filter((day) => {
    const tasksDone = Object.values(day.tasks || {}).filter(Boolean).length;
    return tasksDone === tasks.length;
  }).length;
}

function deriveCompletedDates(days) {
  return Object.entries(days).reduce((dates, [date, day]) => {
    const tasksDone = Object.values(day.tasks || {}).filter(Boolean).length;
    if (tasksDone === tasks.length || day.lessonFinished) {
      dates[date] = true;
    }
    return dates;
  }, {});
}

function saveState() {
  localStorage.setItem("englishPracticeState", JSON.stringify(state));
}

function saveMistakes(mistakes) {
  mistakes.forEach((mistake) => {
    const existing = state.wrongWords.find((item) => item.word === mistake.word);
    if (existing) {
      existing.count += 1;
      existing.chosen = mistake.chosen;
      existing.correct = mistake.correct;
      existing.example = mistake.example;
      existing.updatedAt = todayKey;
      existing.weekKey = weekKey;
    } else {
      state.wrongWords.push({
        ...mistake,
        count: 1,
        updatedAt: todayKey,
        weekKey
      });
    }
  });
}

function saveGrammarMistake(chosen) {
  const quiz = lessonForToday.quiz;
  const existing = state.grammarMistakes.find((item) => item.question === quiz.question);
  const mistake = {
    question: quiz.question,
    translation: getSentenceTranslation(quiz.question),
    chosen,
    answer: quiz.answer,
    explain: quiz.explain,
    updatedAt: todayKey
  };

  if (existing) {
    existing.count += 1;
    existing.chosen = chosen;
    existing.answer = mistake.answer;
    existing.explain = mistake.explain;
    existing.translation = mistake.translation;
    existing.updatedAt = todayKey;
  } else {
    state.grammarMistakes.push({ ...mistake, count: 1 });
  }

  saveState();
}

function getSentenceTranslation(sentence, focusWord = "") {
  if (sentenceTranslations[sentence]) return sentenceTranslations[sentence];

  const filledSentence = sentence.replace("___", lessonForToday.quiz.answer || "_____");
  if (sentenceTranslations[filledSentence]) return sentenceTranslations[filledSentence];

  const focusHint = focusWord ? `重點字：${focusWord}。` : "";
  return `${focusHint}這句是在練英文句意，請先試著自己翻譯；之後可把這句加入翻譯表。`;
}

function getPendingReviewWeekIndex() {
  const completedLessons = state.studyCursor || 0;
  if (completedLessons === 0 || completedLessons % 7 !== 0) return null;

  const finishedWeekIndex = (completedLessons / 7) - 1;
  const finishedWeekKey = `study-week-${finishedWeekIndex + 1}`;
  return state.weeklyTests[finishedWeekKey] ? null : finishedWeekIndex;
}

function buildWeeklyQuestions() {
  const bank = getCurrentWeekVocabBank();
  const shuffled = seededShuffle(bank, hashString(weekKey));
  const questionCount = Math.min(10, shuffled.length);
  const questions = shuffled.slice(0, questionCount);

  return questions.map((wordItem, index) => {
    const otherMeanings = bank
      .filter((item) => item.word !== wordItem.word)
      .map((item) => item.meaning);
    const wrongOptions = seededShuffle(otherMeanings, index + hashString(weekKey)).slice(0, 3);
    const options = seededShuffle([wordItem.meaning, ...wrongOptions], hashString(`${weekKey}-${wordItem.word}`));
    return { ...wordItem, options };
  });
}

function getCurrentWeekVocabBank() {
  return reviewPack.lessons.flatMap((packLesson) =>
    packLesson.words.map(([word, meaning, example]) => ({ word, meaning, example }))
  );
}

function seededShuffle(items, seed) {
  const result = [...items];
  let currentSeed = seed || 1;

  for (let index = result.length - 1; index > 0; index -= 1) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const swapIndex = Math.floor((currentSeed / 233280) * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function hashString(text) {
  return [...text].reduce((hash, char) => {
    return ((hash << 5) - hash + char.charCodeAt(0)) >>> 0;
  }, 0);
}

function calculateStreak() {
  let streak = 0;
  const date = parseDateKey(todayKey);

  while (true) {
    const key = formatDateKey(date);
    const day = state.days[key];
    const isDone = Boolean(state.completedDates[key])
      || (day && Object.values(day.tasks || {}).filter(Boolean).length === tasks.length);
    if (!isDone) break;
    streak += 1;
    date.setDate(date.getDate() - 1);
  }

  return streak;
}

function getPhaseName() {
  const day = activeLessonNumber;
  if (day < 90) return "打底期";
  if (day < 270) return "加速期";
  return "衝刺期";
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}
