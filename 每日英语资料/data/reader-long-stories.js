/* 原创分章故事：生活、工作与 IT 场景。不是任何已出版小说的摘录或改写。 */
(() => {
  'use strict';
  const s = (text, translation, note, hints = {}) => ({text, translation, note, hints});
  window.READER_LONG_STORIES = [
    {
      id:'blue-box', title:'The blue box by the door', titleZh:'门边的蓝盒子', level:3, topic:'生活 · 分享与沟通', pair:'long-stories',
      intro:'一次好心分享带来了小误会。每次只读一章，跟着人物弄清“谁的东西”和“谁以为什么”。',
      objectives:['分清 mine/yours、ours/theirs 等独立物主代词，跟踪人称代词所指。','在故事中认出 went、put、took、gave、found、told 等过去式。','用 because、but、so、when 理解误会的原因和解决过程。'],
      targets:['said / told','gave / given','mine / yours','ours / theirs','a few','because / but / so','before / after'],
      chapters:[{title:'A small idea',titleZh:'一个小主意',start:0},{title:'The missing book',titleZh:'不见的书',start:11},{title:'Two different meanings',titleZh:'两种理解',start:22},{title:'A better question',titleZh:'一个更好的问题',start:33}],
      sentences:[
        s('When my older sister and I moved into our new home, we knew nobody in the building.','我和姐姐搬进新家时，我们不认识楼里的任何人。','when 交代时间；主句 we knew nobody；knew 是 know 的过去式。',{we:{meaning:'我们，指我和姐姐'},knew:{lemma:'know',form:'past',meaning:'认识；了解'}}),
        s('Every morning, people went past our door, but they rarely stopped to talk.','每天早晨，人们从我们门前经过，却很少停下来交谈。','went past 表经过；stopped to talk 表停下原来的动作，转而说话。',{went:{lemma:'go',form:'past',meaning:'走过；经过'}}),
        s('I wanted to know them, but I did not know how to start.','我想认识他们，却不知道该怎样开始。','第一个 know 是认识人；第二个 know 是知道做法；how to start 是内容块。',{them:{meaning:'他们，指经过门前的邻居'}}),
        s('One Saturday, I found a blue box under my desk while I was cleaning.','一个星期六，我打扫时在书桌下面发现了一个蓝盒子。','found 是主句动作；while I was cleaning 说明当时正在做什么。',{found:{lemma:'find',form:'past',meaning:'发现了'}}),
        s('There were three books in it, and I did not need them anymore.','里面有三本书，我已经不再需要它们了。','There were 表“有”；it 指盒子，them 指书。',{it:{meaning:'它，指蓝盒子'},them:{meaning:'它们，指三本书'}}),
        s('My sister gave me two more books and said that I could share those too.','姐姐又给了我两本书，说那些也可以分享。','gave me two more books 是给人某物；said that 后面是所说内容。',{gave:{lemma:'give',form:'past',meaning:'给了'},those:{meaning:'那些，指姐姐拿来的两本书'}}),
        s('I put them in the box and left it on a table by our door.','我把这些书放进盒子，又把盒子放在门边的桌子上。','put 和 left 是两个过去动作；them 与 it 指不同的东西。',{them:{meaning:'它们，指书'},it:{meaning:'它，指蓝盒子'},put:{lemma:'put',form:'past'},left:{lemma:'leave',form:'past',meaning:'放在；留下'}}),
        s('Then I wrote a short note: “Take a book if you would like one.”','接着我写了张短便条：“如果你想要一本，就拿一本吧。”','one 代替 a book；便条只说可以拿书，没有明确是借用还是赠送。',{wrote:{lemma:'write',form:'past'},one:{meaning:'一本书'}}),
        s('A man from the next room took a book and thanked me for it.','隔壁房间的一位男士拿了本书，并为此向我道谢。','from the next room 说明是哪位男士；thank someone for something 表为某事感谢某人。',{took:{lemma:'take',form:'past',meaning:'拿了'},it:{meaning:'这本书'}}),
        s('He told me his name was Sam, and we talked for a few minutes.','他告诉我他叫萨姆，我们聊了几分钟。','told me 后接说的内容；for a few minutes 表持续时间。',{he:{meaning:'他，指隔壁的萨姆'},told:{lemma:'tell',form:'past'}}),
        s('For the first time, the building felt like a place where I could make friends.','我第一次觉得，这栋楼是个可以交到朋友的地方。','felt like 表感觉像；where I could make friends 修饰 place。',{felt:{lemma:'feel',form:'past',meaning:'让人感觉'}}),

        s('The next evening, my sister asked me where her book about cooking was.','第二天晚上，姐姐问我她那本烹饪书在哪里。','asked me 后是 where 引导的询问内容，使用陈述语序。'),
        s('I said that I thought she had given it to me for the box.','我说，我以为她把那本书给我，是为了放进分享盒。','外层是 I said；thought 后说明我的理解；had given 表更早发生的事。',{she:{meaning:'她，指姐姐'},it:{meaning:'它，指烹饪书'},given:{lemma:'give',form:'participle',meaning:'已经给了'}}),
        s('She looked at the table and saw that the blue box was almost empty.','她看了看桌子，发现蓝盒子几乎空了。','looked 与 saw 是并列动作；that 后是看到的情况。',{saw:{lemma:'see',form:'past',meaning:'看见；发现'}}),
        s('“Those two books are mine, but I only wanted to lend them,” she said.','她说：“那两本书是我的，但我只是想把它们借出去。”','are mine 表现在仍归我所有；lend 是借出，不是赠送。',{mine:{meaning:'我的，姐姐在说书归她所有'},them:{meaning:'它们，指姐姐的两本书'}}),
        s('“You can give yours away, but please ask me before you give away mine.”','“你可以把自己的书送人，但送我的书之前，请先问问我。”','give away 表赠送；yours 代替 your books，mine 代替 my books；before 表先后。',{you:{meaning:'你，姐姐对叙述者说'},yours:{meaning:'你的书，指叙述者的书'},mine:{meaning:'我的书，指姐姐的书'}}),
        s('I wanted to explain that the note was clear, but then I read it again.','我本想解释便条写得很清楚，但随后又读了一遍。','wanted to explain 是原本的想法；but then 引出改变；read 在此是过去式。',{it:{meaning:'它，指分享便条'},read:{lemma:'read',form:'past',meaning:'读了，读 /red/'}}),
        s('It did not say whether people should return the books or keep them.','便条没有说明人们应该把书还回来，还是可以留下。','whether...or... 表两种可能；did not 后 say 用原形。',{it:{meaning:'它，指便条'},them:{meaning:'它们，指书'}}),
        s('My sister understood sharing as lending, and I understood it as giving.','姐姐把分享理解成借出，而我把它理解成赠送。','understand A as B 表把 A 理解为 B；两种理解并列对比。',{understood:{lemma:'understand',form:'past',meaning:'理解成'},it:{meaning:'分享这件事'}}),
        s('Neither of us knew what our neighbors thought, because we had not asked them.','我们俩都不知道邻居们是怎么想的，因为我们没有问过他们。','Neither of us 表我们两人都不；what... 是 knew 的内容。',{them:{meaning:'他们，指邻居们'}}),
        s('I went to the next room and asked Sam about the book he had taken.','我去了隔壁，向萨姆问起他拿走的那本书。','he had taken 修饰 book；taken 是 take 的过去分词。',{taken:{lemma:'take',form:'participle',meaning:'拿走了'}}),
        s('He opened his door with the cooking book in his hand and a smile on his face.','他打开门，手里拿着那本烹饪书，脸上带着笑容。','with 后补充开门时的状态；两个 his 都指萨姆的。',{he:{meaning:'他，指萨姆'},his:{meaning:'他的，指萨姆的'}}),

        s('“This book is great,” Sam said, “and I have already tried one of its ideas.”','萨姆说：“这本书很棒，我已经试过里面的一个点子了。”','have tried 表已经尝试；its ideas 指书中的点子，its 没有撇号。',{its:{meaning:'它的，指这本书中的'}}),
        s('He thought the books were gifts, so he did not plan to give this one back.','他以为这些书是礼物，所以没打算把这本还回来。','thought 后接理解的内容；so 引出这一理解带来的计划。',{one:{meaning:'一本书，指烹饪书'},thought:{lemma:'think',form:'past',meaning:'以为'}}),
        s('I told him that the book was my sister’s, and I explained my mistake.','我告诉他那本书是我姐姐的，并解释了我的误会。','told him 后说明内容；my sister’s 独立表示我姐姐的书。',{him:{meaning:'他，指萨姆'}}),
        s('He gave it back right away, but he looked a little sad when he did.','他立刻把书还给我，但还书时看起来有些失落。','looked 后接形容词 sad；最后 did 代替 gave it back。',{it:{meaning:'它，指烹饪书'},did:{lemma:'do',form:'past',meaning:'代替前面“把书还回来”的动作'}}),
        s('“My children are coming tomorrow, and I wanted to make them dinner using this book,” he said.','他说：“我的孩子们明天要来，我本来想照着这本书给他们做晚饭。”','are coming 表已安排的未来活动；wanted to 表之前的打算；make them dinner 是给他们做晚饭。',{them:{meaning:'他们，指萨姆的孩子们'},this:{meaning:'这本，指烹饪书'}}),
        s('I took the book home, but I kept thinking about his face at the door.','我把书带回家，却一直想着他开门时的神情。','kept thinking 表持续想着；his face 指萨姆的神情。',{kept:{lemma:'keep',form:'past',meaning:'一直；持续'},his:{meaning:'萨姆的'}}),
        s('When I told my sister what he had said, she asked me to wait.','我把他的话告诉姐姐时，她让我等一等。','what he had said 表他说的话；asked me to wait 是请我做某事。',{said:{lemma:'say',form:'participle',meaning:'说过'},she:{meaning:'她，指姐姐'}}),
        s('She found a page in the book and wrote down a few things we needed.','她在书里找到一页，记下了我们需要的几样东西。','we needed 修饰 things；wrote down 表记下。',{we:{meaning:'我们，指我和姐姐'}}),
        s('“Let’s get these things and ask Sam if he would like some help,” she said.','她说：“我们把这些东西买来，再问问萨姆是否需要帮忙吧。”','Let’s 提建议；get 在此指买来；ask if 中 if 表是否。',{get:{lemma:'get',meaning:'买来；弄到'},these:{meaning:'这些，指刚列出的做饭用品'},if:{meaning:'是否；引出所询问的内容'}}),
        s('We bought the food, and the three of us made dinner together the next day.','我们买了食材，第二天我们三个人一起做了晚饭。','the three of us 指我、姐姐和萨姆；made 是 make 的过去式。',{bought:{lemma:'buy',form:'past'},made:{lemma:'make',form:'past',meaning:'做了（饭）'}}),
        s('His children brought bread, and they stayed to help us clean after the meal.','他的孩子们带来了面包，饭后还留下来帮我们收拾。','stayed to help 表留下来的目的；they 指孩子们，us 指做饭的三个人。',{they:{meaning:'他们，指萨姆的孩子们'},us:{meaning:'我们，指叙述者、姐姐和萨姆'},brought:{lemma:'bring',form:'past'}}),

        s('The following week, we put two small boxes on the table instead of one.','接下来的一周，我们在桌上放了两个小盒子，不再只放一个。','instead of one 表用两个取代一个；one 代替 box。'),
        s('One had a note that said “Free to keep,” and the other said “Please return.”','一个上面的便条写着“可以留下”，另一个写着“请归还”。','one...the other... 区分两个盒子；said 在这里表示文字写着什么。',{said:{lemma:'say',form:'past',meaning:'写着'},other:{meaning:'另一个，指第二个盒子'}}),
        s('My sister put her books in the second box and wrote her name inside them.','姐姐把自己的书放进第二个盒子，并在书里写上了她的名字。','her books 和 her name 都是 her + 名词；them 指书。',{her:{meaning:'她的，指姐姐的'},them:{meaning:'它们，指姐姐的书'}}),
        s('I put mine in the first box because I did not need them back.','我把自己的书放进第一个盒子，因为我不需要别人还回来。','mine 代替 my books；because 说明放入第一个盒子的原因。',{mine:{meaning:'我的书'},them:{meaning:'它们，指我的书'}}),
        s('Soon, other people brought their books and asked us where they should put them.','很快，其他人也带来了自己的书，问我们应该放在哪里。','their books 是他们的书；where 后用 they should put them 的陈述语序。',{they:{meaning:'他们，指带书来的邻居'},them:{meaning:'它们，指邻居带来的书'}}),
        s('Some books were ours, and some were theirs, but every book had a clear place.','有些书是我们的，有些是他们的，但每本书都有明确的位置。','ours、theirs 都可以独立使用；不用再接 books。',{ours:{meaning:'我们的，指我和姐姐的'},theirs:{meaning:'他们的，指其他邻居的'}}),
        s('The blue box did not make our building perfect, and we still had small problems.','蓝盒子没有让我们的楼变得完美，我们仍然会遇到小问题。','make + 对象 + 形容词，表示使对象处于某种状态。'),
        s('Sometimes someone forgot to write a name, or a book stayed away for too long.','有时有人忘了写名字，或者一本书借出去太久没有归还。','forgot to write 表忘记去写，不是忘了名字本身；for too long 表持续得过久。',{forgot:{lemma:'forget',form:'past',meaning:'忘记去做'}}),
        s('But now we knew who to ask, and asking no longer felt difficult.','但现在我们知道该问谁，开口询问也不再显得困难。','who to ask 是 knew 的内容；asking 整体作第二个分句的主语。'),
        s('When someone says “You can share this,” I ask what sharing means to them.','现在，当有人说“这个可以分享”时，我会问对方说的分享具体是什么意思。','现在时描述新习惯；what sharing means to them 是所问的内容。',{them:{meaning:'对方；这里用单数 they 的宾格指性别未指定的 someone'}}),
        s('A good question takes a little time, but it can save a lot of trouble later.','问一个好问题只花一点时间，却能省去以后许多麻烦。','takes 表花费；it 指提出好问题这件事；but 对比成本与作用。',{it:{meaning:'提出这个好问题'}})
      ],
      question:'误会并不是谁不愿意分享。三个人对哪一个词理解不同？最后怎样既保留分享，又减少误会？',
      answer:'他们对 share 的理解不同：姐姐想借出，叙述者和萨姆理解成赠送。后来把“可以留下”和“需要归还”分成两盒、标明姓名，并在不确定时先问。'
    },
    {
      id:'meaning-of-done',title:'What does “done” mean?',titleZh:'“做完了”到底是什么意思？',level:3,topic:'工作 · 澄清与协作',pair:'long-stories',
      intro:'一份看起来已经完成的工作，为什么差点不能交付？跟随一位新同事，练习问清要求、确认时间和表达不确定。',
      objectives:['识别 think/know/ask + 内容小句，先抓“谁以为什么”。','反复理解 do/did/done、write/wrote/written、send/sent 的区别。','把 Could you…、Do you mean…、Let me know 等表达用于实际沟通。'],
      targets:['make sure','let me know','could you','wrote / written','do / did / done','our / ours','before / when / if'],
      chapters:[{title:'A word on the list',titleZh:'清单上的一个词',start:0},{title:'Three answers',titleZh:'三个答案',start:10},{title:'A smaller promise',titleZh:'一个更小的承诺',start:20},{title:'The next Friday',titleZh:'下一个星期五',start:30}],
      sentences:[
        s('In my second week in a new job, our team was preparing a guide for customers.','入职第二周，我们团队正在为客户准备一份指南。','was preparing 表当时正在进行；for customers 说明指南面向谁。'),
        s('The guide showed people how to use a service that helped them book meeting rooms.','指南教人们使用一项帮助他们预订会议室的服务。','how to use 是 showed 的内容；that... 修饰 service。',{them:{meaning:'他们，指使用服务的人们'}}),
        s('My manager, Ben, asked us to send it to the customer before Friday afternoon.','经理本让我们在周五下午之前把指南发给客户。','asked us to send 表要求我们发送；before 标明截止时间。',{it:{meaning:'它，指指南'}}),
        s('I wrote the first two pages, and my colleague Ana worked on the pictures.','我写了前两页，同事安娜负责图片部分。','两个并列分句交代分工；worked on 表处理、制作。',{wrote:{lemma:'write',form:'past'}}),
        s('Another colleague, Sam, checked the instructions while we worked on our parts.','另一位同事萨姆在我们做各自部分时检查操作说明。','while 连接同时发生的工作；our parts 是我们各自负责的部分。'),
        s('By Thursday morning, every name on the shared list had the word “done” beside it.','到周四早上，共享清单上每个人的名字旁边都有了“完成”这个词。','By Thursday morning 表截至那个时间；主干 every name had the word。',{it:{meaning:'它，指清单上的每个名字'},done:{lemma:'do',form:'participle',meaning:'已完成的；清单中的状态标签'}}),
        s('I thought that meant we were ready, so I offered to send the file.','我以为这表示我们准备好了，于是主动提出发送文件。','thought 后是我的判断；so 后是这一判断引出的行动。'),
        s('I opened the file on my phone for one last check before sending anything.','发送任何内容之前，我先在手机上打开文件，做最后一次检查。','before sending 表先检查、尚未发送；for one last check 表打开文件的目的。'),
        s('The first page told me to press a blue button, but there was no blue button.','第一页让我点击一个蓝色按钮，但页面上根本没有蓝色按钮。','told me to press 表指示我做什么；there was no... 表不存在。',{told:{lemma:'tell',form:'past',meaning:'指示；说明'}}),
        s('I looked at our list again and wondered what we had actually finished.','我又看了看清单，开始疑惑我们到底完成了什么。','what we had actually finished 是 wondered 的内容；不是直接问句语序。'),

        s('I sent Ana a message: “Could you tell me which pictures are the final ones?”','我给安娜发了消息：“你能告诉我哪些图片是最终版吗？”','Could you tell me 是礼貌请求；ones 代替复数 pictures。',{ones:{meaning:'那些图片；代替 pictures'}}),
        s('She replied that hers showed an old version because the new pictures were not ready.','她回复说，她的图片展示的是旧版本，因为新图片还没有准备好。','hers 代替 her pictures；because 说明使用旧图的原因。',{hers:{meaning:'她的图片'},she:{meaning:'她，指安娜'}}),
        s('“I have finished my first version,” she wrote, “but I haven’t checked it with Sam.”','她写道：“我已经做完第一版了，但还没有和萨姆核对过。”','have finished 表已经做完；haven’t checked 表还没核对。',{it:{meaning:'安娜的第一版图片'}}),
        s('Sam told me that he had read the words but had not tried the steps.','萨姆告诉我，他已经读过文字，但没有实际试过那些步骤。','had read 和 had not tried 并列，说明两件事的不同完成情况。',{read:{lemma:'read',form:'participle',meaning:'读过，读 /red/'}}),
        s('He thought “done” meant that he had found and fixed the mistakes in the writing.','他以为“完成”是指已经找出并改正了文字中的错误。','thought 后接他的理解；meant 后进一步解释 done 的含义。',{found:{lemma:'find',form:'participle',meaning:'已找出'},meant:{lemma:'mean',form:'past',meaning:'意思是'}}),
        s('I had written my pages from meeting notes without checking the service itself.','我写那几页时依据的是会议笔记，没有实际核对服务本身。','from meeting notes 说明依据；without checking 表没有做这一步检查。',{written:{lemma:'write',form:'participle',meaning:'写了'},itself:{meaning:'服务本身，用于强调'}}),
        s('My pages were mine, and Ana’s pictures were hers, but the whole guide was ours.','我写的页面是我的成果，安娜的图片是她的成果，但整份指南是我们共同的成果。','mine、hers、ours 独立表示所属；but 从个人分工转向共同成果。',{mine:{meaning:'我的成果'},hers:{meaning:'她的成果'},ours:{meaning:'我们共同的成果'}}),
        s('Nobody had checked whether all the parts worked together for someone new to the service.','还没有人检查过，对第一次使用服务的人来说，各部分合在一起是否管用。','whether 引出检查内容；new to the service 修饰 someone。'),
        s('I was afraid that asking more questions would make me look slow.','我担心再多问问题会让自己显得反应慢。','that 后是担心的事；asking more questions 整体作从句主语。'),
        s('But sending a guide that did not work would not help any of us.','但发出一份用不了的指南，对我们谁都没有帮助。','sending a guide... 整体作主语；that did not work 修饰 guide。',{us:{meaning:'我们，指团队成员'}}),

        s('I asked Ben for ten minutes and showed him what I had found on my phone.','我请本给我十分钟，把在手机上发现的问题给他看。','asked Ben for ten minutes 表请求时间；what... 是展示的内容。',{him:{meaning:'他，指经理本'},found:{lemma:'find',form:'participle'}}),
        s('He read the first page, tried the steps, and got the same problem as I did.','他读了第一页，试了那些步骤，遇到了和我一样的问题。','read、tried、got 是连续过去动作；最后 did 代替前面遇到问题的动作。',{read:{lemma:'read',form:'past',meaning:'读了，读 /red/'},got:{lemma:'get',form:'past',meaning:'遇到了'},did:{lemma:'do',form:'past',meaning:'代替 got the same problem 这一动作'}}),
        s('“Do you mean we should send fewer pages, but make sure they work?” he asked.','他问：“你的意思是，我们应该少发几页，但确保这些页能用？”','Do you mean... 用来确认对方意思；they 指准备发送的页面内容。',{they:{meaning:'它们，指准备发送的页面内容'}}),
        s('I said that two useful pages would be better than six pages full of mistakes.','我说，两页有用的内容会比六页错误百出的内容更好。','better than 表比较；full of mistakes 修饰 six pages。'),
        s('We agreed to finish only the part that explained how to book one room.','我们同意先只完成解释怎样预订一个房间的那部分。','agreed to finish 表商定行动；that explained... 限定 part。'),
        s('Ana took new pictures while Sam and I followed every step with a test account.','安娜重新拍了图片，同时萨姆和我用测试账号逐步核对每一步。','while 表同时进行；with a test account 表使用什么工具或条件。',{took:{lemma:'take',form:'past',meaning:'拍摄了'}}),
        s('When a step was not clear, we changed the words before we moved to the next one.','如果某一步不清楚，我们就先修改表述，再继续下一步。','when 在这里描述测试中遇到的情况；before 表先修改，再继续。',{one:{meaning:'一个步骤，代替 step'}}),
        s('Then we gave the guide to a colleague who did not usually use the service.','接着，我们把指南交给一位平时不常用这项服务的同事。','who... 修饰 colleague；did not 后 use 保持原形。',{gave:{lemma:'give',form:'past'}}),
        s('She booked a room without asking us for help, and we finally sent the file.','她没有向我们求助就订好了房间，我们这才把文件发了出去。','without asking 表没有做某事；finally 引出确认后的最终动作。',{she:{meaning:'她，指试用指南的那位同事'},us:{meaning:'我们，指编写指南的团队'}}),
        s('Ben told the customer what was ready and when we would send the rest.','本告诉客户，哪些内容已经准备好，以及其余部分什么时候发送。','what 和 when 分别引出两项要告诉客户的内容。'),

        s('The next Friday, we spent ten minutes talking about how to use our shared list.','下一个周五，我们花了十分钟讨论怎样使用共享清单。','spent time doing 表花时间做某事；how to use 是讨论内容。',{spent:{lemma:'spend',form:'past',meaning:'花了（时间）'}}),
        s('We did not need a new app or a long meeting to make the work clearer.','为了把工作说清楚，我们不需要新的应用，也不需要很长的会议。','did not need 表没有必要；to make... 表目的；clearer 是 clear 的比较级。'),
        s('Instead, we added three short notes: “First version,” “Checked,” and “Ready to send.”','我们只是加上了三个简短标记：“初稿”“已检查”和“可以发送”。','Instead 引出替代方案；三个引号中的短语是状态标签。'),
        s('If someone marked a task as checked, they also wrote down how they had checked it.','如果有人把任务标为“已检查”，还要记下是怎样检查的。','they 指性别未指定的 someone；how 后是检查的方法。',{they:{meaning:'该任务的检查者；这里是单数 they'},it:{meaning:'它，指这项任务'}}),
        s('Our list became a little longer, but our messages became much easier to understand.','清单变长了一点，但我们的消息却容易理解多了。','became + 形容词表变得；a little 和 much 修饰比较级。',{became:{lemma:'become',form:'past',meaning:'变得'}}),
        s('Now, when Ana asks me to check something, I ask what she wants me to check.','现在，安娜让我检查东西时，我会问她具体希望我检查什么。','外层 I ask；what she wants me to check 说明问的内容。',{she:{meaning:'她，指安娜'}}),
        s('Sometimes she needs help with the words, and sometimes she needs a new user’s view.','有时她需要我帮忙看表述，有时需要我从新用户的角度看。','sometimes...and sometimes... 对比不同需要；user’s 表用户的。'),
        s('I also tell her what I have done and what I have not done yet.','我也会告诉她，我已经做了什么，还有什么尚未做。','两个 what 小句并列；have done 与 have not done yet 对比完成情况。',{her:{meaning:'她，指安娜'},done:{lemma:'do',form:'participle',meaning:'做过；完成了'}}),
        s('“Let me know if you need anything else” is useful, but a clear question is useful too.','“如果还需要什么，请告诉我”很有用，但明确的问题同样有用。','引号内整段话作主语；if 表条件；too 表也。'),
        s('I still do not know everything, but I no longer have to hide what I do not know.','我仍然不是无所不知，但不再需要掩饰自己不知道的东西。','no longer have to 表不再需要；what I do not know 是 hide 的对象。')
      ],
      question:'为什么清单上每个人都写“完成”，指南却还不能用？团队最后改变了什么，而没有改变什么？',
      answer:'每个人对完成的理解不同，也没人把整份指南从新用户角度走一遍。团队先缩小交付范围，再用测试账号和新用户验证；之后区分初稿、已检查、可发送。没有靠换应用或开长会解决问题。'
    },
    {
      id:'quiet-button',title:'The button that said nothing',titleZh:'没有回应的按钮',level:3,topic:'IT · 排查与用户视角',pair:'long-stories',
      intro:'一个“在我电脑上没问题”的按钮让用户等了很久。跟着排查过程读故事，不需要编程知识；先弄清每一步发现了什么。',
      objectives:['读懂 when/before/after 引导的内容，分清触发条件和操作先后。','在真实语境中理解 work/get/show/check/change 的常见词形，以及 sent/seen/written。','追踪 it/its、this/these 指代页面、信息还是整个问题。'],
      targets:['asked / told','sent / seen / written','it / its','this / these','when / before / after','try again','show me'],
      chapters:[{title:'It works for me',titleZh:'我这里能用',start:0},{title:'A smaller screen',titleZh:'一块更小的屏幕',start:10},{title:'One change at a time',titleZh:'一次只改一处',start:20},{title:'A note for next time',titleZh:'留给下次的一条笔记',start:30}],
      sentences:[
        s('On Monday morning, a customer sent our team a message about the room booking page.','周一早上，一位客户给团队发来消息，反映会议室预订页面的问题。','sent our team a message 是给某人发送某物；about 后是消息主题。',{sent:{lemma:'send',form:'past'}}),
        s('“I press the button, but nothing happens, so I keep trying,” the message said.','消息写道：“我按了按钮，却没有反应，所以一直在重试。”','but 表预期落空；so 表后续反应；keep trying 表一直尝试。',{said:{lemma:'say',form:'past',meaning:'写道；内容是'}}),
        s('I opened the page on my laptop and booked a room without any problem.','我在笔记本电脑上打开页面，顺利预订了一个房间。','without any problem 表没有遇到问题；不要据此推断所有用户都能使用。'),
        s('The button worked for me, and I thought the customer might have a slow connection.','按钮在我这里能用，我便觉得客户可能网速较慢。','worked for me 表在我这里正常工作；might 表不确定的推测。',{worked:{lemma:'work',form:'past',meaning:'能正常工作'}}),
        s('I was about to ask them to try again when my colleague Sam came over.','我正要让对方再试一次，同事萨姆走了过来。','was about to 表正要；when 引出这时发生的事；them 指这位客户。',{them:{meaning:'对方；用单数 they 的宾格指这位客户'},came:{lemma:'come',form:'past'}}),
        s('He read the message and asked me what I knew about the customer’s screen.','他读完消息，问我对客户的屏幕情况了解多少。','what I knew... 是问的内容；customer’s screen 表客户的屏幕。',{he:{meaning:'他，指萨姆'},read:{lemma:'read',form:'past',meaning:'读了，读 /red/'},knew:{lemma:'know',form:'past'}}),
        s('I knew my screen was large, but I did not know whether theirs was small.','我知道自己的屏幕很大，却不知道对方的屏幕是否很小。','theirs 代替 their screen；whether 表是否，不能译成如果。',{theirs:{meaning:'对方的屏幕；这里的 their 指一位客户'}}),
        s('I also did not know which room they wanted or which time they had chosen.','我也不知道对方想订哪个房间，或者选了哪个时段。','which room... 和 which time... 是两个并列的未知内容。',{they:{meaning:'这位客户；这里使用单数 they'},chosen:{lemma:'choose',form:'participle',meaning:'已经选择了'}}),
        s('“We have seen our result,” Sam said, “but we have not seen theirs yet.”','萨姆说：“我们已经看到了自己的结果，但还没看到对方的。”','have seen / have not seen yet 对比已知与未知；theirs 代替 their result。',{seen:{lemma:'see',form:'participle',meaning:'看到过'},theirs:{meaning:'对方的结果'}}),
        s('Before we changed anything, we asked the customer to show us the steps they took.','改动任何东西之前，我们先请客户说明操作步骤。','Before 表先后；they took 修饰 steps；take steps 表采取步骤。',{they:{meaning:'这位客户'},took:{lemma:'take',form:'past',meaning:'进行了（操作步骤）'}}),

        s('The customer replied with a picture and told us they were using a phone.','客户发来一张图片，并告诉我们，对方使用的是手机。','told us 后是提供的信息；were using 描述当时使用的设备。',{they:{meaning:'这位客户'}}),
        s('They had chosen a room that was already booked, but the page did not make this clear.','对方选了一个已经被预订的房间，但页面没有把这点显示清楚。','that was already booked 修饰 room；this 指房间已被预订这件事。',{this:{meaning:'所选房间已经被预订这一情况'},chosen:{lemma:'choose',form:'participle'}}),
        s('We opened a test version on a phone and followed the same steps together.','我们在手机上打开测试版，一起按相同的步骤操作。','followed the same steps 表复现同一操作过程；test version 是测试版。'),
        s('When I pressed the button, a red message appeared at the top of the page.','我按下按钮时，一条红色提示出现在页面顶部。','when 给出触发动作；主句 a red message appeared 说明结果。'),
        s('It said that the room was not available, but its position was far above the button.','提示说这个房间无法预订，但它的位置远在按钮上方。','It 指提示本身；its position 是提示的位置，its 不带撇号。',{it:{meaning:'它，指红色提示'},its:{meaning:'它的，指红色提示的位置'}}),
        s('On a large screen, I could see the message and the button at the same time.','在大屏幕上，我能同时看到提示和按钮。','could see 表当时能够看到；at the same time 表同时。'),
        s('On the phone, I could only see the button, so it seemed that nothing had changed.','在手机上，我只能看到按钮，因此看起来什么变化都没有。','it seemed that... 表看起来似乎；nothing had changed 是观察到的情况。',{it:{meaning:'形式主语，不是指手机或按钮'}}),
        s('I tried again and again, just as the customer had, and I got the same result.','我像客户一样反复尝试，也得到了同样的结果。','as the customer had 省略了 tried；got the same result 表得到同样结果。',{had:{lemma:'have',form:'past',meaning:'过去完成时助动词；后面省略 tried'},got:{lemma:'get',form:'past',meaning:'得到了'}}),
        s('The page was giving an answer, but it was not giving that answer where people could see it.','页面其实给出了回应，却没有把回应放在人们看得见的地方。','两个 was giving 对比是否回应与回应的位置；where 表地点。',{'it@0':{meaning:'它，指页面'},'it@1':{meaning:'它，指回应消息'}}),
        s('We did not need a faster connection; we needed a clearer way to show the problem.','我们需要的不是更快的网络，而是更清楚地显示问题的方式。','分号连接两个对比句；to show the problem 说明 way 的用途。'),

        s('I wanted to move the message right away, but Sam asked me to read our guide first.','我想马上移动提示的位置，但萨姆让我先读一下我们的指南。','wanted to 与 asked me to 分别表示我的想法和他的建议。'),
        s('It said that an error message should appear near the part that needs attention.','指南说，错误提示应该出现在需要注意的位置附近。','It 指指南；that needs attention 修饰 part，不是修饰 message。',{it:{meaning:'它，指团队的指南'}}),
        s('This rule made sense, and I could see why our page was difficult to use.','这条规则很有道理，我也明白了为什么我们的页面不好用。','made sense 表有道理；why... 是 see 在此“明白”的内容。',{this:{meaning:'这条规则，指把错误提示放在相关位置附近'},see:{lemma:'see',meaning:'明白；理解'}}),
        s('We kept a copy of the old version and made the change in our test version.','我们保留了旧版本的副本，然后在测试版中进行修改。','kept 与 made 是先后动作；in our test version 说明修改位置。',{kept:{lemma:'keep',form:'past',meaning:'保留了'},made:{lemma:'make',form:'past',meaning:'进行了（修改）'}}),
        s('After the change, the message appeared next to the button when a room was unavailable.','修改后，房间无法预订时，提示就会显示在按钮旁边。','After the change 是时间背景；when... 说明出现提示的条件。'),
        s('It also told the user what to do next: choose a different room or time.','提示还告诉用户下一步该做什么：换一个房间或时段。','what to do next 是 told 的内容；冒号后是具体操作。',{it:{meaning:'它，指错误提示'},told:{lemma:'tell',form:'past',meaning:'告诉；指示'}}),
        s('We checked this on both phones and laptops before we asked anyone else to try it.','请别人试用之前，我们先在手机和笔记本电脑上检查了这项改动。','both A and B 表两者都；before 表先自行测试，再请别人试用。',{this:{meaning:'这项改动'},it:{meaning:'修改后的预订页面'}}),
        s('Then a colleague who knew nothing about the change used the page with a test account.','接着，一位不了解这次改动的同事用测试账号操作了页面。','who knew nothing about the change 修饰 colleague；主句动词是 used。'),
        s('She saw the message, chose another room, and finished the booking without our help.','她看到了提示，选了另一个房间，不用我们帮忙就完成了预订。','saw、chose、finished 是连续动作；without our help 表无需帮助。',{she:{meaning:'她，指来试用的同事'},saw:{lemma:'see',form:'past'},chose:{lemma:'choose',form:'past'}}),
        s('We put the new version online and told the customer only after these checks.','完成这些检查之后，我们才把新版本上线，并通知客户。','put...online 与 told 是并列动作；only after 表必须先完成检查。',{these:{meaning:'这些，指前面提到的各项检查'},put:{lemma:'put',form:'past',meaning:'放到（网上）；使上线'},told:{lemma:'tell',form:'past'}}),

        s('The next morning, the customer sent a short reply saying that the page worked well.','第二天早上，客户发来简短回复，说页面已经很好用了。','saying that... 补充 reply 的内容；worked well 表运行正常。'),
        s('They did not ask what code we had written, because they only needed to book a room.','对方没问我们写了什么代码，因为对方只需要订好一个房间。','what code... 是 ask 的内容；because 解释用户真正关心的事。',{they:{meaning:'这位客户'},written:{lemma:'write',form:'participle',meaning:'写了（代码）'}}),
        s('I wrote down what we had learned and saved the note with the other project files.','我记下了这次学到的东西，并把笔记和其他项目文件存在一起。','what we had learned 是 wrote down 的内容；with... 表一起存放。'),
        s('The note began with a question: “Have we seen what the user actually sees?”','笔记开头是一个问题：“我们看到用户实际看到的内容了吗？”','Have we seen 是现在完成时疑问；what... 是看到的内容。',{began:{lemma:'begin',form:'past',meaning:'以……开头'},seen:{lemma:'see',form:'participle',meaning:'看过'}}),
        s('Under it, I listed the things we should ask for: the device, the steps, and the result.','在这个问题下面，我列出了应询问的信息：设备、操作步骤和结果。','we should ask for 修饰 things；冒号后列出具体信息。',{it:{meaning:'它，指笔记开头的问题'}}),
        s('These questions were simple, but they helped us stop guessing and start checking.','这些问题很简单，却帮助我们不再猜测，而是开始核查。','helped us stop...and start... 是两个并列动作；stop guessing 表停止猜测。',{these:{meaning:'这些，指关于设备、步骤、结果的问题'},they:{meaning:'这些问题'}}),
        s('A week later, another message arrived about a different page, and I took a slower first step.','一周后，又收到一条关于另一个页面的消息，这次我的第一步放慢了些。','another message 是另一条消息；a slower first step 指不急着下结论。'),
        s('I did not write “It works for me” and close the task after one quick test.','我没有只做一次快速测试，就写下“我这里能用”并关闭任务。','did not 的否定作用于后面的并列动作；after 交代测试与关闭任务的先后。',{it:{meaning:'它，指被反馈有问题的页面'}}),
        s('Instead, I asked the user to show me what happened, then tried it in the same way.','我先请用户说明发生了什么，再按相同方式尝试。','Instead 引出新做法；what happened 是展示的内容；then 表下一步。',{it:{meaning:'用户反馈出问题的操作'}}),
        s('Taking time to understand the problem did not slow us down; it helped us fix the right thing.','花时间理解问题并没有拖慢我们，反而帮助我们改对了地方。','Taking time... 整体作主语；后面的 it 指花时间理解问题这件事。',{it:{meaning:'花时间弄清问题这件事'}})
      ],
      question:'为什么作者的大屏幕上能看到提示，客户却觉得按钮没有反应？这次经验改变了作者下一次处理反馈的哪个习惯？',
      answer:'错误提示在页面顶部，大屏幕同时看得到提示和按钮，手机当前画面却看不到提示。作者后来先问清设备、步骤、结果，再复现和验证，不再只凭自己的设备测试一次就关闭问题。'
    }
  ];
  // 供主词典统一合并；这些词用于本故事，不意味着它们都应列入最先精记的清单。
  const words = {};
  const add = (pos, entries) => Object.entries(entries).forEach(([word, meaning]) => {words[word] = {word, pos, meaning};});
  add('n.', {sister:'姐妹；older sister 是姐姐',building:'建筑物；楼',neighbor:'邻居（美式拼写；英式 neighbour）',smile:'微笑',face:'脸；面容',gift:'礼物',meal:'一餐；饭',lot:'大量；a lot of 表许多',trouble:'麻烦；困难',job:'工作；职位',picture:'图片；照片',rest:'其余部分；休息',view:'看法；视角',position:'位置',attention:'注意',sense:'意义；make sense 表有道理',user:'用户',code:'代码；编码'});
  add('adj.', {older:'年纪更大的；old 的比较级',blue:'蓝色的',great:'很好的；很棒的',sad:'难过的；失落的',perfect:'完美的',afraid:'害怕的；担心的',fewer:'更少的；few 的比较级，修饰可数复数',clearer:'更清楚的；clear 的比较级',red:'红色的',faster:'更快的；fast 的比较级',unavailable:'不可用的；无法获得的；available 的反义词',slower:'更慢的；slow 的比较级'});
  add('adv.', {rarely:'很少；不常',anymore:'再；not...anymore 表不再',actually:'实际上；确实',far:'远；程度很大'});
  add('prep.', {past:'经过；越过',beside:'在……旁边',above:'在……上方'});
  add('pron.', {neither:'两者都不；neither of us 表我们两人都不',ones:'代替前面提到的复数名词；one 的复数'});
  add('人名', {sam:'萨姆（本故事中的人名）',ben:'本（本故事中的人名）',ana:'安娜（本故事中的人名）'});
  const verb = (base, third, past, participle, ing, meaning, pos = 'v.') => {words[base] = {word:base,pos,meaning,forms:{base,third,past,participle,ing}};};
  verb('press','presses','pressed','pressed','pressing','按；压');
  verb('wonder','wonders','wondered','wondered','wondering','想知道；感到疑惑');
  verb('add','adds','added','added','adding','添加；加上');
  verb('mark','marks','marked','marked','marking','标记');
  verb('hide','hides','hid','hidden','hiding','隐藏；掩饰');
  verb('appear','appears','appeared','appeared','appearing','出现');
  verb('list','lists','listed','listed','listing','列出；清单；列表','v./n.');
  window.READER_LONG_WORDS = words;
  window.READER_STORIES.push(...window.READER_LONG_STORIES);
})();
