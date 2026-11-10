/* 原创生活场景；每个语法目标按实际用法标注，不以相同拼写同时充当过去式和过去分词。 */
(() => {
  'use strict';
  const examples=[];
  const t=(lemma,form,surface,reason,occurrence=0)=>({lemma,form,surface,occurrence,reason});
  const e=(scene,text,translation,note,...targets)=>examples.push({id:`vf-life-${String(examples.length+1).padStart(3,'0')}`,text,translation,note,scene,targets});

  // eat / drink：习惯、点餐、一次经历、已经完成，以及正在发生的动作。
  e('life','I usually eat breakfast at home and drink a glass of water before work.','我通常在家吃早饭，上班前喝一杯水。','usually 说明习惯；eat 与 drink 共用主语 I，都是一般现在时的原形。',
    t('eat','base','eat','主语 I 的一般现在时用 eat 原形。'),t('drink','base','drink','与 eat 并列，共用主语 I，用 drink 原形。'));
  e('life','Please eat something before you drink coffee.','请先吃点东西，再喝咖啡。','主句是请求；before 小句说明先后顺序，两个动词都用原形。',
    t('eat','base','eat','祈使句 Please 后用动词原形 eat。'),t('drink','base','drink','时间小句主语是 you，一般现在时用 drink。'));
  e('life','I don’t eat much in the morning, but I do drink some milk.','我早上吃得不多，但确实会喝一些牛奶。','don’t + 原形是否定；第二个 do 强调“确实”，后面仍接原形。',
    t('eat','base','eat','don’t 后接 eat 原形，不用 eats。'),t('drink','base','drink','强调助动词 do 后接 drink 原形。'));
  e('work','She eats lunch at work and drinks water with it.','她在工作地点吃午饭，并配着喝些水。','eats 与 drinks 都由单数主语 she 决定；it 指 lunch。',
    t('eat','third','eats','主语 she 是第三人称单数，用 eats。'),t('drink','third','drinks','与 eats 并列，共用 she，用 drinks。'));
  e('life','He often eats with us, but he never drinks coffee after dinner.','他经常和我们一起吃饭，但晚饭后从不喝咖啡。','often 与 never 说明频率；两个分句都描述习惯，不是一次过去的事。',
    t('eat','third','eats','he 的习惯动作用 eats。'),t('drink','third','drinks','never 不改变动词与主语的一致关系；he 后仍用 drinks。'));
  e('life','The child eats very slowly and drinks only a little milk.','这个孩子吃得很慢，而且只喝一点牛奶。','The child 是单数；a little 修饰不可数名词 milk。',
    t('eat','third','eats','单数主语 the child 配 eats。'),t('drink','third','drinks','第二个并列动作仍以 the child 为主语，用 drinks。'));
  e('life','We ate at the station and drank coffee while we waited for the train.','等火车时，我们在车站吃了饭、喝了咖啡。','ate 与 drank 是过去发生的两个动作；while 说明当时的背景。',
    t('eat','past','ate','ate 直接作过去时谓语，是 eat 的过去式。'),t('drink','past','drank','drank 直接作过去时谓语，不是 drunk。'));
  e('work','I ate some bread and drank water before the meeting.','开会前，我吃了些面包，喝了水。','before the meeting 是过去动作的时间背景；两处过去式共用主语 I。',
    t('eat','past','ate','ate 是主句过去动作，不与 have 连用。'),t('drink','past','drank','drank 与 ate 并列，表示喝了水。'));
  e('life','After we ate dinner, we drank tea and talked about our day.','晚饭后，我们喝了茶，聊了聊这一天的事。','after 引出先完成的吃饭；主句再说喝茶与聊天，均为过去叙事。',
    t('eat','past','ate','after 小句中的 ate 是一般过去时谓语。'),t('drink','past','drank','主句 drank 是 drink 的过去式，说明后来的动作。'));
  e('life','I’ve already eaten, but I haven’t drunk anything yet.','我已经吃过了，但还什么都没喝。','I’ve = I have；have eaten 与 haven’t drunk 对比截至现在的完成情况。',
    t('eat','participle','eaten','I have 后用过去分词 eaten，不用 ate。'),t('drink','participle','drunk','haven’t 后用过去分词 drunk，不用 drank。'));
  e('life','Have you eaten anything or drunk any water today?','你今天吃过东西、喝过水吗？','Have 提到句首构成完成时疑问；eaten 与 drunk 共用助动词 have。',
    t('eat','participle','eaten','Have you... 中 eaten 是完成时过去分词。'),t('drink','participle','drunk','drunk 与 eaten 并列，共用前面的 have。'));
  e('life','We have eaten all the bread and drunk all the milk, so we need to buy more.','我们已经把面包都吃完、牛奶都喝完了，需要再买一些。','have 管后面两个过去分词；so 引出现在需要补买的结果。',
    t('eat','participle','eaten','have eaten 表吃完对现在的影响；eaten 是过去分词。'),t('drink','participle','drunk','have 也作用于并列的 drunk，表示已经喝完。'));
  e('life','I’m eating lunch while my friend is drinking tea.','我正在吃午饭，朋友正在喝茶。','am eating 与 is drinking 都说明此刻的动作；while 表同时发生。',
    t('eat','ing','eating','am + eating 构成现在进行时。'),t('drink','ing','drinking','is + drinking 构成现在进行时。'));
  e('work','We were eating when you called, and she was still drinking her coffee.','你打电话时，我们正在吃饭，她也还在喝咖啡。','were eating 与 was drinking 描述电话打来时正在进行的动作。',
    t('eat','ing','eating','were + eating 构成过去进行时。'),t('drink','ing','drinking','was + drinking 构成过去进行时。'));
  e('life','Eating breakfast together and drinking tea afterward are part of our weekend.','一起吃早饭、之后喝茶，是我们周末生活的一部分。','Eating... 与 drinking... 是两个并列的活动名称，整体作主语；-ing 不一定表示正在发生。',
    t('eat','ing','Eating','Eating breakfast together 是动名词短语，作并列主语的一部分。'),t('drink','ing','drinking','drinking tea afterward 也是动名词短语，不是进行时谓语。'));

  // sleep：作息与休息，不把 slept 的两种语法作用混算。
  e('life','I can sleep on the train if the journey is long.','旅程很长的话，我可以在火车上睡觉。','can 后用原形；if 引出条件，说明什么情况下会休息。',
    t('sleep','base','sleep','情态动词 can 后接原形 sleep。'));
  e('life','I don’t sleep well when the room is too warm.','房间太暖和时，我会睡不好。','don’t 后接原形；when 小句说明影响睡眠的情况。',
    t('sleep','base','sleep','否定助动词 don’t 后用 sleep 原形。'));
  e('life','Do you sleep well when you travel?','你旅行时睡得好吗？','Do you 构成一般现在时疑问；sleep 保持原形。',
    t('sleep','base','sleep','助动词 do 后用 sleep 原形。'));
  e('life','The baby sleeps in our room at night.','宝宝晚上睡在我们的房间里。','The baby 是单数；at night 描述平时的夜间安排。',
    t('sleep','third','sleeps','第三人称单数主语 the baby 配 sleeps。'));
  e('life','My brother usually sleeps late on Sundays.','我哥哥通常星期天睡到很晚。','sleep late 在这里是晚起，不是很晚才上床；usually 表习惯。',
    t('sleep','third','sleeps','单数主语 my brother 的习惯用 sleeps。'));
  e('life','He sleeps on the train when the trip is long.','行程长的时候，他会在火车上睡觉。','主句 sleeps 表习惯；when 小句说明常出现这一行为的情况。',
    t('sleep','third','sleeps','主语 he 的一般现在时用 sleeps。'));
  e('life','I slept badly last night, so I feel tired today.','我昨晚没睡好，所以今天觉得累。','last night 对应 slept 过去式；today 的 feel 说明现在的感受。',
    t('sleep','past','slept','slept 直接作昨晚发生的动作的谓语，是过去式。'));
  e('life','We slept at a small hotel near the station.','我们在车站附近的一家小旅馆住了一晚。','slept 叙述过去住宿的经历；near the station 限定 hotel 的位置。',
    t('sleep','past','slept','没有 have 等助动词；slept 本身是一般过去时谓语。'));
  e('work','She slept for an hour after lunch and then went back to work.','她午饭后睡了一个小时，然后回去工作了。','slept 与 went 是过去先后发生的动作；for an hour 表持续时间。',
    t('sleep','past','slept','slept 与 went 并列，是过去式，不是完成时过去分词。'));
  e('life','I haven’t slept well this week.','我这周一直没睡好。','haven’t slept 说明截至现在这一周的睡眠情况，不只指某个已经结束的晚上。',
    t('sleep','participle','slept','haven’t 后的 slept 是过去分词，构成现在完成时。'));
  e('life','Have you slept on a train before?','你以前在火车上睡过觉吗？','Have you...before? 询问截至现在是否有过这种经历。',
    t('sleep','participle','slept','Have you 后的 slept 是过去分词；句首 have 是完成时助动词。'));
  e('life','The baby has slept for two hours, and the house is quiet.','宝宝已经睡了两个小时，屋里很安静。','has slept 描述截至现在的睡眠时长；has 与单数主语 the baby 对应。',
    t('sleep','participle','slept','has + slept 是现在完成时，slept 在这里不是独立过去式。'));
  e('life','The baby is sleeping, so please speak quietly.','宝宝正在睡觉，请小声说话。','is sleeping 表正在进行；so 后提出与当前情况相关的请求。',
    t('sleep','ing','sleeping','is + sleeping 构成现在进行时。'));
  e('life','I was sleeping when you called; sorry I missed it.','你打电话时我正在睡觉，抱歉没接到。','was sleeping 是当时正在进行的动作；it 指那通电话。',
    t('sleep','ing','sleeping','was + sleeping 构成过去进行时，called 是期间发生的动作。'));
  e('work','Sleeping well helps me work better the next day.','睡得好能让我第二天工作得更好。','Sleeping well 整体作主语；helps 才是主句谓语，不是“正在睡”。',
    t('sleep','ing','Sleeping','Sleeping well 是动名词短语，表示睡好觉这件事。'));

  // pay：购物、账单、费用承担与款项是否已经完成。
  e('life','Can I pay by card, or do you only take cash?','我可以刷卡吗，还是你们只收现金？','Can I 表请求；pay by card 表刷卡支付，take cash 在这里是收现金。',
    t('pay','base','pay','情态动词 can 后接 pay 原形。'));
  e('life','We need to pay the bill before we leave.','我们离开之前需要先付账。','need to 后接动作原形；before 小句说明付款与离开的顺序。',
    t('pay','base','pay','need to pay 中，to 后是动词原形。'));
  e('it','You don’t have to pay for this app.','这个应用不需要付费。','don’t have to 表不必，不是禁止；pay for 后接付款购买或使用的东西。',
    t('pay','base','pay','have to 后接原形 pay；否定的是必要性。'));
  e('work','My company pays for the train tickets when I travel for work.','我因工作出差时，公司会支付火车票费用。','pays for 表承担费用；my company 在这里按单数处理。',
    t('pay','third','pays','单数主语 my company 配第三人称单数 pays。'));
  e('life','He pays the rent at the start of every month.','他每个月月初付房租。','every month 说明固定习惯；pay the rent 是付房租。',
    t('pay','third','pays','主语 he 的一般现在时用 pays。'));
  e('work','She always pays on time, so I never have to ask her twice.','她总是按时付款，所以我从不需要催她第二次。','always 与 never 对照频率；on time 表按照约定准时。',
    t('pay','third','pays','always 表频率，单数 she 后的动词仍是 pays。'));
  e('life','I paid for lunch yesterday; can you pay today?','昨天午饭是我付的钱，今天你来付好吗？','paid 对应昨天；can you pay 是今天的请求，pay 不用过去式。',
    t('pay','past','paid','yesterday 对应一般过去时 paid。'));
  e('life','We paid the bill online and kept the receipt.','我们在网上付了账，并保留了收据。','paid 与 kept 是两个已经发生的动作；不是 have paid 的完成时。',
    t('pay','past','paid','paid 与 kept 并列，直接作一般过去时谓语。'));
  e('life','She paid for a ticket, but the bus never came.','她买了票，但公交车一直没来。','paid 与 came 都叙述过去；but 表付款后预期的车没有到。',
    t('pay','past','paid','paid 直接说明过去买票付款的动作。'));
  e('life','I’ve already paid for the room, but I haven’t received the address.','房费我已经付了，但还没收到地址。','I’ve = I have；already 与 haven’t 对比已完成和未完成的事项。',
    t('pay','participle','paid','I have 后的 paid 是过去分词，构成现在完成时。'));
  e('work','Have they paid you for last week’s work?','他们付给你上周的工作报酬了吗？','Have they paid 询问款项到现在是否已经支付；last week’s 修饰 work，不是本句付款时间。',
    t('pay','participle','paid','句首 have 与 paid 构成完成时疑问；paid 是过去分词。'));
  e('life','The bill has been paid, so you don’t need to pay it again.','账已经付过了，你不必再付一次。','has been paid 是完成时被动；账单是被支付的对象。',
    t('pay','participle','paid','has been + paid 构成完成时被动，paid 是过去分词。'));
  e('life','I’m paying for the food; could you get us a table?','我正在买单，你能给我们找张桌子吗？','am paying 是当前动作；Could you... 表委婉请求，不一定表示过去。',
    t('pay','ing','paying','am + paying 构成现在进行时。'));
  e('life','He was paying at the shop when I called.','我打电话时，他正在商店付款。','was paying 表电话打来时正在做的事；when 引出期间发生的动作。',
    t('pay','ing','paying','was + paying 构成过去进行时。'));
  e('life','Paying by card is easier than carrying cash.','刷卡比带现金更方便。','Paying by card 整体作主语；is 是谓语，than 后也是一个 -ing 活动。',
    t('pay','ing','Paying','Paying by card 是动名词短语，不表示正在付款。'));

  // speak / listen：请求、会议、听留言、曾经沟通过，以及说话和倾听的过程。
  e('life','Please speak slowly so I can listen and understand.','请说慢一点，好让我听明白。','speak 是祈使句原形；can 后的 listen 与 understand 并列，so 引出目的。',
    t('speak','base','speak','Please 后接 speak 原形，表示请求。'),t('listen','base','listen','情态动词 can 后接 listen 原形。'));
  e('life','I want to speak to someone who will listen to my problem.','我想找一个愿意听我说困难的人聊聊。','want to speak 表想做的事；who... 限定 someone；listen to 必须带 to 才能接对象。',
    t('speak','base','speak','want to 后接原形 speak。'),t('listen','base','listen','will 后接原形 listen；表示愿意倾听。'));
  e('work','We need to listen first and speak after the other person has finished.','我们需要先听，等对方说完再开口。','need to 管并列的 listen 和 speak；after 说明说话前应满足的时间条件。',
    t('speak','base','speak','speak 与 listen 并列，共用 need to，保持原形。'),t('listen','base','listen','need to 后用 listen 原形。'));
  e('work','When she speaks, everyone listens because she explains things clearly.','她说话时，大家都会听，因为她解释得很清楚。','she 与 everyone 都按单数处理；because 解释大家愿意听的原因。',
    t('speak','third','speaks','when 小句主语 she 配 speaks。'),t('listen','third','listens','everyone 表每个人，按单数使用 listens。'));
  e('work','He speaks English at work and listens to English on the bus.','他工作时说英语，坐公交时听英语。','speaks 与 listens 共用主语 he；listen to English 指听英语内容。',
    t('speak','third','speaks','主语 he 的习惯用 speaks。'),t('listen','third','listens','与 speaks 并列，共用主语 he，用 listens。'));
  e('work','She listens carefully before she speaks to the customer.','她会仔细听完，再和客户说。','before 表先听后说；carefully 是方式，不改变主语和动词的一致关系。',
    t('speak','third','speaks','before 小句的 she 配 speaks。'),t('listen','third','listens','主句 she 的一般现在时用 listens。'));
  e('work','I spoke to the manager, and he listened to my question.','我和经理谈了谈，他听了我的问题。','spoke 是 speak 的不规则过去式；listened 是 listen 的规则过去式。',
    t('speak','past','spoke','spoke 直接作过去时谓语，不是过去分词 spoken。'),t('listen','past','listened','listened 在此独立叙述过去的倾听动作。'));
  e('work','We listened to the message twice before we spoke to the customer.','我们和客户说话前，把留言听了两遍。','listened 与 spoke 都是过去动作；twice 表两次；before 标明先听留言。',
    t('speak','past','spoke','before 小句中的 spoke 是过去式。'),t('listen','past','listened','主句 listened 直接表示过去听了留言。'));
  e('life','After dinner, she spoke about her trip while we listened.','晚饭后，她讲了自己的旅程，我们则在一旁听。','spoke about 表谈某事；while 连接同一时段的说与听。',
    t('speak','past','spoke','spoke 是过去式，叙述饭后的交谈。'),t('listen','past','listened','while 小句中的 listened 也是一般过去时谓语。'));
  e('work','I’ve spoken to the team, and they’ve listened to our idea.','我已经和团队谈过，他们也听过我们的想法了。','I’ve / they’ve 都展开为主语 + have；两个动词都在完成时中。',
    t('speak','participle','spoken','I have 后用 spoken 过去分词。'),t('listen','participle','listened','they have 后用 listened 过去分词，不是独立过去式。'));
  e('life','Have you spoken to her yet, or have you only listened to her message?','你已经和她说过话了，还是只听了她的留言？','两处 have 都是完成时助动词；or 对比真正交谈和仅听留言。',
    t('speak','participle','spoken','Have you spoken 中 spoken 是过去分词。'),t('listen','participle','listened','have you only listened 中 listened 是过去分词，only 不改变结构。'));
  e('work','We have listened to both sides, but we haven’t spoken about a plan yet.','我们听过双方的意见了，但还没有讨论方案。','have listened / haven’t spoken 对比已做与尚未做；both sides 指双方意见。',
    t('speak','participle','spoken','haven’t spoken 是完成时否定，spoken 是过去分词。'),t('listen','participle','listened','have listened 是完成时，listened 是过去分词。'));
  e('life','I’m listening; please keep speaking.','我在听，请继续说。','am listening 是进行时；keep speaking 中 -ing 跟在 keep 后，表示继续做。',
    t('speak','ing','speaking','keep 后接 speaking，表示继续说，不是独立谓语。'),t('listen','ing','listening','am + listening 构成现在进行时。'));
  e('work','She is speaking to a customer, and I’m listening so I can learn.','她正在和客户交谈，我在旁边听着学习。','is speaking 与 am listening 都表示当前进行的动作；so 引出倾听的目的。',
    t('speak','ing','speaking','is + speaking 构成现在进行时。'),t('listen','ing','listening','am + listening 构成现在进行时。'));
  e('life','Listening carefully is often more useful than speaking quickly.','仔细倾听往往比说得快更有用。','Listening carefully 整体作主语；speaking quickly 是 than 后用来比较的活动，二者都不是进行时。',
    t('speak','ing','speaking','speaking quickly 是表示活动的 -ing 短语，用于比较。'),t('listen','ing','Listening','Listening carefully 是动名词短语，整体作主语。'));

  const words={
    glass:{word:'glass',pos:'n.',meaning:'玻璃杯；玻璃；a glass of water 一杯水'},
    tea:{word:'tea',pos:'n.',meaning:'茶；茶水'},
    afterward:{word:'afterward',pos:'adv.',meaning:'之后；随后（也可写 afterwards）'},
    baby:{word:'baby',pos:'n.',meaning:'婴儿；宝宝'},
    brother:{word:'brother',pos:'n.',meaning:'兄弟；哥哥或弟弟'},
    badly:{word:'badly',pos:'adv.',meaning:'不好地；差地；sleep badly 睡得不好'},
    hotel:{word:'hotel',pos:'n.',meaning:'旅馆；酒店'},
    house:{word:'house',pos:'n.',meaning:'房屋；家中的住所'},
    quietly:{word:'quietly',pos:'adv.',meaning:'安静地；轻声地'},
    card:{word:'card',pos:'n.',meaning:'卡；pay by card 用银行卡付款'},
    cash:{word:'cash',pos:'n.',meaning:'现金'},
    bill:{word:'bill',pos:'n.',meaning:'账单'},
    company:{word:'company',pos:'n.',meaning:'公司；陪伴（依语境）'},
    rent:{word:'rent',pos:'n.',meaning:'租金；房租'},
    clearly:{word:'clearly',pos:'adv.',meaning:'清楚地；明确地'}
  };
  window.VERB_FORM_PACKS=window.VERB_FORM_PACKS||[];
  window.VERB_FORM_PACKS.push({id:'life',verbs:['eat','drink','sleep','pay','speak','listen'],deferred:{},examples,existing:[],words});
})();
