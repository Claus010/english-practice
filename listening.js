const today = new Date();
const todayKey = formatDateKey(today);
const stateKey = "englishListeningPracticeState";

const tasks = [
  { id: "listen", title: "盲聽兩次", detail: "先不要看逐字稿，只抓人物、地點、目的。" },
  { id: "dictation", title: "聽寫關鍵句", detail: "寫出今天的核心句，訓練音與字的連結。" },
  { id: "quiz", title: "完成理解題", detail: "用題目確認是否抓到真正重點。" },
  { id: "shadow", title: "跟讀與紀錄", detail: "模仿語調，記下卡住的音。" }
];

const weeklyPacks = [
  week("辦公與會議", "Office and meetings", [
    lesson("會議改期", "Good morning, everyone. Today's budget meeting has been moved from Conference Room B to Room 305. Please bring the sales report and arrive five minutes early.", "今天的預算會議改到 305 會議室，請帶銷售報告並提早到。", "The budget meeting has been moved to Room 305.", "Where will the meeting take place?", ["Room 305", "Conference Room B", "The sales office", "The lobby"], "Room 305"),
    lesson("客戶來電", "Hello, this is Nina from Westside Printing. I am calling to confirm your order of two hundred brochures. They will be delivered tomorrow afternoon.", "印刷公司來確認兩百份手冊訂單，明天下午送達。", "I am calling to confirm your order of two hundred brochures.", "Why is Nina calling?", ["To confirm an order", "To cancel a meeting", "To request a refund", "To schedule training"], "To confirm an order"),
    lesson("主管提醒", "Before you leave today, please submit your travel expense form to Ms. Chen. The finance department needs all forms by Friday at noon.", "今天下班前把差旅費表交給陳小姐，財務部週五中午前需要所有表格。", "Please submit your travel expense form to Ms. Chen.", "What should employees submit?", ["A travel expense form", "A product catalog", "A training schedule", "A customer list"], "A travel expense form"),
    lesson("設備維修", "The printer near the reception desk is out of order. A technician will repair it at three o'clock. Please use the printer on the second floor.", "接待處旁的印表機故障，三點維修，請使用二樓印表機。", "The printer near the reception desk is out of order.", "What problem is mentioned?", ["A printer is broken", "A meeting is late", "A package is missing", "A room is too small"], "A printer is broken"),
    lesson("新人訓練", "New staff members should attend the safety training session on Monday morning. The session will begin at nine in the main conference room.", "新員工週一早上九點在主會議室參加安全訓練。", "New staff members should attend the safety training session.", "Who should attend the session?", ["New staff members", "All customers", "Delivery drivers", "Sales managers only"], "New staff members"),
    lesson("專案進度", "The website project is almost complete. Please review the final pages today and send any comments to the design team by four p.m.", "網站專案快完成，今天檢查最後頁面並在四點前回覆設計團隊。", "Please review the final pages today.", "What are listeners asked to review?", ["The final pages", "The monthly invoice", "The office policy", "The interview schedule"], "The final pages"),
    lesson("休假公告", "The office will be closed next Friday for the company anniversary. Regular business hours will resume the following Monday.", "公司週年慶下週五辦公室休息，週一恢復正常營業。", "The office will be closed next Friday.", "When will the office be closed?", ["Next Friday", "This Monday", "Tomorrow morning", "Every weekend"], "Next Friday")
  ]),
  week("旅遊與交通", "Travel and transportation", [
    lesson("登機提醒", "Passengers on Flight 218 to Tokyo should proceed to Gate 12. Boarding will begin in fifteen minutes, so please have your passport ready.", "飛往東京 218 班機請到 12 號登機門，十五分鐘後登機。", "Boarding will begin in fifteen minutes.", "What should passengers do?", ["Go to Gate 12", "Pick up luggage", "Change seats", "Call the hotel"], "Go to Gate 12"),
    lesson("火車誤點", "The 8:20 train to Tainan has been delayed because of heavy rain. The new departure time is 8:55.", "往台南 8:20 火車因大雨延到 8:55。", "The new departure time is 8:55.", "Why is the train delayed?", ["Heavy rain", "A ticket problem", "A holiday", "A broken elevator"], "Heavy rain"),
    lesson("飯店接駁", "The hotel shuttle leaves the airport every thirty minutes. Please wait outside Exit 3 and show your reservation number to the driver.", "飯店接駁車每三十分鐘一班，在 3 號出口外等並給司機訂房號碼。", "The hotel shuttle leaves the airport every thirty minutes.", "Where should guests wait?", ["Outside Exit 3", "At Gate 12", "In the hotel lobby", "Near the ticket counter"], "Outside Exit 3"),
    lesson("租車說明", "Your rental car is parked in space C17. Please return the vehicle with a full tank of gas by six p.m. on Sunday.", "租車停在 C17，週日六點前滿油歸還。", "Please return the vehicle with a full tank of gas.", "What must the customer do?", ["Return the car with full gas", "Pay for a hotel room", "Change the seat", "Wash the windows"], "Return the car with full gas"),
    lesson("導覽集合", "The city walking tour starts at nine thirty. Our guide will meet you in front of the museum entrance with a blue umbrella.", "城市步行導覽九點半開始，導遊拿藍傘在博物館入口前集合。", "Our guide will meet you in front of the museum entrance.", "How can people find the guide?", ["Look for a blue umbrella", "Call the airline", "Check the train board", "Enter Room 305"], "Look for a blue umbrella"),
    lesson("行李服務", "If your luggage is missing, please complete this form and describe the color and size of your bag. We will contact you within twenty-four hours.", "行李遺失需填表並描述顏色尺寸，二十四小時內聯絡。", "We will contact you within twenty-four hours.", "What information is requested?", ["The bag's color and size", "The hotel price", "The meeting agenda", "The driver's name"], "The bag's color and size"),
    lesson("交通管制", "Due to a road race downtown, bus route 16 will not stop at Central Station this morning. Please use the temporary stop on River Street.", "因市中心路跑，16 路公車今早不停中央車站，請到 River Street 臨時站。", "Please use the temporary stop on River Street.", "What change is announced?", ["A bus stop is moved", "A flight is canceled", "A tour is full", "A car is repaired"], "A bus stop is moved")
  ]),
  week("購物與客服", "Shopping and customer service", [
    lesson("退貨政策", "Items can be returned within seven days with the original receipt. Damaged products may be exchanged at the service counter.", "商品七天內可憑原始收據退貨，損壞品可到服務台更換。", "Items can be returned within seven days with the original receipt.", "What is needed for a return?", ["The original receipt", "A passport", "A meeting form", "A parking ticket"], "The original receipt"),
    lesson("會員優惠", "This weekend, members receive a fifteen percent discount on all kitchen items. Please show your membership card before paying.", "本週末會員購買廚房用品享 85 折，付款前出示會員卡。", "Members receive a fifteen percent discount.", "Who gets the discount?", ["Members", "New employees", "Tour guides", "Drivers"], "Members"),
    lesson("商品缺貨", "We are sorry, but the blue jacket is currently out of stock. A new shipment is expected next Wednesday.", "藍色外套目前缺貨，預計下週三到貨。", "A new shipment is expected next Wednesday.", "What item is out of stock?", ["The blue jacket", "The black suitcase", "The coffee maker", "The office chair"], "The blue jacket"),
    lesson("訂單配送", "Your online order has shipped and should arrive by Friday evening. You can track the package using the link in your confirmation email.", "線上訂單已出貨，週五晚上前到，可用確認信連結追蹤。", "You can track the package using the link.", "Where is the tracking link?", ["In the confirmation email", "On the receipt only", "At the service desk", "Beside the entrance"], "In the confirmation email"),
    lesson("付款問題", "The card reader is not working at register two. Please use register three or pay in cash at the customer service desk.", "二號收銀台刷卡機故障，請到三號或服務台付現。", "The card reader is not working at register two.", "What problem is mentioned?", ["A card reader is broken", "A product is too expensive", "A package is late", "A store is closed"], "A card reader is broken"),
    lesson("保固說明", "This camera includes a one-year warranty. If it stops working, bring it back with the warranty card and purchase receipt.", "相機含一年保固，若故障請帶保固卡與購買收據。", "This camera includes a one-year warranty.", "How long is the warranty?", ["One year", "Seven days", "Two weeks", "Five years"], "One year"),
    lesson("客服回覆", "Thank you for contacting customer service. We have received your complaint and will respond with a solution by tomorrow afternoon.", "客服已收到客訴，明天下午前回覆解決方案。", "We will respond with a solution by tomorrow afternoon.", "When will the company respond?", ["By tomorrow afternoon", "In fifteen minutes", "Next month", "At nine tonight"], "By tomorrow afternoon")
  ]),
  week("餐飲與訂位", "Restaurants and reservations", [
    lesson("餐廳訂位", "Thank you for calling Harbor Bistro. Your reservation for four people is confirmed for Saturday at seven p.m.", "餐廳確認週六晚上七點四人訂位。", "Your reservation for four people is confirmed.", "How many people is the reservation for?", ["Four", "Two", "Seven", "Twelve"], "Four"),
    lesson("外帶通知", "Your takeout order will be ready in ten minutes. Please pick it up at the counter near the front door.", "外帶餐點十分鐘後好，請到前門旁櫃台取餐。", "Your takeout order will be ready in ten minutes.", "Where should the customer pick up the order?", ["At the counter", "In Room 305", "At Gate 12", "On River Street"], "At the counter"),
    lesson("菜單更換", "The grilled fish is not available today, but we recommend the chicken pasta. It comes with soup and a small salad.", "今日沒有烤魚，推薦雞肉義大利麵，附湯和小沙拉。", "We recommend the chicken pasta.", "What dish is recommended?", ["Chicken pasta", "Grilled fish", "Beef soup", "Fruit salad"], "Chicken pasta"),
    lesson("咖啡店公告", "Our coffee shop will close early today at five p.m. because of staff training. We will open at the usual time tomorrow.", "咖啡店因員工訓練今天五點提早關門，明天照常營業。", "Our coffee shop will close early today at five p.m.", "Why will the shop close early?", ["Staff training", "A holiday sale", "Bad weather", "A delivery delay"], "Staff training"),
    lesson("宴會確認", "This message is to confirm your banquet room booking for June twenty-first. Please send the final guest count by next Monday.", "確認 6 月 21 日宴會廳預訂，最終賓客數請下週一前寄出。", "Please send the final guest count by next Monday.", "What should be sent?", ["The final guest count", "A passport number", "A warranty card", "A train schedule"], "The final guest count"),
    lesson("送餐延誤", "We apologize that your meal delivery is late. The driver is about five minutes away, and we have added a free dessert to your order.", "餐點外送延遲，司機約五分鐘到，並附免費甜點。", "The driver is about five minutes away.", "What did the company add?", ["A free dessert", "A new drink", "A discount card", "A second driver"], "A free dessert"),
    lesson("早餐服務", "Breakfast is served from six thirty to ten in the hotel restaurant. Guests can also order room service for an extra charge.", "飯店早餐 6:30 到 10:00 供應，也可加價客房服務。", "Breakfast is served from six thirty to ten.", "Where is breakfast served?", ["In the hotel restaurant", "At the airport", "In a meeting room", "Near the museum"], "In the hotel restaurant")
  ]),
  week("健康與預約", "Health and appointments", [
    lesson("牙醫提醒", "This is a reminder of your dental appointment tomorrow at two p.m. Please arrive ten minutes early to complete a short form.", "提醒明天下午兩點牙醫預約，請提早十分鐘填表。", "Please arrive ten minutes early.", "What should the patient do?", ["Arrive ten minutes early", "Bring a sales report", "Call the airport", "Use register three"], "Arrive ten minutes early"),
    lesson("健身會員", "Your gym membership will expire at the end of this month. To renew it, please visit the front desk or pay online.", "健身房會員月底到期，可到櫃台或線上續約。", "Your gym membership will expire at the end of this month.", "What is expiring?", ["A gym membership", "A passport", "A camera warranty", "A bus ticket"], "A gym membership"),
    lesson("藥局取藥", "Your prescription is ready for pickup. The pharmacy is open until eight p.m., but the pharmacist takes a break from one to two.", "處方藥可領，藥局開到八點，藥師一點到兩點休息。", "Your prescription is ready for pickup.", "When is the pharmacist on break?", ["From one to two", "After eight", "At nine thirty", "On Friday"], "From one to two"),
    lesson("健康檢查", "Please do not eat for eight hours before your health checkup. You may drink water, but avoid coffee and juice.", "健檢前八小時不要進食，可喝水但避免咖啡果汁。", "Please do not eat for eight hours before your health checkup.", "What can the listener drink?", ["Water", "Coffee", "Juice", "Milk tea"], "Water"),
    lesson("診所改址", "The clinic has moved to the third floor of the same building. Please use the elevator near the pharmacy entrance.", "診所搬到同棟三樓，請用藥局入口附近電梯。", "The clinic has moved to the third floor.", "Where is the clinic now?", ["On the third floor", "Across the street", "At the airport", "Near Gate 12"], "On the third floor"),
    lesson("課程取消", "Tonight's yoga class has been canceled because the instructor is ill. Members may join tomorrow morning's class instead.", "今晚瑜伽課因老師生病取消，會員可改上明早課。", "Tonight's yoga class has been canceled.", "Why was the class canceled?", ["The instructor is ill", "The room is full", "The class is free", "The weather is sunny"], "The instructor is ill"),
    lesson("檢查報告", "Your test results are available online. If you have questions, please schedule a phone appointment with Dr. Wang.", "檢查結果可線上查，若有問題請預約王醫師電話諮詢。", "Your test results are available online.", "What should the listener schedule?", ["A phone appointment", "A city tour", "A product delivery", "A team lunch"], "A phone appointment")
  ]),
  week("財務與銀行", "Finance and banking", [
    lesson("帳單提醒", "Your electricity bill is due on June thirtieth. You can pay online or at any convenience store before the due date.", "電費 6 月 30 日到期，可線上或便利商店繳費。", "Your electricity bill is due on June thirtieth.", "What is due?", ["An electricity bill", "A travel form", "A tour payment", "A medical report"], "An electricity bill"),
    lesson("銀行營業", "The bank branch on Pine Street will close at noon on Friday for system maintenance. Online banking will remain available.", "Pine Street 分行週五中午因系統維護關閉，網銀仍可用。", "Online banking will remain available.", "Why will the branch close early?", ["System maintenance", "Staff training", "A road race", "A holiday concert"], "System maintenance"),
    lesson("信用卡通知", "We noticed unusual activity on your credit card. Please call the number on the back of your card to confirm the purchase.", "信用卡有異常活動，請撥卡片背面電話確認交易。", "Please call the number on the back of your card.", "What should the listener confirm?", ["A purchase", "A meeting room", "A restaurant order", "A train seat"], "A purchase"),
    lesson("發票寄送", "The invoice for your order was emailed this morning. Please contact accounting if you need a printed copy.", "訂單發票今早已寄出電子檔，若需紙本請聯絡會計。", "The invoice for your order was emailed this morning.", "Who should be contacted for a printed copy?", ["Accounting", "The driver", "The tour guide", "The pharmacist"], "Accounting"),
    lesson("貸款文件", "Your loan application is missing one document. Please upload a copy of your income statement by the end of the week.", "貸款申請缺一份文件，請週末前上傳收入證明。", "Please upload a copy of your income statement.", "What document is missing?", ["An income statement", "A warranty card", "A restaurant menu", "A boarding pass"], "An income statement"),
    lesson("退款入帳", "Your refund has been processed and should appear in your account within three business days.", "退款已處理，三個工作天內入帳。", "Your refund has been processed.", "When should the refund appear?", ["Within three business days", "In fifteen minutes", "Next Wednesday only", "After one year"], "Within three business days"),
    lesson("預算會議", "The finance team will discuss next quarter's budget on Tuesday afternoon. Department managers should bring updated expense estimates.", "財務團隊週二下午討論下季預算，部門主管需帶更新費用估算。", "Department managers should bring updated expense estimates.", "What will be discussed?", ["Next quarter's budget", "A city walking tour", "A camera repair", "A yoga schedule"], "Next quarter's budget")
  ]),
  week("人資與職場", "HR and workplace", [
    lesson("面試安排", "Your interview is scheduled for Thursday at ten a.m. Please bring a copy of your resume and check in at the reception desk.", "面試排在週四早上十點，請帶履歷並在接待處報到。", "Your interview is scheduled for Thursday at ten a.m.", "What should the applicant bring?", ["A resume", "A receipt", "A passport photo", "A lunch order"], "A resume"),
    lesson("薪資單", "Pay slips for this month are now available on the employee website. Please contact human resources if you cannot log in.", "本月薪資單可在員工網站查看，無法登入請聯絡人資。", "Pay slips for this month are now available.", "Who should employees contact?", ["Human resources", "A tour guide", "The airport desk", "Customer service"], "Human resources"),
    lesson("公司政策", "The company has updated its remote work policy. Employees may work from home two days a week with manager approval.", "公司更新遠端工作政策，經主管同意每週可居家兩天。", "Employees may work from home two days a week.", "What was updated?", ["The remote work policy", "The lunch menu", "The store warranty", "The bus route"], "The remote work policy"),
    lesson("員工福利", "Open enrollment for health benefits begins next Monday. Information sessions will be held in the training room at noon.", "健康福利開放選擇下週一開始，中午在訓練室有說明會。", "Open enrollment for health benefits begins next Monday.", "Where are the information sessions?", ["In the training room", "At Gate 12", "Outside Exit 3", "In the hotel restaurant"], "In the training room"),
    lesson("安全規定", "For safety reasons, visitors must wear a badge at all times. Please ask reception for a temporary badge when you arrive.", "訪客需全程配戴識別證，抵達時向接待處索取臨時證。", "Visitors must wear a badge at all times.", "Who needs a temporary badge?", ["Visitors", "Bank tellers", "Airline passengers", "Gym members"], "Visitors"),
    lesson("績效面談", "Annual performance reviews will take place during the first week of July. Managers will send appointment times by email.", "年度績效面談在七月第一週，主管會 email 面談時間。", "Managers will send appointment times by email.", "When will reviews take place?", ["The first week of July", "Tomorrow afternoon", "Every Friday", "At the end of this month"], "The first week of July"),
    lesson("辦公搬遷", "Our team will move to the fourth floor next month. Please pack personal items by the last Friday of this month.", "團隊下月搬到四樓，請本月最後一個週五前打包個人物品。", "Our team will move to the fourth floor next month.", "What should employees pack?", ["Personal items", "Kitchen equipment", "Medical forms", "Rental cars"], "Personal items")
  ]),
  week("房屋與維修", "Housing and maintenance", [
    lesson("公寓維修", "Water service will be interrupted tomorrow from ten a.m. to two p.m. while repairs are made in the basement.", "明天 10 點到 2 點地下室維修會停水。", "Water service will be interrupted tomorrow.", "Why will water service stop?", ["Basement repairs", "A fire drill", "A rent increase", "A parking event"], "Basement repairs"),
    lesson("租金通知", "This is a reminder that rent is due on the first day of each month. Late payments may include an extra fee.", "提醒租金每月一日到期，延遲付款可能加收費用。", "Rent is due on the first day of each month.", "What may happen after a late payment?", ["An extra fee", "A free dessert", "A room upgrade", "A new badge"], "An extra fee"),
    lesson("看屋安排", "The apartment viewing is scheduled for Saturday at eleven. Please meet the agent in front of the building entrance.", "看屋安排週六十一點，請在大樓入口前與仲介碰面。", "Please meet the agent in front of the building entrance.", "Who will the listener meet?", ["The agent", "The pharmacist", "The driver", "The designer"], "The agent"),
    lesson("包裹領取", "A package for apartment 8B has been left at the front desk. Please bring identification when you pick it up.", "8B 公寓包裹放在櫃台，領取請帶證件。", "Please bring identification when you pick it up.", "Where is the package?", ["At the front desk", "In the basement", "At the museum", "On the bus"], "At the front desk"),
    lesson("冷氣檢查", "Maintenance workers will inspect air conditioners on Wednesday morning. Please make sure someone is home between nine and twelve.", "維修人員週三早上檢查冷氣，請 9 到 12 點有人在家。", "Maintenance workers will inspect air conditioners.", "When should someone be home?", ["Between nine and twelve", "After six p.m.", "Next Friday", "During lunch only"], "Between nine and twelve"),
    lesson("停車規定", "Resident parking permits must be renewed before July first. Cars without a valid permit may be removed from the garage.", "住戶停車證須 7 月 1 日前更新，無效車證車輛可能被移出車庫。", "Resident parking permits must be renewed before July first.", "What must residents renew?", ["Parking permits", "Gym memberships", "Boarding passes", "Warranty cards"], "Parking permits"),
    lesson("清潔公告", "The building lobby will be cleaned tomorrow morning. Please use the side entrance until the floor is dry.", "大樓大廳明早清潔，地板乾之前請走側門。", "Please use the side entrance until the floor is dry.", "Why should residents use another entrance?", ["The lobby floor will be cleaned", "The elevator is free", "The parking lot is full", "The tour starts early"], "The lobby floor will be cleaned")
  ]),
  week("科技與訂閱", "Technology and subscriptions", [
    lesson("軟體更新", "A software update will be installed tonight at eleven. Please save your work and log out before leaving the office.", "今晚十一點安裝軟體更新，離開前請存檔並登出。", "Please save your work and log out.", "When will the update be installed?", ["Tonight at eleven", "Friday at noon", "Tomorrow morning", "Next Monday"], "Tonight at eleven"),
    lesson("密碼重設", "Your password will expire in three days. To avoid losing access, please reset it through the company portal.", "密碼三天後到期，請透過公司入口網站重設以免無法登入。", "Your password will expire in three days.", "What should the listener reset?", ["A password", "A printer", "A reservation", "A bus route"], "A password"),
    lesson("網路中斷", "Internet service on the fifth floor is currently unavailable. Technicians are checking the router and expect service to return by noon.", "五樓網路目前不可用，技師檢查路由器，預計中午恢復。", "Technicians are checking the router.", "Where is internet service unavailable?", ["On the fifth floor", "In the restaurant", "At Gate 12", "On River Street"], "On the fifth floor"),
    lesson("訂閱續約", "Your magazine subscription will renew automatically next week. If you want to cancel, please update your account settings today.", "雜誌訂閱下週自動續約，若要取消請今天更新帳戶設定。", "Your magazine subscription will renew automatically next week.", "How can the listener cancel?", ["Update account settings", "Visit the airport desk", "Bring a receipt", "Call the tour guide"], "Update account settings"),
    lesson("線上研討會", "The webinar link will be emailed one hour before the session begins. Please test your microphone before joining.", "線上研討會連結會在開始前一小時寄出，加入前請測試麥克風。", "Please test your microphone before joining.", "When will the link be emailed?", ["One hour before the session", "After the meeting", "Next Wednesday", "At midnight"], "One hour before the session"),
    lesson("設備借用", "Employees can borrow laptops from the IT desk for business trips. Please return all equipment within two days after your trip.", "員工出差可向 IT 借筆電，出差後兩天內歸還設備。", "Please return all equipment within two days after your trip.", "Where can employees borrow laptops?", ["The IT desk", "The hotel lobby", "The service counter", "The pharmacy"], "The IT desk"),
    lesson("資料備份", "The shared drive will be backed up every Friday evening. Large files should be uploaded before four p.m.", "共享硬碟每週五晚上備份，大檔案請四點前上傳。", "Large files should be uploaded before four p.m.", "What will be backed up?", ["The shared drive", "The front desk", "The rental car", "The breakfast menu"], "The shared drive")
  ]),
  week("活動與公告", "Events and announcements", [
    lesson("展覽開幕", "The photography exhibition opens this Saturday at the city gallery. Tickets are available online and at the entrance.", "攝影展本週六在市立藝廊開幕，票可線上或入口購買。", "Tickets are available online and at the entrance.", "What event is announced?", ["A photography exhibition", "A road race", "A budget meeting", "A health checkup"], "A photography exhibition"),
    lesson("演講改時", "Tonight's guest lecture will start at seven thirty instead of seven. The location remains the auditorium on the second floor.", "今晚客座演講改為七點半開始，地點仍在二樓禮堂。", "The location remains the auditorium on the second floor.", "What has changed?", ["The start time", "The speaker", "The location", "The topic"], "The start time"),
    lesson("志工招募", "Volunteers are needed for the charity run next month. Please sign up by Friday if you can help with registration or water stations.", "下月公益路跑需要志工，可協助報到或補水站者請週五前報名。", "Volunteers are needed for the charity run next month.", "What can volunteers help with?", ["Registration or water stations", "Software updates", "Dental forms", "Product refunds"], "Registration or water stations"),
    lesson("圖書館活動", "The library will host a free writing workshop on Wednesday evening. Space is limited, so registration is required.", "圖書館週三晚上舉辦免費寫作工作坊，名額有限需報名。", "Registration is required.", "Why is registration required?", ["Space is limited", "Lunch is included", "The library is closed", "The speaker is late"], "Space is limited"),
    lesson("天氣取消", "Due to strong winds, the outdoor movie night has been canceled. Ticket holders will receive a full refund.", "因強風，戶外電影夜取消，持票者全額退款。", "Ticket holders will receive a full refund.", "Why was the event canceled?", ["Strong winds", "Low ticket sales", "A broken projector", "A late speaker"], "Strong winds"),
    lesson("音樂會入場", "Doors for the concert will open at six p.m. Please do not bring outside food or large bags into the hall.", "音樂會六點開門，請勿攜帶外食或大型包包進場。", "Doors for the concert will open at six p.m.", "What should guests avoid bringing?", ["Outside food or large bags", "Printed tickets", "Small cameras", "Water bottles only"], "Outside food or large bags"),
    lesson("社區會議", "The community meeting will discuss park improvements and traffic safety. Residents may ask questions after the presentation.", "社區會議討論公園改善與交通安全，簡報後居民可提問。", "Residents may ask questions after the presentation.", "What topics will be discussed?", ["Park improvements and traffic safety", "Credit card activity", "Hotel breakfast", "Printer repair"], "Park improvements and traffic safety")
  ]),
  week("製造與物流", "Manufacturing and logistics", [
    lesson("倉庫出貨", "All orders placed before noon will ship today. Orders received after noon will be processed tomorrow morning.", "中午前訂單今天出貨，中午後訂單明早處理。", "All orders placed before noon will ship today.", "When will late orders be processed?", ["Tomorrow morning", "Tonight at eleven", "Next month", "Within one hour"], "Tomorrow morning"),
    lesson("庫存盤點", "The warehouse will close early on Thursday for inventory. Please submit urgent shipping requests by Wednesday afternoon.", "倉庫週四因盤點提早關閉，急件請週三下午前提出。", "The warehouse will close early on Thursday for inventory.", "Why will the warehouse close early?", ["Inventory", "A staff party", "A software update", "A road race"], "Inventory"),
    lesson("貨車延誤", "The delivery truck is delayed by traffic and should arrive at the loading dock around two thirty.", "配送貨車因交通延誤，約兩點半到裝卸區。", "The delivery truck is delayed by traffic.", "Where will the truck arrive?", ["The loading dock", "The museum entrance", "The hotel restaurant", "The front desk"], "The loading dock"),
    lesson("品質檢查", "Products from line three need an additional quality check before packing. Please label the boxes after inspection.", "三號線產品包裝前需額外品檢，檢查後貼標。", "Products from line three need an additional quality check.", "What should workers do after inspection?", ["Label the boxes", "Call the bank", "Cancel the tour", "Open the lobby"], "Label the boxes"),
    lesson("安全裝備", "All visitors to the factory must wear safety glasses and closed-toe shoes. Extra glasses are available at the entrance.", "工廠訪客需戴護目鏡並穿包鞋，入口有備用護目鏡。", "All visitors to the factory must wear safety glasses.", "Where are extra glasses available?", ["At the entrance", "On the fourth floor", "At Gate 12", "In the restaurant"], "At the entrance"),
    lesson("供應商會議", "The supplier meeting has been postponed until next Tuesday. Updated price lists will be reviewed during the meeting.", "供應商會議延到下週二，會中檢視更新價格表。", "The supplier meeting has been postponed until next Tuesday.", "What will be reviewed?", ["Updated price lists", "Medical results", "A city map", "A concert ticket"], "Updated price lists"),
    lesson("包裝材料", "We are running low on packing tape and small boxes. Please order more supplies before the end of the day.", "包裝膠帶和小箱子快用完，請今天下班前訂購補給。", "We are running low on packing tape and small boxes.", "What should be ordered?", ["More supplies", "A rental car", "A new password", "A free dessert"], "More supplies")
  ]),
  week("混合實戰", "Mixed TOEIC practice", [
    lesson("電話留言", "Hi, this is Marco from City Catering. The lunch order for tomorrow's workshop has been confirmed, but we need the final delivery address.", "餐飲公司確認明天工作坊午餐訂單，但需要最終送餐地址。", "We need the final delivery address.", "What information is needed?", ["The delivery address", "The speaker's resume", "The warranty period", "The train platform"], "The delivery address"),
    lesson("商店廣播", "Attention shoppers. The store will close in fifteen minutes. Please bring your final purchases to the nearest checkout counter.", "商店十五分鐘後關門，請將最後商品拿到最近收銀台。", "The store will close in fifteen minutes.", "What should shoppers do?", ["Go to checkout", "Renew a permit", "Meet a tour guide", "Upload a file"], "Go to checkout"),
    lesson("課程通知", "The business English class will meet in Room 204 today because the language lab is being repaired.", "商用英文課今天在 204 教室，因語言教室維修。", "The language lab is being repaired.", "Where will the class meet?", ["Room 204", "The language lab", "The auditorium", "The city gallery"], "Room 204"),
    lesson("配送留言", "Your furniture delivery is scheduled between one and three p.m. Please make sure the elevator is available during that time.", "家具配送安排下午一點到三點，請確認電梯可用。", "Please make sure the elevator is available.", "What is being delivered?", ["Furniture", "Medicine", "Concert tickets", "Office badges"], "Furniture"),
    lesson("銀行留言", "This is Lakeside Bank calling about your appointment with a loan officer. Please bring two forms of identification tomorrow.", "銀行來電提醒明天貸款專員預約，請帶兩種身分證明。", "Please bring two forms of identification tomorrow.", "Who is the appointment with?", ["A loan officer", "A dentist", "A tour guide", "A designer"], "A loan officer"),
    lesson("博物館提醒", "Museum members may enter the special exhibit thirty minutes before the general public. Please show your membership card at the side door.", "博物館會員可比一般民眾早三十分鐘入場特展，請在側門出示會員卡。", "Museum members may enter the special exhibit thirty minutes early.", "What should members show?", ["A membership card", "A receipt", "A parking permit", "An income statement"], "A membership card"),
    lesson("維修完成", "The elevator repair has been completed ahead of schedule. Normal service will resume at two p.m. today.", "電梯維修提早完成，今天下午兩點恢復正常服務。", "Normal service will resume at two p.m. today.", "What was repaired?", ["The elevator", "The printer", "The card reader", "The router"], "The elevator")
  ])
];

const state = loadState();
let activeLessonNumber = getActiveLessonNumber();
let weeklyQuestions = [];

const elements = {
  todayScore: document.querySelector("#todayScore"),
  todayBar: document.querySelector("#todayBar"),
  streakDays: document.querySelector("#streakDays"),
  totalDone: document.querySelector("#totalDone"),
  phaseName: document.querySelector("#phaseName"),
  taskList: document.querySelector("#taskList"),
  lessonTitle: document.querySelector("#lessonTitle"),
  lessonMeta: document.querySelector("#lessonMeta"),
  transcriptText: document.querySelector("#transcriptText"),
  translationText: document.querySelector("#translationText"),
  segmentList: document.querySelector("#segmentList"),
  openSource: document.querySelector("#openSource"),
  sourceTitle: document.querySelector("#sourceTitle"),
  sourceUrl: document.querySelector("#sourceUrl"),
  sourceTranscript: document.querySelector("#sourceTranscript"),
  sourceNote: document.querySelector("#sourceNote"),
  sourceStatus: document.querySelector("#sourceStatus"),
  sourceLessonList: document.querySelector("#sourceLessonList"),
  dictationPrompt: document.querySelector("#dictationPrompt"),
  dictationBox: document.querySelector("#dictationBox"),
  dictationFeedback: document.querySelector("#dictationFeedback"),
  quizQuestion: document.querySelector("#quizQuestion"),
  quizOptions: document.querySelector("#quizOptions"),
  quizFeedback: document.querySelector("#quizFeedback"),
  shadowSentence: document.querySelector("#shadowSentence"),
  shadowNote: document.querySelector("#shadowNote"),
  noteFeedback: document.querySelector("#noteFeedback"),
  weeklyStatus: document.querySelector("#weeklyStatus"),
  weeklyQuiz: document.querySelector("#weeklyQuiz"),
  weeklyResult: document.querySelector("#weeklyResult"),
  submitWeeklyTest: document.querySelector("#submitWeeklyTest"),
  mistakeList: document.querySelector("#mistakeList")
};

document.querySelector("#playNormal").addEventListener("click", () => {
  speak(getLesson().audio, 0.95);
  completeTask("listen");
});
document.querySelector("#playSlow").addEventListener("click", () => speak(getLesson().audio, 0.72));
document.querySelector("#playSentence").addEventListener("click", () => speak(getLesson().dictation, 0.78));
document.querySelector("#stopAudio").addEventListener("click", stopAudio);
document.querySelector("#openSource").addEventListener("click", openSourceLesson);
document.querySelector("#saveSourceLesson").addEventListener("click", saveSourceLesson);
document.querySelector("#clearSourceLessons").addEventListener("click", clearSourceLessons);
document.querySelector("#checkDictation").addEventListener("click", checkDictation);
document.querySelector("#showAnswer").addEventListener("click", showDictationAnswer);
document.querySelector("#saveNote").addEventListener("click", saveShadowNote);
document.querySelector("#sampleNote").addEventListener("click", showSampleNote);
document.querySelector("#resetToday").addEventListener("click", resetToday);
document.querySelector("#extraLesson").addEventListener("click", goToExtraLesson);
document.querySelector("#startWeeklyTest").addEventListener("click", startWeeklyTest);
document.querySelector("#submitWeeklyTest").addEventListener("click", submitWeeklyTest);
document.querySelector("#clearMistakes").addEventListener("click", clearMistakes);

render();

function week(name, focus, lessons) {
  return { name, focus, lessons };
}

function lesson(title, audio, translation, dictation, question, options, answer) {
  return { title, audio, translation, dictation, question, options, answer };
}

function render() {
  const lesson = getLesson();
  const pack = getPack();
  const day = getDayState();
  const doneCount = tasks.filter((task) => day.tasks[task.id]).length;
  const score = Math.round((doneCount / tasks.length) * 100);

  elements.todayScore.textContent = `${score}%`;
  elements.todayBar.style.width = `${score}%`;
  elements.streakDays.textContent = calculateStreak();
  elements.totalDone.textContent = Object.keys(state.completedDates).length;
  elements.phaseName.textContent = getPhaseName();

  elements.lessonTitle.textContent = lesson.title;
  elements.lessonMeta.textContent = `第 ${getWeekIndex() + 1} 週 · ${pack.name}`;
  elements.openSource.hidden = !lesson.sourceUrl;
  elements.transcriptText.textContent = lesson.audio;
  elements.translationText.textContent = lesson.translation;
  elements.dictationPrompt.textContent = "請聽「重播關鍵句」後，把英文句子打在下方。";
  elements.dictationBox.value = day.dictation || "";
  elements.quizQuestion.textContent = lesson.question;
  elements.shadowSentence.textContent = lesson.dictation;
  elements.shadowNote.value = day.note || "";

  renderTasks(day);
  renderSourceLessons();
  renderSegments(lesson);
  renderQuiz(lesson, day);
  renderMistakes();
  updateWeeklyStatus();
}

function saveSourceLesson() {
  const title = elements.sourceTitle.value.trim() || `帕克英文匯入教材 ${state.importedLessons.length + 1}`;
  const sourceUrl = elements.sourceUrl.value.trim();
  const transcript = elements.sourceTranscript.value.trim();
  const note = elements.sourceNote.value.trim();

  if (transcript.length < 12) {
    elements.sourceStatus.textContent = "請先貼上逐字稿，或把你聽寫出的英文內容貼進來。";
    return;
  }

  const segments = splitIntoSegments(transcript);
  const dictation = segments.find((segment) => normalize(segment).length >= 18) || transcript;

  state.importedLessons.unshift({
    title,
    sourceUrl,
    audio: transcript,
    translation: note || "這是你匯入的外部教材。先聽原教材，再用分句與聽寫功能回練。",
    dictation,
    question: "這段教材你今天的理解狀態是？",
    options: [
      "我可以說出主題與 3 個關鍵字",
      "我只聽懂部分單字",
      "我需要再慢聽一次",
      "我還沒有開始"
    ],
    answer: "我可以說出主題與 3 個關鍵字",
    importedAt: todayKey
  });

  activeLessonNumber = 0;
  state.days[todayKey] = createEmptyDay();
  elements.sourceTitle.value = "";
  elements.sourceUrl.value = "";
  elements.sourceTranscript.value = "";
  elements.sourceNote.value = "";
  elements.sourceStatus.textContent = "已加入今日教材，現在的聽力練習會使用這份匯入內容。";
  saveState();
  render();
}

function renderSourceLessons() {
  if (!state.importedLessons.length) {
    elements.sourceLessonList.innerHTML = "<p class=\"hint\">貼上帕克英文連結與你可使用的逐字稿後，這裡會出現可切換的外部教材。</p>";
    return;
  }

  elements.sourceLessonList.innerHTML = state.importedLessons.map((lesson, index) => `
    <article class="source-item">
      <div>
        <strong>${lesson.title}</strong>
        <span>${lesson.sourceUrl || "沒有附連結"} · 匯入 ${lesson.importedAt || todayKey}</span>
      </div>
      <button type="button" class="ghost-button" data-source-index="${index}">使用</button>
    </article>
  `).join("");

  elements.sourceLessonList.querySelectorAll("[data-source-index]").forEach((button) => {
    button.addEventListener("click", () => {
      activeLessonNumber = Number(button.dataset.sourceIndex);
      state.days[todayKey] = createEmptyDay();
      saveState();
      render();
    });
  });
}

function clearSourceLessons() {
  if (!state.importedLessons.length) return;
  if (!confirm("確定要清空所有匯入教材嗎？原本內建 12 週課程不會被刪除。")) return;
  state.importedLessons = [];
  activeLessonNumber = state.studyCursor || 0;
  state.days[todayKey] = createEmptyDay();
  saveState();
  render();
}

function openSourceLesson() {
  const sourceUrl = getLesson().sourceUrl;
  if (!sourceUrl) return;
  window.open(sourceUrl, "_blank", "noopener");
}

function renderSegments(lesson) {
  const segments = splitIntoSegments(lesson.audio);
  elements.segmentList.innerHTML = segments.map((segment, index) => `
    <button type="button" data-segment="${index}">
      ${index + 1}. ${segment}
    </button>
  `).join("");

  elements.segmentList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      speak(segments[Number(button.dataset.segment)], 0.74);
      completeTask("listen");
    });
  });
}

function renderTasks(day) {
  elements.taskList.innerHTML = tasks.map((task) => `
    <article class="task">
      <label>
        <input type="checkbox" data-task="${task.id}" ${day.tasks[task.id] ? "checked" : ""}>
        <span>${task.title}</span>
      </label>
      <small>${task.detail}</small>
    </article>
  `).join("");

  elements.taskList.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      day.tasks[input.dataset.task] = input.checked;
      maybeFinishLesson();
      saveState();
      render();
    });
  });
}

function renderQuiz(lesson, day) {
  elements.quizFeedback.textContent = day.quizChoice
    ? day.quizChoice === lesson.answer
      ? "答對了。請再聽一次逐字稿，確認答案線索在哪裡。"
      : `答錯了。正確答案是：${lesson.answer}`
    : "";

  elements.quizOptions.innerHTML = lesson.options.map((option) => {
    const selected = day.quizChoice === option;
    const className = selected
      ? option === lesson.answer ? "is-correct" : "is-wrong"
      : day.quizChoice && option === lesson.answer ? "is-correct" : "";
    return `<button type="button" class="${className}" ${day.quizChoice ? "disabled" : ""}>${option}</button>`;
  }).join("");

  elements.quizOptions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => answerDailyQuiz(button.textContent));
  });
}

function answerDailyQuiz(choice) {
  const day = getDayState();
  const lesson = getLesson();
  day.quizChoice = choice;
  day.tasks.quiz = true;

  if (choice !== lesson.answer) {
    saveMistake({
      source: "每日理解題",
      title: lesson.title,
      question: lesson.question,
      chosen: choice,
      answer: lesson.answer,
      audio: lesson.audio
    });
  }

  maybeFinishLesson();
  saveState();
  render();
}

function checkDictation() {
  const day = getDayState();
  const lesson = getLesson();
  const typed = elements.dictationBox.value.trim();
  const score = similarity(normalize(typed), normalize(lesson.dictation));

  day.dictation = typed;
  day.tasks.dictation = score >= 0.72;

  if (day.tasks.dictation) {
    elements.dictationFeedback.textContent = `聽寫通過，相似度 ${Math.round(score * 100)}%。`;
  } else {
    elements.dictationFeedback.textContent = `還差一點，相似度 ${Math.round(score * 100)}%。請慢速重聽後再試一次。`;
    saveMistake({
      source: "每日聽寫",
      title: lesson.title,
      question: "聽寫關鍵句",
      chosen: typed || "未輸入",
      answer: lesson.dictation,
      audio: lesson.audio
    });
  }

  maybeFinishLesson();
  saveState();
  render();
}

function showDictationAnswer() {
  elements.dictationFeedback.textContent = `答案：${getLesson().dictation}`;
}

function saveShadowNote() {
  const day = getDayState();
  day.note = elements.shadowNote.value.trim();
  day.tasks.shadow = true;
  elements.noteFeedback.textContent = "已保存今天的跟讀紀錄。";
  maybeFinishLesson();
  saveState();
  render();
}

function showSampleNote() {
  elements.shadowNote.value = "我聽到 moved to / bring the 這類連音會卡住。明天先慢速跟讀 3 次，再正常速度影子跟讀。";
}

function completeTask(taskId) {
  const day = getDayState();
  day.tasks[taskId] = true;
  maybeFinishLesson();
  saveState();
  render();
}

function maybeFinishLesson() {
  const day = getDayState();
  const isComplete = tasks.every((task) => day.tasks[task.id]);

  if (isComplete && !day.lessonFinished) {
    day.lessonFinished = true;
    state.completedDates[todayKey] = true;
    state.studyCursor = Math.max(state.studyCursor, activeLessonNumber + 1);
  }
}

function resetToday() {
  if (!confirm("確定要重設今天的聽力進度嗎？")) return;
  state.days[todayKey] = createEmptyDay();
  delete state.completedDates[todayKey];
  saveState();
  render();
}

function goToExtraLesson() {
  activeLessonNumber += 1;
  state.studyCursor = Math.max(state.studyCursor, activeLessonNumber);
  state.days[todayKey] = createEmptyDay();
  saveState();
  render();
}

function startWeeklyTest() {
  weeklyQuestions = buildWeeklyQuestions();
  elements.weeklyResult.textContent = "";
  elements.submitWeeklyTest.hidden = false;
  elements.weeklyQuiz.innerHTML = weeklyQuestions.map((item, index) => `
    <article class="weekly-question">
      <strong>${index + 1}. ${item.title}</strong>
      <button type="button" class="ghost-button" data-play="${index}">播放題目音檔</button>
      <p>${item.question}</p>
      ${item.options.map((option) => `
        <label>
          <input type="radio" name="weekly-${index}" value="${option}">
          <span>${option}</span>
        </label>
      `).join("")}
    </article>
  `).join("");

  elements.weeklyQuiz.querySelectorAll("[data-play]").forEach((button) => {
    button.addEventListener("click", () => speak(weeklyQuestions[Number(button.dataset.play)].audio, 0.9));
  });
}

function submitWeeklyTest() {
  if (!weeklyQuestions.length) return;

  const mistakes = [];
  let correct = 0;

  weeklyQuestions.forEach((item, index) => {
    const selected = document.querySelector(`input[name="weekly-${index}"]:checked`);
    const chosen = selected ? selected.value : "未作答";
    if (chosen === item.answer) {
      correct += 1;
    } else {
      mistakes.push({
        source: "每週聽力測驗",
        title: item.title,
        question: item.question,
        chosen,
        answer: item.answer,
        audio: item.audio
      });
    }
  });

  mistakes.forEach(saveMistake);
  const key = `week-${getWeekIndex() + 1}`;
  state.weeklyTests[key] = {
    date: todayKey,
    correct,
    total: weeklyQuestions.length,
    mistakes: mistakes.length
  };

  elements.weeklyResult.textContent = `本週測驗 ${correct}/${weeklyQuestions.length}。錯題已加入聽錯題本。`;
  elements.submitWeeklyTest.hidden = true;
  saveState();
  renderMistakes();
  updateWeeklyStatus();
}

function buildWeeklyQuestions() {
  const pack = getPack();
  const seed = hashString(`${todayKey}-${pack.name}`);
  return seededShuffle(pack.lessons, seed).slice(0, 7).map((item, index) => {
    const wrongOptions = seededShuffle(
      pack.lessons.filter((lessonItem) => lessonItem.answer !== item.answer).map((lessonItem) => lessonItem.answer),
      seed + index
    ).slice(0, 3);

    return {
      ...item,
      options: seededShuffle([item.answer, ...wrongOptions], seed + index + 99)
    };
  });
}

function updateWeeklyStatus() {
  const key = `week-${getWeekIndex() + 1}`;
  const record = state.weeklyTests[key];
  elements.weeklyStatus.textContent = record
    ? `本週已測驗：${record.correct}/${record.total}，日期 ${record.date}。`
    : `目前週次：第 ${getWeekIndex() + 1} 週，完成 7 天後建議做一次整週聽力測驗。`;
}

function saveMistake(mistake) {
  const existing = state.mistakes.find((item) =>
    item.source === mistake.source && item.title === mistake.title && item.question === mistake.question
  );

  if (existing) {
    existing.count += 1;
    existing.chosen = mistake.chosen;
    existing.answer = mistake.answer;
    existing.updatedAt = todayKey;
  } else {
    state.mistakes.push({
      ...mistake,
      count: 1,
      createdAt: todayKey,
      updatedAt: todayKey
    });
  }
}

function renderMistakes() {
  if (!state.mistakes.length) {
    elements.mistakeList.innerHTML = "<p class=\"hint\">目前沒有聽錯題。答錯的每日題與週測題會保存在這裡。</p>";
    return;
  }

  elements.mistakeList.innerHTML = state.mistakes
    .slice()
    .reverse()
    .map((item) => `
      <article class="wrong-item">
        <strong>${item.title} · ${item.source}</strong>
        <span>題目：${item.question}</span>
        <span>你的答案：${item.chosen}</span>
        <span>正確答案：${item.answer}</span>
        <span>累積 ${item.count} 次 · 最近 ${item.updatedAt}</span>
      </article>
    `).join("");
}

function clearMistakes() {
  if (!confirm("確定要清空聽錯題本嗎？")) return;
  state.mistakes = [];
  saveState();
  renderMistakes();
}

function speak(text, rate) {
  if (!("speechSynthesis" in window)) {
    alert("這個瀏覽器不支援語音朗讀。建議使用 Chrome 或 Edge。");
    return;
  }

  stopAudio();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function splitIntoSegments(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function stopAudio() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function getActiveLessonNumber() {
  const todayState = state.days[todayKey];
  if (todayState && Number.isInteger(todayState.lessonNumber)) {
    return todayState.lessonNumber;
  }
  return state.studyCursor || 0;
}

function getWeekIndex() {
  if (state.importedLessons.length) return 0;
  return Math.floor(activeLessonNumber / 7) % weeklyPacks.length;
}

function getDayIndex() {
  if (state.importedLessons.length) {
    return activeLessonNumber % state.importedLessons.length;
  }
  return activeLessonNumber % 7;
}

function getPack() {
  if (state.importedLessons.length) {
    return {
      name: "帕克英文匯入",
      focus: "External listening source",
      lessons: state.importedLessons
    };
  }
  return weeklyPacks[getWeekIndex()];
}

function getLesson() {
  return getPack().lessons[getDayIndex()];
}

function getDayState() {
  if (!state.days[todayKey]) {
    state.days[todayKey] = createEmptyDay();
  }
  state.days[todayKey].lessonNumber = activeLessonNumber;
  return state.days[todayKey];
}

function createEmptyDay() {
  return {
    lessonNumber: activeLessonNumber || 0,
    tasks: {},
    quizChoice: "",
    dictation: "",
    note: "",
    lessonFinished: false
  };
}

function loadState() {
  let loaded = {};

  try {
    loaded = JSON.parse(localStorage.getItem(stateKey)) || {};
  } catch (error) {
    loaded = {};
  }

  return {
    startDate: loaded.startDate || todayKey,
    days: loaded.days || {},
    completedDates: loaded.completedDates || deriveCompletedDates(loaded.days || {}),
    studyCursor: Number.isInteger(loaded.studyCursor) ? loaded.studyCursor : 0,
    weeklyTests: loaded.weeklyTests || {},
    importedLessons: loaded.importedLessons || [],
    mistakes: loaded.mistakes || []
  };
}

function deriveCompletedDates(days) {
  return Object.entries(days).reduce((dates, [date, day]) => {
    if (day.lessonFinished) {
      dates[date] = true;
    }
    return dates;
  }, {});
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(state));
}

function calculateStreak() {
  let streak = 0;
  const date = parseDateKey(todayKey);

  while (true) {
    const key = formatDateKey(date);
    if (!state.completedDates[key]) break;
    streak += 1;
    date.setDate(date.getDate() - 1);
  }

  return streak;
}

function getPhaseName() {
  if (activeLessonNumber < 28) return "基礎聽辨";
  if (activeLessonNumber < 56) return "情境推論";
  return "實戰穩定";
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a, b) {
  if (!a || !b) return 0;
  const distance = levenshtein(a, b);
  return 1 - distance / Math.max(a.length, b.length);
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, row) => [row]);

  for (let column = 0; column <= a.length; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= b.length; row += 1) {
    for (let column = 1; column <= a.length; column += 1) {
      const cost = a[column - 1] === b[row - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
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
