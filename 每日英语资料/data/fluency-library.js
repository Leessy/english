/* 每组 6 句原创变式：复现已学结构，改变人物、动作和场景，不做随机拼句。 */
(() => {
  const groups = [
    ['verb-blocks', [
      ['You don’t need to bring any food.','你不必带食物。','don’t need to bring 整块表示“不必带”，不是禁止。'],
      ['I need to ask you a question before you leave.','你离开前，我需要问你一个问题。','主干 I need to ask；before 小句交代时间。'],
      ['We have to change the password, but we can keep the account.','我们必须更改密码，但可以保留账户。','have to change 与 can keep 是两组动作。'],
      ['Could you send me the address again?','你能再给我发一下地址吗？','Could you + 原形是礼貌请求，不是在询问过去。'],
      ['I’d like to know whether the room is available.','我想知道这个房间是否可用。','I’d = I would；would like to 是礼貌的“想要”。',{ "i’d":{meaning:'I would 的缩写；这里表示礼貌愿望',expansion:'I would'} }],
      ['You should check the time before you book the ticket.','订票前，你应该核对时间。','should check 表建议；先核对，再预订。']
    ]],
    ['noun-blocks', [
      ['The message from your colleague is important.','你同事发来的消息很重要。','主语中心 message；from your colleague 说明来源。'],
      ['The keys on the table are mine.','桌上的钥匙是我的。','keys 是复数；mine 独立表示“我的”，不再接名词。'],
      ['The name of this folder is hard to remember.','这个文件夹的名称很难记。','主语中心 name；of this folder 限定是哪一个名称。'],
      ['The shop near the station is open until nine.','车站附近的商店开到九点。','near the station 修饰 shop；open 在这里是状态，不是被动。',{open:{meaning:'开着的；营业中的',note:'is open 是系表结构，不是 is opened 的被动。'}}],
      ['A copy of the report is on my desk.','报告的一份副本在我的桌上。','主语中心 copy；is 后说明位置。'],
      ['The instructions for this app seem clear.','这个应用的说明看起来很清楚。','seem 是系动词，连接 instructions 与 clear。']
    ]],
    ['verb-time', [
      ['I sent her a message, but she hasn’t replied yet.','我给她发了消息，但她还没回复。','sent 是过去式；hasn’t replied 表截至现在尚未回复。',{sent:{lemma:'send',meaning:'发送了',form:'past'},her:{meaning:'她（宾格）',note:'send 后表示消息的接收者；不是“她的”。'}}],
      ['We’ve already read the instructions.','我们已经读过说明了。','We’ve = We have；read 在 have 后是过去分词，读 /red/。',{read:{lemma:'read',meaning:'读过',form:'participle'}}],
      ['He forgot the password, so he is trying to reset it.','他忘了密码，所以正在尝试重置它。','forgot 表过去；is trying 表现在正在做。',{forgot:{lemma:'forget',meaning:'忘了',form:'past'},it:{meaning:'它，指密码'}}],
      ['I went to the shop yesterday and bought some bread.','我昨天去商店买了些面包。','went 与 bought 是两个过去动作，共用主语 I。'],
      ['She has kept the same phone for five years.','她用同一部手机已经五年了。','has kept + for five years 表持续到现在，不是“已经用完”。',{kept:{lemma:'keep',meaning:'一直保留／使用',form:'participle'}}],
      ['I’m waiting outside because I left my key at home.','我正在外面等，因为我把钥匙落在家里了。','I’m = I am；left 是 leave 的过去式，不是“左边”。',{left:{lemma:'leave',meaning:'落下了；留在了',form:'past'}}]
    ]],
    ['passive', [
      ['The meeting has been moved to Friday.','会议已改到星期五。','has been moved：完成时＋被动，会议是被调整的对象。'],
      ['These photos were taken last week.','这些照片是上周拍的。','were taken 是过去时被动；take photos = 拍照。',{taken:{lemma:'take',meaning:'拍摄（过去分词）',form:'participle'}}],
      ['Your password can be changed on this page.','你的密码可以在此页面更改。','can be changed 是完整谓语。'],
      ['The order was sent yesterday, but it hasn’t arrived.','货物昨天已发出，但尚未送达。','was sent 与 hasn’t arrived 分属被动过去和主动完成。'],
      ['The files will be backed up tonight.','今晚会备份这些文件。','will be backed up 表将来的被动；back up 是“备份”。'],
      ['The door must be kept closed at night.','夜里必须保持门关闭。','must be kept 是情态被动；closed 补充门应保持的状态。',{kept:{lemma:'keep',meaning:'保持（过去分词）',form:'participle'},closed:{meaning:'关着的状态'}}]
    ]],
    ['conditions', [
      ['If you find my keys, please let me know.','如果你找到我的钥匙，请告诉我。','if 是条件，let me know 是请求。'],
      ['Wait here until your name is called.','在这里等候，直到有人叫你的名字。','until 表等待的终点；is called 是被动。'],
      ['Don’t delete the copy unless you are sure.','除非你确定，否则不要删除副本。','否定主句＋unless：不确定时不要删除。'],
      ['Back up your files before you update the app.','更新应用前，先备份文件。','两个动作的顺序是备份在先、更新在后。'],
      ['Once you have saved the changes, you can close the window.','保存更改后，就可以关闭窗口了。','once 在这里是时间连接词，不是次数“一次”。',{once:{meaning:'一旦；……之后',note:'后接小句，说明可以关闭窗口的时间条件。'}}],
      ['I’ll call you as soon as I get home.','我一到家就给你打电话。','I’ll = I will；as soon as 连接两个动作的先后。']
    ]],
    ['logic', [
      ['I took the bus because it was raining.','因为当时在下雨，我坐了公共汽车。','because 后解释选择公交的原因；took 是 take 的过去式。'],
      ['Although I knew the words, I needed time to understand the sentence.','虽然我认识这些词，但仍需要时间理解句子。','although 表让步；knew 是 know 的过去式。'],
      ['The room was small, but we had enough space.','房间很小，但空间对我们来说够用。','but 提醒你后半句不符合前半句可能带来的预期。'],
      ['I couldn’t find the file, so I asked her for help.','我找不到文件，所以向她求助了。','couldn’t = could not；so 后给出结果。'],
      ['The app works offline, so you can use it without an account.','这个应用支持离线运行，因此你可以不用账户使用它。','works 在这里是运行，不是名词“工作”。'],
      ['Although the instructions are clear, I’d like to see an example.','虽然说明很清楚，但我还是想看一个例子。','I’d like to 是礼貌愿望，不是过去完成时。',{ "i’d":{meaning:'I would；这里表示礼貌愿望',expansion:'I would'} }]
    ]],
    ['content-clause', [
      ['I didn’t know that the shop closed so early.','我之前不知道这家店这么早关门。','外层 I didn’t know；内层 the shop closed so early。'],
      ['She told me the meeting had been cancelled.','她告诉我会议已经取消了。','had been cancelled 表取消早于“告诉”这个过去动作。'],
      ['Can you tell me where the station is?','你能告诉我车站在哪里吗？','嵌入的 where the station is 用陈述语序，不是 where is the station。'],
      ['I’m not sure whether this is the latest version.','我不确定这是不是最新版本。','whether 引出尚未确定的内容；不是断言它不是最新版。'],
      ['We found that the new method saved time.','我们发现这个新方法节省了时间。','found 是 find 的过去式；that 引出发现的事情。'],
      ['Please check whether the address is correct.','请检查地址是否正确。','check 后的内容是一件要核实的事。']
    ]],
    ['relative-clause', [
      ['The person who called you is waiting outside.','给你打电话的人正在外面等。','who called you 限定 person；is waiting 是主句谓语。'],
      ['The jacket I bought yesterday is too small.','我昨天买的夹克太小了。','I bought yesterday 修饰 jacket，省略了关系词。'],
      ['The instructions you gave me were useful.','你给我的说明很有用。','主语中心 instructions 是复数，所以用 were。'],
      ['Is this the file that you were looking for?','这是你刚才在找的文件吗？','that 指 file，是 looking for 的对象。'],
      ['I know someone who can help you set up the app.','我认识一个能帮你设置这个应用的人。','who 从句修饰 someone；help you set up 是“帮你设置”。'],
      ['The email we received this morning explains the changes.','我们今天早上收到的邮件说明了这些更改。','received 属于定语从句，explains 才是主句动词。']
    ]],
    ['infinitive', [
      ['I forgot to bring my umbrella.','我忘记带伞了。','forget to do：忘了去做；不是做过之后忘记。'],
      ['Use the search box to find the answer.','使用搜索框查找答案。','to find 说明使用搜索框的目的。'],
      ['She showed me how to share the folder.','她向我演示了如何共享文件夹。','how to share 整体是展示的内容。'],
      ['I don’t know where to put these files.','我不知道该把这些文件放在哪里。','where to put 是“放在哪里”的内容块。'],
      ['We decided to leave early to avoid the rain.','我们决定早点离开，以避开下雨。','第一个 to 补充决定做什么；第二个 to 表目的。'],
      ['This button allows you to choose which file to open.','这个按钮让你选择要打开哪个文件。','allow + 人 + to do；which file to open 是选择的内容。']
    ]],
    ['participles', [
      ['The people sitting near the door are my colleagues.','坐在门附近的人是我的同事。','sitting near the door 修饰 people，不是主句谓语。'],
      ['Messages sent after six may not be read until tomorrow.','六点后发送的消息可能要到明天才会被阅读。','sent 修饰 Messages；may not be read 是完整谓语。',{sent:{lemma:'send',meaning:'被发送的，用来限定消息',form:'participle'},read:{lemma:'read',meaning:'被阅读',form:'participle'}}],
      ['The book written by my teacher is easy to follow.','我老师写的那本书很容易看懂。','written by my teacher 限定 book；is easy 才是主句判断。',{written:{lemma:'write',meaning:'写的（过去分词修饰 book）',form:'participle'}}],
      ['Files downloaded from this page are saved here.','从这个页面下载的文件保存在这里。','downloaded 是名词后的修饰；are saved 是被动谓语。'],
      ['Anyone using this computer must sign in first.','任何使用这台电脑的人都必须先登录。','using 修饰 Anyone；must sign in 表要求。'],
      ['The shoes left by the door are hers.','留在门旁的鞋是她的。','left 是 leave 的过去分词，修饰 shoes；hers 独立表示“她的”。',{left:{lemma:'leave',meaning:'被留下的',form:'participle'}}]
    ]],
    ['whole-action', [
      ['It’s important to keep your password safe.','妥善保管密码很重要。','It’s = It is；真正被评价的内容是 to keep...。',{ "it’s":{meaning:'It is；形式主语，不指具体物品',expansion:'It is'} }],
      ['Reading the same story again helps me remember the words.','再读同一篇故事有助于我记住单词。','Reading... 整体作主语；helps 是主句动词。'],
      ['It takes a few minutes to set up an account.','设置一个账户需要几分钟。','It takes + 时间 + to do：做这件事需要多久。'],
      ['Asking for help is better than guessing the meaning.','寻求帮助比猜测意思更好。','Asking for help 是主语；than 后也用 -ing 内容块。'],
      ['It’s easier to understand a sentence when you know the phrases.','认识其中的短语时，理解句子就更容易。','when 小句说明有利条件。',{ "it’s":{meaning:'It is；形式主语',expansion:'It is'} }],
      ['Keeping a copy makes it easier to fix a mistake.','保留副本会让纠正错误更容易。','Keeping a copy 作主语；makes it easier to do 中 it 是形式宾语。',{it:{meaning:'形式宾语，不具体译成“它”',note:'真正的内容是后面的 to fix a mistake。'}}]
    ]],
    ['combine', [
      ['The message you sent explains why we need to change the plan.','你发来的消息解释了我们为什么需要更改计划。','you sent 限定 message；why... 是 explains 的内容。'],
      ['If the file you downloaded won’t open, try downloading it again.','如果下载的文件打不开，试着重新下载一次。','if 中嵌入定语从句；主句为 try doing。'],
      ['I’ve found the key I lost, so you don’t need to bring yours.','我找到丢失的钥匙了，所以你不必带你的那把。','I’ve = I have；I lost 限定 key；yours 代替 your key。',{yours:{meaning:'你的那把钥匙',note:'yours = your key，此处不再接名词。'}}],
      ['Although I’d read the guide, I asked someone to show me how it worked.','虽然我之前读过指南，但还是请人演示了它是如何运作的。','I’d = I had；read 是过去分词。asked someone to show 是请求某人演示。',{ "i’d":{meaning:'I had；过去完成时，读指南早于请求演示',expansion:'I had'},read:{lemma:'read',meaning:'读过',form:'participle'}}],
      ['The changes we made won’t take effect until the app is restarted.','我们做的更改要等应用重启后才会生效。','we made 限定 changes；won’t...until... 说明生效条件。'],
      ['Please let me know whether you’ve received the file I sent this morning.','请告诉我你是否收到了我今天早上发送的文件。','whether... 是要告知的内容；I sent this morning 限定 file。']
    ]]
  ];
  window.FLUENCY_LIBRARY = groups.flatMap(([group,rows]) => rows.map(([text,translation,note,hints={}],index) => ({id:`${group}-${index+1}`,group,text,translation,note,hints})));
})();
