/* 原创受控短文，不冒充真实报道。建议先读大意，卡住才点词，随后在另一篇中复现。 */
(() => {
  const s = (text,translation,note,hints={}) => ({text,translation,note,hints});
  window.READER_STORIES = [
    {id:'keys',title:'The key by the door',titleZh:'门旁的钥匙',level:1,topic:'日常',pair:'plans',
      intro:'读完只需说清：钥匙最后在哪里，主人做了什么。',targets:['left','found','told','look for','it'],
      sentences:[
        s('I was ready to leave when I noticed that my key was missing.','我正准备离开时，发现钥匙不见了。','主句 I was ready；when 小句内还有 noticed that... 的内容。'),
        s('I looked for it in my bag, but I couldn’t find it.','我在包里找，但没找到。','look for 是寻找；find 是找到，不能混为一谈。',{it:{meaning:'它，指钥匙'}}),
        s('My friend had given me a spare key last week.','我的朋友上周给过我一把备用钥匙。','had given 表示“给钥匙”早于当前叙事中的找钥匙。',{given:{lemma:'give',meaning:'给过',form:'participle'}}),
        s('I sent her a message and asked where she had put it.','我给她发了消息，问她把它放在哪里了。','where she had put it 是询问的内容，使用陈述语序。',{her:{meaning:'她（宾格），指朋友'},it:{meaning:'它，指备用钥匙'}}),
        s('She told me to look in the small box by the door.','她让我看看门旁的小盒子。','tell somebody to do：告诉某人去做；by the door 修饰 box。'),
        s('The key was there, under an old receipt.','钥匙在那里，在一张旧收据下面。','there 指小盒子里；under 后补充具体位置。'),
        s('I had left it there myself.','原来是我自己把它留在那里的。','left 是 leave 的过去分词；myself 强调是我本人。',{left:{lemma:'leave',meaning:'留下过；放在了',form:'participle'},it:{meaning:'它，指备用钥匙'}}),
        s('Later, I found the first key in my jacket.','后来，我在夹克里找到了原来那把钥匙。','found 是 find 的过去式，表示最后找到了。',{found:{lemma:'find',meaning:'找到了',form:'past'}}),
        s('Now I keep both keys in the same place so that I can find them quickly.','现在我把两把钥匙放在同一个地方，以便快速找到它们。','so that 引出目的；them 指两把钥匙。',{them:{meaning:'它们，指两把钥匙'}})
      ],question:'为什么作者最后改成把两把钥匙放在同一个地方？',answer:'为了以后能快速找到它们；备用钥匙原来是作者自己放进门旁盒子的。'},
    {id:'meeting',title:'A change of plan',titleZh:'计划有变',level:1,topic:'工作',pair:'plans',
      intro:'继续遇见 send、tell、leave 的过去形式，分清旧安排和新安排。',targets:['sent','told','been','FYI','instead of'],
      sentences:[
        s('Our team usually meets on Monday morning.','我们的团队通常在周一上午开会。','meet 在此是开会；usually 说明通常安排。'),
        s('Yesterday, our manager sent a short message: “FYI, the meeting has been moved to Tuesday.”','昨天，经理发来一条短消息：“通知大家，会议已改到周二。”','FYI 是提醒知悉；has been moved 是完成时被动。',{fyi:{meaning:'供大家知悉；这里是在通知安排变化'},been:{lemma:'be',meaning:'与 has 和 moved 一起构成完成时被动',form:'participle'}}),
        s('I’d already told a colleague that I would be busy on Monday.','我之前已告诉一位同事，我周一会很忙。','I’d = I had；already told 表更早已告知。',{ "i’d":{meaning:'I had；表示此前已经',expansion:'I had'},told:{lemma:'tell',meaning:'告诉过',form:'participle'}}),
        s('She asked me whether the new time worked for me.','她问我新时间对我是否合适。','work for somebody 在此不是“为某人工作”，而是“对某人合适”。',{worked:{lemma:'work',meaning:'合适；可行',form:'past'}}),
        s('I checked my schedule before I replied.','回复之前，我查看了日程。','before 表先查日程，再回复。'),
        s('Tuesday was fine, so I changed the note on my calendar.','周二没问题，所以我修改了日历上的备注。','so 引出后续行动。'),
        s('The file we need for the meeting has already been shared.','开会需要的文件已经共享了。','we need for the meeting 限定 file；has been shared 是主句谓语。'),
        s('We can read it in advance instead of reading it during the meeting.','我们可以提前阅读，不必等到开会时再读。','in advance 提前；instead of 后接 reading。',{it:{meaning:'它，指开会所需文件'}})
      ],question:'会议改到什么时候？作者希望大家什么时候读文件？',answer:'周二；提前读，而不是在会议期间才读。'},
    {id:'jacket',title:'The jacket that didn’t fit',titleZh:'尺寸不合适的夹克',level:1,topic:'日常',pair:'outside',
      intro:'用熟悉的购物场景复现 bought、took、kept、gave 和物主代词。',targets:['bought','took','kept','mine','pick up'],
      sentences:[
        s('I bought a jacket online, but it was too small.','我在网上买了件夹克，但尺寸太小。','bought 是 buy 的过去式；it 指夹克。'),
        s('The color was right, and the price was good.','颜色合适，价格也不错。','right 在这里是合适的，不是“右边”。',{right:{meaning:'合适的；符合想要的颜色'}}),
        s('I only needed a larger size.','我只是需要更大一号。','only 限定 needed 的内容，问题在尺寸而不是颜色。'),
        s('I kept the receipt and took the jacket back to the shop.','我保留了收据，把夹克拿回商店。','kept 与 took 是并列过去动作；take...back 表拿回。'),
        s('The person who helped me asked whether I wanted my money back.','接待我的人问我是否想退款。','who helped me 限定 person；whether 后是询问内容。'),
        s('I said I would prefer to exchange it.','我说我更想换货。','said 后省略 that；would prefer to 表示更倾向的选择。'),
        s('She found a larger one and gave it to me.','她找到一件大些的，拿给了我。','one 代替 jacket；it 指那件较大的夹克。',{one:{meaning:'一件夹克，避免重复 jacket'},it:{meaning:'它，指较大的那件夹克'}}),
        s('“Is this bag yours?” she asked as I was leaving.','我离开时，她问：“这个包是你的吗？”','yours 独立表示你的包；as 在这里表示当……时。',{as:{meaning:'当……时'},yours:{meaning:'你的（包）'}}),
        s('It was mine, and I had almost forgotten to pick it up.','那是我的包，我差点忘了拿。','mine 代替 my bag；had forgotten 表更早的忘记。',{mine:{meaning:'我的包'},forgotten:{lemma:'forget',meaning:'忘记',form:'participle'},it:{meaning:'它，指包'}})
      ],question:'作者想退款还是换货？差点遗忘了什么？',answer:'想换大一号；差点忘了拿自己的包。'},
    {id:'bus',title:'A different way home',titleZh:'换条路回家',level:1,topic:'出行',pair:'outside',
      intro:'复现 took、told、got，留意代词所指和时间条件。',targets:['took','got','told','get back','as soon as'],
      sentences:[
        s('The bus I usually take was late, so I checked the map on my phone.','我通常坐的那班公交晚点了，于是我看了手机地图。','I usually take 限定 bus；so 后是采取的行动。'),
        s('There was another route, but I hadn’t tried it before.','还有另一条路线，但我之前没走过。','hadn’t tried 表在这个过去时间之前尚未尝试。',{it:{meaning:'它，指另一条路线'}}),
        s('I asked a woman who was waiting near me for help.','我向旁边等车的一位女士求助。','who was waiting near me 插在 ask somebody for help 的中间。'),
        s('She told me to take the next bus and get off near the library.','她告诉我坐下一班车，在图书馆附近下车。','told me to 后面有 take 和 get off 两个动作。'),
        s('From there, it would be a short walk home.','从那里走回家只需一小段路。','there 指图书馆附近；it 用于描述这段路程。'),
        s('I sent my family a message: “I’ll get back a little later.”','我给家人发了消息：“我会晚一点回来。”','I’ll = I will；get back 在这里是回来。'),
        s('The bus was full, but someone gave me a seat.','车上满员，但有人给我让了座。','gave 是 give 的过去式。'),
        s('As soon as I got off, I saw the library across the street.','一下车，我就看见了街对面的图书馆。','as soon as 连接动作先后；got、saw 都是过去式。'),
        s('I got home before dinner and saved the new route on my phone.','我在晚饭前到家，并把新路线保存在手机上。','got home 表到家；不是“得到一个家”。',{got:{lemma:'get',meaning:'到达',form:'past'}})
      ],question:'别人建议作者在哪里下车？作者回家后保存了什么？',answer:'在图书馆附近下车；保存了新路线。'},
    {id:'backup',title:'Before you update',titleZh:'更新之前',level:2,topic:'文档',pair:'files',
      intro:'一段虚构工具的入门说明。先理解步骤和限制，再复习被动和不规则分词。',targets:['been','made','back up','make sure','in case'],
      sentences:[
        s('Before you update this app, make sure your files have been backed up.','更新这个应用之前，请确保文件已经备份。','before 表顺序；make sure 后是一件要确认的事。'),
        s('A backup is a copy that you can use if the original file is lost.','备份是在原文件丢失时可以使用的副本。','that 从句解释哪种副本；if 给出使用条件。',{lost:{lemma:'lose',meaning:'丢失的；这里描述文件丢失的状态',form:'participle'}}),
        s('You don’t need to copy every file by hand.','你不必手动复制每个文件。','don’t need to 表不必；by hand 是手动。'),
        s('Open Settings and choose the folder you want to back up.','打开设置，选择想备份的文件夹。','Open 与 choose 并列；you want to back up 限定 folder。',{settings:{meaning:'“设置”页面名称，不是动词'}}),
        s('The app will show you where the copy will be saved.','应用会显示副本将保存在哪里。','where... 是 show 的内容；will be saved 是将来时被动。'),
        s('Keep this location in mind in case you need it later.','记住这个位置，以防以后需要。','keep in mind 记住；in case 表以防。',{it:{meaning:'它，指备份的位置'}}),
        s('Once the backup is complete, check that you can open at least one file from it.','备份完成后，检查能否从中打开至少一个文件。','once 是时间条件；check that 后是核查内容。'),
        s('If you get an error message, do not delete the original files.','如果出现错误消息，不要删除原文件。','get 在此可理解为收到／遇到错误提示。',{get:{meaning:'收到；遇到（错误消息）',lemma:'get'}}),
        s('The changes you made to the settings will take effect when you restart the app.','重新启动应用后，你对设置所作的更改会生效。','you made 限定 changes；主句谓语是 will take effect。'),
        s('You can read the FAQ if you’re not sure what to do next.','如果不确定下一步怎么做，可以阅读常见问题。','FAQ = frequently asked questions；what to do 是内容块。')
      ],question:'为什么保留备份？删除原文件前，这段说明要求注意什么？',answer:'原文件丢失时可使用副本；要确认备份能打开，出现错误提示时不要删除原文件。'},
    {id:'shared',title:'Which copy should we use?',titleZh:'该用哪一份？',level:2,topic:'工作',pair:'files',
      intro:'复现文件主题词，练 our、ours、theirs 和 shared、written、sent。',targets:['ours','theirs','written','sent','set up'],
      sentences:[
        s('Our team used to send a new email whenever we changed a file.','我们团队以前每次修改文件都会再发一封邮件。','used to + 原形表示过去的习惯；不是“习惯于发送”。'),
        s('After a few days, nobody knew which copy was the latest.','几天后，没人知道哪份是最新的。','which copy was the latest 是 knew 的内容。'),
        s('The copy on my laptop was different from the one on hers.','我笔记本电脑上的副本和她电脑上的那份不同。','one 指副本；hers 在此代替 her laptop。',{one:{meaning:'那份副本'},hers:{meaning:'她的笔记本电脑（her laptop）'}}),
        s('We decided to set up a shared folder instead.','于是我们决定改用共享文件夹。','set up 建立；instead 表替代原做法。'),
        s('Now the files in this folder are ours, and everyone can see the changes.','现在这个文件夹里的文件归我们团队所有，大家都能看到更改。','ours 独立表示我们的；不是 our + 名词。',{ours:{meaning:'我们团队的（文件）'}}),
        s('The other team keeps theirs in a separate folder.','另一个团队把他们的文件放在单独的文件夹里。','theirs 代替 their files。',{theirs:{meaning:'他们团队的文件（their files）'}}),
        s('Notes written at the top of each file explain what has changed.','写在每个文件顶部的备注会说明哪些内容有变化。','written 修饰 Notes；explain 是主句动词；what... 是说明内容。',{written:{lemma:'write',meaning:'写在……的，用来修饰 Notes',form:'participle'}}),
        s('If someone needs an old version, it can still be found in the backup folder.','如果有人需要旧版本，仍可以在备份文件夹里找到。','can still be found 是情态被动；it 指旧版本。',{it:{meaning:'它，指旧版本'},found:{lemma:'find',meaning:'被找到',form:'participle'}}),
        s('I’m getting used to checking the folder before I ask for an update.','我正逐渐习惯先查看文件夹，再询问更新情况。','get used to + doing 表逐渐习惯，to 在这里是介词。')
      ],question:'为什么团队改用共享文件夹？想找旧版本怎么办？',answer:'邮件副本太多，难判断哪个最新；到备份文件夹里找旧版本。'},
    {id:'book',title:'A book worth reading twice',titleZh:'一本值得读两遍的书',level:2,topic:'日常',pair:'learning',
      intro:'从读懂事件走向理解态度，复现 borrow、lend、read、taken 和代词。',targets:['lent','read','taken','hers','look forward to'],
      sentences:[
        s('A colleague lent me a book about building small habits.','一位同事借给我一本关于养成小习惯的书。','lend 是借出；借入用 borrow。',{lent:{lemma:'lend',meaning:'借给了',form:'past'}}),
        s('I’d seen it on her desk, but I hadn’t read it before.','我之前在她桌上见过，但没有读过。','I’d = I had；seen 和 read 都在完成时中。',{ "i’d":{meaning:'I had；过去完成时',expansion:'I had'},seen:{lemma:'see',meaning:'见过',form:'participle'},read:{lemma:'read',meaning:'读过，读 /red/',form:'participle'}}),
        s('She said it had helped her find more time for things she enjoyed.','她说这本书帮助她为喜欢的事情找到更多时间。','外层 She said；things she enjoyed 中省略关系词。',{it:{meaning:'它，指这本书'},her:{meaning:'她（宾格）'}}),
        s('At first, I tried to finish a whole chapter every evening.','起初，我试着每晚读完一整章。','try to do 表努力尝试；every evening 是频率。'),
        s('That was too much after a busy day, so I kept putting it off.','忙碌一天后，这个任务太多了，所以我一直拖延。','kept putting it off = 一直推迟；it 指阅读这件事。',{that:{meaning:'那个安排，指每晚读完一章'},it:{meaning:'阅读任务，不是另一本书'}}),
        s('Then I started reading just two pages while I had breakfast.','后来我开始在吃早餐时只读两页。','started reading 表开始做；while 给出同时发生的场景。'),
        s('I wrote down one idea from each section and tried it at work.','我从每一节记下一条想法，并在工作中尝试。','wrote down 记下；it 指记下的想法。',{it:{meaning:'那条想法'}}),
        s('The notes I’ve taken are mine, but the book is still hers.','我记的笔记归我，但书仍是她的。','I’ve taken 限定 notes；mine 与 hers 都独立使用。',{taken:{lemma:'take',meaning:'记下（笔记）',form:'participle'},mine:{meaning:'我的（笔记）'},hers:{meaning:'她的（书）'}}),
        s('I’m looking forward to discussing it with her when I return it.','还书时，我期待和她讨论这本书。','look forward to + doing；when 给出时间。',{it:{meaning:'它，指这本书'}})
      ],question:'作者怎样让阅读更容易持续？笔记和书分别属于谁？',answer:'改成早餐时只读两页，并把一条想法用在工作中；笔记归作者，书归同事。'},
    {id:'messages',title:'Understanding a short message',titleZh:'读懂一条短消息',level:2,topic:'学习',pair:'learning',
      intro:'把本次学习方法放进英语场景，集中练缩写、词块和主句识别。',targets:['I’ve','I’d','ASAP','let me know','take a look'],
      sentences:[
        s('This morning, I received a message from a new colleague.','今天早上，我收到一位新同事的消息。','received 与 from... 一起说明收到什么、来自谁。'),
        s('It said, “I’ve updated the file we shared yesterday.”','消息写道：“我已经更新了我们昨天共享的文件。”','I’ve = I have；we shared yesterday 限定 file。',{it:{meaning:'它，指这条消息'},said:{lemma:'say',meaning:'写道；内容是',form:'past'}}),
        s('“Could you take a look and let me know whether the new version works?”','“你能看一下，告诉我新版本是否能正常使用吗？”','Could you 是请求；take a look 与 let me know 是并列动作。',{works:{lemma:'work',meaning:'能正常使用；起作用'}}),
        s('“I’d like to send it to the customer ASAP.”','“我想尽快把它发给客户。”','I’d = I would；ASAP = as soon as possible。',{ "i’d":{meaning:'I would；礼貌愿望',expansion:'I would'},it:{meaning:'它，指新版本的文件'}}),
        s('I knew most of the words, but the whole message took me a little time to understand.','大多数单词我都认识，但理解整条消息还是花了一点时间。','took + 人 + 时间，说明理解所需时间；不是不认识所有词。'),
        s('First, I found the main actions: check the file and reply.','首先，我找到了主要动作：检查文件并回复。','冒号后说明 main actions 的具体内容。'),
        s('Then I checked the phrases I wasn’t sure about.','接着，我查了不确定的短语。','I wasn’t sure about 修饰 phrases，省略关系词。'),
        s('After reading the message again, I no longer needed to translate every word.','再读一次后，我不再需要逐词翻译。','After reading 是时间短语；no longer 表不再。'),
        s('I replied, “It works well. I’ve checked the changes, and you can send it.”','我回复：“它能正常使用。我已经检查了更改，你可以发送了。”','I’ve checked 与 can send 表已检查和可以发送的关系。',{it:{meaning:'它，指新版文件'}})
      ],question:'同事请作者做哪两件事？ASAP 在这条消息中是什么意思？',answer:'检查文件并回复新版本是否正常；ASAP 表尽快发送给客户。'}
  ];
})();
