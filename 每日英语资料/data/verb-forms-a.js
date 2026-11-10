/* 人工语境标注：不把同形的过去式、过去分词重复计数。 */
(() => {
  'use strict';
  const examples=[], existing=[];
  const target=(lemma,form,surface,reason,occurrence=0)=>({lemma,form,surface,occurrence,reason});
  const e=(lemma,form,surface,reason,texts)=>texts.forEach(text=>existing.push({text,targets:[target(lemma,form,surface,reason)]}));
  const n=(lemma,form,surface,text,translation,scene,reason)=>examples.push({id:`vf-a-${String(examples.length+1).padStart(3,'0')}`,text,translation,note:reason,scene,targets:[target(lemma,form,surface,reason)]});

  e('be','base','be','情态动词后使用 be 原形，和后面的分词组成被动谓语。',[
    'Your password can be changed on this page.','The files will be backed up tonight.','The door must be kept closed at night.'
  ]);
  e('be','am','am','am 是与 I 搭配的 be 现在式；本句说明当前状态。',['I am busy, so I will reply later.']);
  n('be','am','am','I am waiting for the bus.','我正在等公交车。','life','am 与 I 搭配，am waiting 一起表示正在等待，不能把 am 单独译成“是”。');
  n('be','am','am','I am checking the address before I send the file.','发送文件前，我正在核对地址。','work','am checking 表当前进行的动作；before 后是下一步发送。');
  e('be','is','is','is 是与单数主语搭配的 be 现在式；要连同后面的状态或动作理解。',[
    'There is a message for you on my phone.','The room looks different, but the address is the same.','The app is working now, and we are ready to use it.'
  ]);
  e('be','are','are','are 是与复数主语或 you 搭配的 be 现在式。',[
    'These are our notes; those are theirs.','The keys on the table are mine.','Don’t delete the copy unless you are sure.'
  ]);
  e('be','was','was','was 是 be 的过去式；本句描述过去的状态，不是过去分词 been。',[
    'I was ready to leave when I noticed that my key was missing.','The key was there, under an old receipt.','I bought a jacket online, but it was too small.'
  ]);
  e('be','were','were','were 是 be 的过去式，配这些句子中的复数对象；were taken 中还帮助构成过去时被动。',[
    'There were two copies, but I only have one now.','These photos were taken last week.','The instructions you gave me were useful.'
  ]);
  e('be','participle','been','been 是 be 的过去分词；have/has/had been + 过去分词把完成与被动连起来。',[
    'The meeting has been moved to Friday.','She told me the meeting had been cancelled.','The file we need for the meeting has already been shared.'
  ]);
  n('be','ing','being','The room is being cleaned, so please wait outside.','房间正在打扫，请在外面等候。','life','is being cleaned 表正在被打扫；being 是 be 的 -ing 形式，不是“已经完成”。');
  n('be','ing','being','Your request is being checked by our team.','你的请求正在由我们团队核查。','work','is being checked 是进行时被动；请求是被核查的对象。');
  n('be','ing','being','The file is being uploaded; please keep this window open.','文件正在上传，请保持这个窗口开着。','it','is being uploaded 表上传还在进行；being 后接过去分词 uploaded。');

  e('have','base','have','have 是非三单现在式或助动词后的原形；这里表示拥有或时间条件。',[
    'There were two copies, but I only have one now.','If you don’t have time, we can do it tomorrow.','I have a few questions, but there is only a little time.'
  ]);
  e('have','third','has','has 是 have 的三单形式；后接名词可表拥有，后接过去分词可帮助构成完成时。',[
    'The app has its own page, and it’s easy to find.','He has written the message, but he hasn’t sent it yet.','She has kept the same phone for five years.'
  ]);
  e('have','past','had','had 在本句是 have 的过去式，后面接名词；不是 have had 中的过去分词。',[
    'The room was small, but we had enough space.','Then I started reading just two pages while I had breakfast.','One had a note that said “Free to keep,” and the other said “Please return.”'
  ]);
  n('have','participle','had','We have had this problem before.','我们以前遇到过这个问题。','it','第一个 have 是完成时助动词，had 是 have 的过去分词；have a problem 表遇到问题。');
  n('have','participle','had','She has had the same phone for years.','她用同一部手机已经好多年了。','life','has had + for years 表拥有持续到现在；had 不是独立的一般过去谓语。');
  n('have','participle','had','I’ve had a busy morning, so I need a short break.','我忙了一上午，需要稍微休息一下。','work','I’ve = I have；had 是过去分词，描述截至现在经历了怎样的上午。');
  e('have','ing','having','having 是 have 的 -ing 形式；这里表示经历困难或进行吃喝活动，不是单纯拥有。',[
    'She finds the right page quickly, but I’m having trouble finding it.','We’re having lunch now; she is having coffee with us.'
  ]);
  n('have','ing','having','We are having a short meeting before lunch.','我们午饭前正在开一个短会。','work','have a meeting 是开会的动作，因此可用 are having 表正在进行。');

  e('do','base','do','do 是原形；可帮助提出一般现在时问题，也可表示具体要做的事。',[
    'Do you know where I can find it?','If you don’t have time, we can do it tomorrow.','If you get an error message, do not delete the original files.'
  ]);
  e('do','third','does','does 是 do 的三单形式；疑问句中它后的实义动词用原形。',[
    'What does this word mean in this sentence?','Does it work without the internet?'
  ]);
  n('do','third','does','He does the last check before we send the report.','我们发报告前，他会做最后检查。','work','does 在这里是实义动词“做”的三单形式；不是疑问助动词。');
  e('do','past','did','did 是 do 的过去式；作为助动词或替代前文动作时都带有过去时间。',[
    'Did you send it to her, or did she send it to you?','I wanted to know them, but I did not know how to start.','He read the first page, tried the steps, and got the same problem as I did.'
  ]);
  e('do','participle','done','have done 中 done 是过去分词；表示截至现在完成的事情。',[
    'I also tell her what I have done and what I have not done yet.'
  ]);
  n('do','participle','done','I have done the first part of the work.','我已经完成工作的第一部分了。','work','have done 是现在完成时；done 不是过去式 did。');
  n('do','participle','done','Have you done this before?','你以前做过这件事吗？','life','Have you done 是完成时疑问，询问过去到现在的经历；done 是过去分词。');
  e('do','ing','doing','are doing / am doing 表正在做；doing 是 -ing 形式。',[
    'What are you doing? I’m doing the last check before we leave.'
  ]);
  n('do','ing','doing','What is the app doing now?','这个应用现在正在做什么？','it','is the app doing 是进行时疑问语序；doing 表正在进行的动作。');
  n('do','ing','doing','We are doing the last check together.','我们正在一起做最后检查。','work','are doing 是现在进行时；主语 we 配 are。');

  e('get','base','get','get 是原形或非三单现在式；结合 get home / get back 这样的词块理解。',[
    'When you get home, please call me.','I’ll call you as soon as I get home.','When did you get back from work?'
  ]);
  e('get','third','gets','gets 是 get 的三单形式，主语是 she 或 he。',[
    'She has gone to the shop, so please wait until she gets back.','He gets the bus every morning, but today he is getting a train.'
  ]);
  n('get','third','gets','She gets a message when the file is ready.','文件准备好时，她会收到一条消息。','it','gets 表收到，是主语 she 对应的三单形式；when 后给出触发条件。');
  e('get','past','got','got 在本句直接表示过去的动作；它前面没有构成完成时的 have/has/had。',[
    'As soon as I got off, I saw the library across the street.','I got home before dinner and saved the new route on my phone.','He read the first page, tried the steps, and got the same problem as I did.'
  ]);
  n('get','participle','gotten','The instructions have gotten clearer since the last update.','自上次更新以来，说明变得更清楚了。','it','have gotten 是完成时；gotten 是常见美式过去分词，此处 get 表变得。');
  n('get','participle','gotten','I’ve gotten better at asking for help.','我更会向别人求助了。','life','I’ve = I have；gotten better 表到现在变得更好，gotten 是美式过去分词。');
  n('get','participle','gotten','We’ve gotten a reply from the customer.','我们已经收到客户的回复了。','work','We’ve = We have；gotten 表已经收到，是过去分词，不是一般过去时 got。');
  e('get','ing','getting','am/is getting 表正在经历的动作或变化；getting 是 -ing 形式。',[
    'I’m getting used to checking the folder before I ask for an update.','He gets the bus every morning, but today he is getting a train.'
  ]);
  n('get','ing','getting','I’m getting ready to leave.','我正在准备离开。','life','get ready 表做准备；am getting ready 是正在准备，不是单纯已经准备好。');

  e('go','base','go','go 是原形或非三单现在式，表示去某处或参与活动。',[
    'I go to work by bus, but I walked there yesterday.','I want to go, but I need to finish this first.','A lot of people work at home, but I go to the office.'
  ]);
  e('go','third','goes','goes 是 go 的三单形式；主语 she/he 的日常行动使用 goes。',[
    'She goes to work early, but today she is going in later.','He goes home at six; he has already gone home today.'
  ]);
  n('go','third','goes','She goes for a walk after lunch.','她午饭后会去散步。','life','goes 是一般现在时三单；go for a walk 整块为去散步。');
  e('go','past','went','went 是 go 的不规则过去式，不是 goed。',[
    'I went to the shop yesterday and bought some bread.','Every morning, people went past our door, but they rarely stopped to talk.','I went to the next room and asked Sam about the book he had taken.'
  ]);
  e('go','participle','gone','has gone 中 gone 是过去分词，通常表示已经去了、此刻尚未回来。',[
    'He goes home at six; he has already gone home today.','She has gone to the shop, so please wait until she gets back.'
  ]);
  n('go','participle','gone','He has gone to the meeting, so I’ll send him a message.','他已经去开会了，我给他发条消息吧。','work','has gone 表已去开会、目前不在这里；gone 是过去分词。');
  e('go','ing','going','is going 是进行形式，本句表示今天已安排的行动。',[
    'She goes to work early, but today she is going in later.'
  ]);
  n('go','ing','going','I’m going home now.','我现在要回家了。','life','am going 表眼下正在进行或即将进行的行动；going 是 -ing 形式。');
  n('go','ing','going','We’re going to the meeting together.','我们正一起去开会。','work','We’re = We are；going to 后接 meeting 这个名词，此处是去某处，不是 be going to do。');

  e('come','base','come','will 后接 come 原形；come back 整块为回来。',[
    'I’ll come back after lunch if you still need me.'
  ]);
  n('come','base','come','Can you come to the office tomorrow?','你明天能来办公室吗？','work','can 后用 come 原形；这是询问能否按计划到场。');
  n('come','base','come','Please come in and take a seat.','请进来坐。','life','祈使句使用 come 原形；come in 表进来，与 take a seat 并列。');
  e('come','third','comes','comes 是 come 的三单形式，表示惯常到来。',[
    'She comes here every week, and she is coming again tomorrow.','He comes with us when he has time; he is coming with us today.'
  ]);
  n('come','third','comes','The next bus comes in ten minutes.','下一班公交十分钟后到。','life','主语 the next bus 是单数；comes 在此按时刻安排表示到达。');
  e('come','past','came','came 是 come 的不规则过去式。',[
    'She came back early and made dinner for us.','I was about to ask them to try again when my colleague Sam came over.'
  ]);
  n('come','past','came','The message came while I was having lunch.','我吃午饭时收到了这条消息。','work','came 表消息到达，是 come 的过去式；while 后说明当时正在做什么。');
  e('come','participle','come','has come / have come 中 come 是过去分词，与原形同形，不是一般现在时。',[
    'She has come back, and we have come to help her.'
  ]);
  n('come','participle','come','Our manager has come back from the meeting.','我们的经理已经开完会回来了。','work','has come back 表已回来、目前在这里；come 是过去分词。');
  n('come','participle','come','I’ve come to ask you about the new schedule.','我来是想问问新的日程安排。','work','I’ve = I have；come 是过去分词，to ask 说明来到这里的目的。');
  e('come','ing','coming','are/is coming 表正在到来或已经安排的到来；coming 是 -ing 形式。',[
    '“My children are coming tomorrow, and I wanted to make them dinner using this book,” he said.','She comes here every week, and she is coming again tomorrow.','He comes with us when he has time; he is coming with us today.'
  ]);

  e('make','base','make','make 在原形位置出现；按 make sure / make friends / make dinner 等搭配理解。',[
    'Before you update this app, make sure your files have been backed up.','For the first time, the building felt like a place where I could make friends.','“My children are coming tomorrow, and I wanted to make them dinner using this book,” he said.'
  ]);
  e('make','third','makes','makes 是 make 的三单形式；注意 -s 标记主语为单数。',[
    'Keeping a copy makes it easier to fix a mistake.','He makes coffee for us, and today he is making breakfast too.','She makes a plan before making any changes.'
  ]);
  e('make','past','made','made 直接说明过去做出的事情；此处不是完成时助动词后的过去分词。',[
    'She came back early and made dinner for us.','The changes we made won’t take effect until the app is restarted.','The changes you made to the settings will take effect when you restart the app.'
  ]);
  n('make','participle','made','I’ve made a copy of the file.','我已经复制了一份文件。','it','I’ve = I have；made 是过去分词，have made 表已经完成的操作。');
  n('make','participle','made','She has made dinner for us.','她已经为我们做好晚饭了。','life','has made 表晚饭已做好；made 在 has 后是过去分词。');
  n('make','participle','made','We have made a mistake in the address.','我们把地址弄错了。','work','have made 表已经出现、现在需要处理的错误；made 是过去分词。');
  e('make','ing','making','making 是 -ing 形式；可在进行时中，也可在介词 before 后作动作内容。',[
    'He makes coffee for us, and today he is making breakfast too.','She makes a plan before making any changes.'
  ]);
  n('make','ing','making','I’m making a list of things we need.','我正在列我们需要的物品清单。','life','am making 是现在进行时；things we need 是我们需要的东西。');

  e('take','base','take','take 是原形或非三单现在式；不同词块分别表示拿、乘坐、查看。',[
    'Then I wrote a short note: “Take a book if you would like one.”','The bus I usually take was late, so I checked the map on my phone.','“Could you take a look and let me know whether the new version works?”'
  ]);
  e('take','third','takes','takes 是 take 的三单形式；这里的 It / A good question 都是单数主语。',[
    'It takes a little time to set up, but you only need to do it once.','It takes a few minutes to set up an account.','A good question takes a little time, but it can save a lot of trouble later.'
  ]);
  e('take','past','took','took 是 take 的不规则过去式；按拿走、乘车、带回等语境理解。',[
    'He took his bag, but he left hers on the bus.','I took the bus because it was raining.','I kept the receipt and took the jacket back to the shop.'
  ]);
  e('take','participle','taken','taken 是过去分词；它与 have 或 be 配合，不独立充当一般过去时谓语。',[
    'We’ve taken a break, and we can start again now.','These photos were taken last week.','The notes I’ve taken are mine, but the book is still hers.'
  ]);
  e('take','ing','taking','taking 是 -ing 形式；可表示正在进行，也可把整个动作变为句子的主语。',[
    'Taking time to understand the problem did not slow us down; it helped us fix the right thing.','She is taking notes, and he is taking a look at the page.'
  ]);
  n('take','ing','taking','We’re taking a short break before the meeting.','开会前我们正在稍作休息。','work','We’re = We are；taking a break 是正在休息。');

  e('give','base','give','give 处于原形或非三单现在式位置；不能因为句中另有过去动作，就把它也改成 gave。',[
    '“You can give yours away, but please ask me before you give away mine.”','He thought the books were gifts, so he did not plan to give this one back.','It is easier to find a file when you give it a clear name.'
  ]);
  e('give','third','gives','gives 是 give 的三单形式；后面说明给谁什么。',[
    'She gives me an example when I ask a question.','He gives us time to think before telling us the answer.'
  ]);
  n('give','third','gives','The guide gives an example after each step.','这份指南在每一步后都会给出例子。','it','单数主语 the guide 配 gives；give an example 表举例。');
  e('give','past','gave','gave 是 give 的不规则过去式；用来说明过去给出的东西。',[
    'She gave me her number, and I gave her mine.','The instructions you gave me were useful.','She found a larger one and gave it to me.'
  ]);
  e('give','participle','given','had given 中 given 是过去分词，表示比叙述中的过去时间更早给出。',[
    'My friend had given me a spare key last week.','I said that I thought she had given it to me for the box.'
  ]);
  n('give','participle','given','I’ve given you the link, so you can check the page.','我已经把链接给你了，你可以查看页面了。','work','I’ve = I have；given 是过去分词，强调链接现在已提供。');
  e('give','ing','giving','giving 是 -ing 形式；本句用它表达给予这一动作或正在提供。',[
    'My sister understood sharing as lending, and I understood it as giving.','The page was giving an answer, but it was not giving that answer where people could see it.'
  ]);
  n('give','ing','giving','She is giving us time to read the report.','她正在给我们时间阅读报告。','work','is giving 表眼下正在给予时间；giving 是 -ing 形式。');

  e('find','base','find','find 是原形或非三单现在式；表示找到或发现，不等于 look for（寻找）。',[
    'Do you know where I can find it?','If you find my keys, please let me know.','Use the search box to find the answer.'
  ]);
  e('find','third','finds','finds 是 find 的三单形式；可表示找到，也可表示认为某事怎样。',[
    'She finds the right page quickly, but I’m having trouble finding it.','He finds it easier to ask for help than to keep guessing.'
  ]);
  n('find','third','finds','She finds the instructions useful.','她觉得这些说明很有用。','it','find + 对象 + 形容词表觉得对象怎样；finds 是三单。');
  e('find','past','found','found 在本句直接表示过去发现的事，是 find 的过去式。',[
    'Later, I found the first key in my jacket.','First, I found the main actions: check the file and reply.','We found that the new method saved time.'
  ]);
  e('find','participle','found','found 在 have/had 后是 find 的过去分词；这里不是独立的一般过去谓语。',[
    'I’ve found the key I lost, so you don’t need to bring yours.','He thought “done” meant that he had found and fixed the mistakes in the writing.','I asked Ben for ten minutes and showed him what I had found on my phone.'
  ]);
  e('find','ing','finding','finding 是 -ing 形式；在 have trouble doing 或动作作主语的结构中出现。',[
    'She finds the right page quickly, but I’m having trouble finding it.','Finding a file is easy when you know its name.'
  ]);
  n('find','ing','finding','Finding the right words takes time.','找到合适的表达需要时间。','work','Finding the right words 整体作主语；takes 才是主句谓语，不是 is finding 进行时。');

  e('know','base','know','know 是原形或非三单现在式；通常表示知道或认识的状态。',[
    'Do you know where I can find it?','I thought it was broken, but now I know how to use it.','I know someone who can help you set up the app.'
  ]);
  e('know','third','knows','knows 是 know 的三单形式；这里描述认识或知道的状态。',[
    'She doesn’t have all the details, but she knows something about it.','She knows this place well, and I have known her for years.','He knows my sister; they have known each other since school.'
  ]);
  e('know','past','knew','knew 是 know 的不规则过去式；指叙述中的过去认识或知道。',[
    'Although I knew the words, I needed time to understand the sentence.','I knew most of the words, but the whole message took me a little time to understand.','When my older sister and I moved into our new home, we knew nobody in the building.'
  ]);
  e('know','participle','known','have known + for/since 表认识持续到现在；known 是过去分词。',[
    'She knows this place well, and I have known her for years.','He knows my sister; they have known each other since school.'
  ]);
  n('know','participle','known','We’ve known about this error since Monday.','我们从周一就知道这个错误了。','it','We’ve = We have；known 是过去分词，since Monday 说明知道这一情况持续至今。');

  e('think','base','think','think 是原形或非三单现在式；think about 表考虑，think + 小句表认为。',[
    'Please think about it and tell me tomorrow.','We have to think about the people who will use this page.','I think this method can help you.'
  ]);
  e('think','third','thinks','thinks 是 think 的三单形式；后面说明主语持有的看法。',[
    'She thinks the plan will work, but I’m still thinking about it.','He thinks we need more time before sending the file.'
  ]);
  n('think','third','thinks','She thinks we should ask the customer first.','她认为我们应该先问客户。','work','thinks 是三单；we should ask... 是她持有的看法。');
  e('think','past','thought','thought 在本句直接表达过去的想法，是 think 的过去式。',[
    'I thought it was broken, but now I know how to use it.','I said that I thought she had given it to me for the box.','I thought that meant we were ready, so I offered to send the file.'
  ]);
  n('think','participle','thought','I’ve thought about your idea, and I think it could work.','我考虑过你的想法，觉得它可能可行。','work','I’ve thought 中 thought 是过去分词；后面的 I think 是现在的判断。');
  n('think','participle','thought','Have you thought about taking the bus?','你考虑过坐公交吗？','life','Have you thought 是完成时疑问；about 后用 taking 表考虑的做法。');
  n('think','participle','thought','Have you thought about what to do if the app stops working?','你考虑过应用停止运行时该怎么办吗？','it','thought 在 Have 后是过去分词；what to do 是要考虑的内容，if 给出条件。');
  e('think','ing','thinking','thinking 是 -ing 形式；keep thinking 表一直考虑，am thinking 表正在考虑。',[
    'I took the book home, but I kept thinking about his face at the door.','She thinks the plan will work, but I’m still thinking about it.'
  ]);
  n('think','ing','thinking','I’m thinking about where to put the desk.','我正在考虑把桌子放在哪里。','life','am thinking about 表正在考虑的动作；与 I think（我认为）的状态义区别。');

  e('say','base','say','say 在 can 或 did not 后用原形；后面是要说出的内容。',[
    'Can you say that again, please?','It did not say whether people should return the books or keep them.'
  ]);
  n('say','base','say','Please say your name again.','请再说一遍你的名字。','life','祈使句用 say 原形；say your name 是说出名字。');
  e('say','third','says','says 是 say 的三单形式；既可说人的话，也可说文字表达的内容。',[
    'When someone says “You can share this,” I ask what sharing means to them.','The note says we should wait, but she says we can go.'
  ]);
  n('say','third','says','The email says the meeting is at ten.','邮件说会议在十点开始。','work','单数主语 the email 配 says；邮件内容用一般现在时转述。');
  e('say','past','said','said 直接叙述过去说过的话，是 say 的过去式。',[
    'I said I would prefer to exchange it.','My sister gave me two more books and said that I could share those too.','She said the meeting starts at nine.'
  ]);
  e('say','participle','said','had said 中 said 是过去分词，说明说话早于后来转述的时刻。',[
    'When I told my sister what he had said, she asked me to wait.'
  ]);
  n('say','participle','said','She has already said that she can help.','她已经说过她能帮忙。','work','has said 是完成时；said 在 has 后是过去分词。');
  n('say','participle','said','I’ve said this before: please keep a copy.','我以前就说过：请保留一份副本。','it','I’ve = I have；said 是过去分词；冒号后是此前说过的内容。');
  e('say','ing','saying','saying 是 -ing 形式；可补充消息内容，也可在 is saying 中表示正在说。',[
    'The next morning, the customer sent a short reply saying that the page worked well.','I can’t hear what he is saying.'
  ]);
  n('say','ing','saying','I’m saying we need more time, not that we should stop.','我的意思是我们需要更多时间，不是说我们应该停止。','work','am saying 在此澄清当前说的话；saying 是 -ing 形式。');

  e('tell','base','tell','tell 在助动词后或祈使句中用原形；通常直接接听话的人。',[
    'Why didn’t they tell us about the change?','Can you tell me where the station is?','Look at these two pictures and tell me what is different.'
  ]);
  e('tell','third','tells','tells 是 tell 的三单形式；后面说明告诉谁什么。',[
    'She tells me what she needs before I start.','He tells us about his work; today he is telling us about a new project.'
  ]);
  n('tell','third','tells','The page tells you where to save the file.','这个页面告诉你该把文件保存在哪里。','it','单数主语 the page 配 tells；where to save 是告知的内容。');
  e('tell','past','told','told 直接表示过去告诉别人的事情，是 tell 的过去式。',[
    'She told me the meeting had been cancelled.','She told me to look in the small box by the door.','She told me to take the next bus and get off near the library.'
  ]);
  e('tell','participle','told','I’d 在此是 I had；had told 中 told 是过去分词，表示更早已通知。',[
    'I’d already told a colleague that I would be busy on Monday.'
  ]);
  n('tell','participle','told','I’ve told her about the change.','我已经把这个变化告诉她了。','work','I’ve = I have；told 在 have 后是过去分词，强调已告知。');
  n('tell','participle','told','Has anyone told you how to open this file?','有人告诉过你怎么打开这个文件吗？','it','Has anyone told 是完成时疑问；told 是过去分词，how to open 是告知的内容。');
  e('tell','ing','telling','telling 是 -ing 形式；before telling 表告诉之前，is telling 表正在讲述。',[
    'He gives us time to think before telling us the answer.','He tells us about his work; today he is telling us about a new project.'
  ]);
  n('tell','ing','telling','He is telling me how to get to the station.','他正在告诉我怎么去车站。','life','is telling 是进行时；tell me 后接 how to get... 这个内容块。');

  e('see','base','see','see 在情态动词或不定式 to 后用原形；本句表示看到或查看。',[
    'Although the instructions are clear, I’d like to see an example.','Now the files in this folder are ours, and everyone can see the changes.','On a large screen, I could see the message and the button at the same time.'
  ]);
  e('see','third','sees','sees 是 see 的三单形式；主语 the user 是单数。',[
    'The note began with a question: “Have we seen what the user actually sees?”'
  ]);
  n('see','third','sees','She sees the error when she opens the page.','她打开页面时会看到这个错误。','it','sees 是三单，when 后说明看到错误的时机；这里是看见而非正在见面。');
  n('see','third','sees','He sees the station from his window.','他从自己的窗户能看到车站。','life','主语 he 配 sees；from his window 说明观察位置。');
  e('see','past','saw','saw 是 see 的不规则过去式；表示过去看见。',[
    'As soon as I got off, I saw the library across the street.','She looked at the table and saw that the blue box was almost empty.','She saw the message, chose another room, and finished the booking without our help.'
  ]);
  e('see','participle','seen','seen 是 see 的过去分词，出现在 have/had 后，不能换成过去式 saw。',[
    'I’d seen it on her desk, but I hadn’t read it before.','“We have seen our result,” Sam said, “but we have not seen theirs yet.”','The note began with a question: “Have we seen what the user actually sees?”'
  ]);

  e('look','base','look','look 在祈使句或 to 后用原形；配 look at / look in 看具体对象或位置。',[
    'Please look at the example before you try it yourself.','She told me to look in the small box by the door.','Look at these two pictures and tell me what is different.'
  ]);
  e('look','third','looks','looks 是 look 的三单形式，后接形容词时表示看起来怎样。',[
    'The room looks different, but the address is the same.'
  ]);
  n('look','third','looks','She looks at the map before she leaves.','她离开前会看一下地图。','life','looks at 是看的动作；looks 的 -s 与单数主语 she 对应。');
  n('look','third','looks','The page looks different on my phone.','这个页面在我手机上看起来不一样。','it','looks 后接形容词 different，属于描述外观的系动词用法。');
  e('look','past','looked','looked 是过去式；looked for 表寻找，looked at 表查看。',[
    'I looked for it in my bag, but I couldn’t find it.','She looked at the table and saw that the blue box was almost empty.','I looked at our list again and wondered what we had actually finished.'
  ]);
  n('look','participle','looked','I’ve looked for my keys, but I can’t find them.','我已经找过钥匙了，但还是找不到。','life','I’ve looked 中 looked 是过去分词；look for 表寻找过程，find 表找到结果。');
  n('look','participle','looked','Have you looked at the new schedule?','你看过新日程了吗？','work','Have you looked 是完成时疑问；looked 在 have 后是过去分词。');
  n('look','participle','looked','We’ve looked at the error message together.','我们已经一起查看过这条错误提示了。','it','We’ve = We have；looked 是过去分词，表示已进行过检查。');
  e('look','ing','looking','looking 是 -ing 形式；were looking 是进行时，am looking forward to 表期待。',[
    'Is this the file that you were looking for?','I’m looking forward to discussing it with her when I return it.'
  ]);
  n('look','ing','looking','I’m looking for a place to have lunch.','我正在找吃午饭的地方。','life','am looking for 是正在寻找；to have lunch 说明寻找地方的用途。');

  e('use','base','use','use 在原形位置使用；表示使用工具或资源。',[
    'The app is working now, and we are ready to use it.','The app works offline, so you can use it without an account.','Use the search box to find the answer.'
  ]);
  e('use','third','uses','uses 是 use 的三单形式；主语 she/he 后用 uses。',[
    'She uses this app at work, and he uses it at home.'
  ]);
  n('use','third','uses','She uses the guide when she needs help.','她需要帮助时会使用这份指南。','work','uses 是三单，when 后说明何时使用；不是过去式 used。');
  n('use','third','uses','He uses a different password for each account.','他给每个账户使用不同的密码。','it','主语 he 配 uses；a different password for each account 说明各账户分别使用的密码。');
  e('use','past','used','used 在本句是“使用”的过去式，不是 used to do（过去常常）的固定结构。',[
    'Do you mean this one or the one we used before?','Then a colleague who knew nothing about the change used the page with a test account.'
  ]);
  n('use','past','used','We used the map to find the station.','我们用地图找车站。','life','used 是过去式；to find 说明使用地图的目的，不属于 used to do 的过去习惯结构。');
  n('use','participle','used','I’ve used this app before.','我以前用过这个应用。','it','I’ve = I have；used 是过去分词，描述使用经历。');
  n('use','participle','used','Have you used the new meeting room yet?','你用过新会议室了吗？','work','Have you used 是完成时疑问；yet 询问截至现在是否已经使用。');
  n('use','participle','used','This page is used to check your account.','这个页面用于检查你的账户。','it','is used 是被动；to check 表用途。它不是 used to + 原形表示过去习惯。');
  e('use','ing','using','using 是 -ing 形式；可修饰使用者、说明使用方式，也可组成进行时。',[
    'Anyone using this computer must sign in first.','“My children are coming tomorrow, and I wanted to make them dinner using this book,” he said.','The customer replied with a picture and told us they were using a phone.'
  ]);

  e('want','base','want','want 是原形或非三单现在式；want to + 原形表示想做。',[
    'I want to go, but I need to finish this first.','Open Settings and choose the folder you want to back up.','I want to share this file.'
  ]);
  e('want','third','wants','wants 是 want 的三单形式；这里表示当前希望做的事。',[
    'She wants to work on the pictures, but I need to work on the words.','Now, when Ana asks me to check something, I ask what she wants me to check.'
  ]);
  n('want','third','wants','The customer wants a clear answer.','客户想要一个明确的答复。','work','主语 the customer 是单数，使用 wants；后面直接接名词 answer。');
  e('want','past','wanted','wanted 是 want 的过去式；表示叙述中的过去愿望。',[
    'The person who helped me asked whether I wanted my money back.','I wanted to know them, but I did not know how to start.','“Those two books are mine, but I only wanted to lend them,” she said.'
  ]);
  n('want','participle','wanted','I’ve wanted to read this book for a long time.','我很早就想读这本书了。','life','I’ve wanted + for a long time 表这个愿望持续到现在；wanted 是过去分词。');
  n('want','participle','wanted','She has always wanted to work with children.','她一直想从事与孩子有关的工作。','work','has wanted 是完成时；always 说明这个愿望一直存在，wanted 是过去分词。');
  n('want','participle','wanted','We’ve wanted a clearer guide since we started using the app.','从开始使用这个应用起，我们就一直想要一份更清楚的指南。','it','We’ve wanted 表持续至今的需求；since 后说明起点，wanted 是过去分词。');

  window.VERB_FORM_PACKS=window.VERB_FORM_PACKS||[];
  window.VERB_FORM_PACKS.push({
    id:'a',verbs:['be','have','do','get','go','come','make','take','give','find','know','think','say','tell','see','look','use','want'],
    deferred:{
      'know:ing':'knowing 这个词形存在，但“知道／认识”通常是状态，先不机械套用进行时；非谓语用法之后再学。',
      'want:ing':'want 表愿望时通常不用进行时；wanting 的非谓语和特殊语境放到后学。',
      'see:ing':'先熟练看见／明白的常见义；seeing 表见面、看诊等活动时用法不同，之后再分义学习。'
    },examples,existing,
    words:{request:{word:'request',pos:'n.',meaning:'请求；申请',priority:2}}
  });
})();
