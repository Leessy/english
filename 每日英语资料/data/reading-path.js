/* 原创教学例句。按阅读用途排序，不宣称是语料统计的词频榜。 */
(() => {
  const c = (text, type, role, explain) => ({ text, type, role, explain, tip: explain });
  const e = (translation, spine, note, ...chunks) => ({ translation, spine, note, chunks });
  window.READING_PATH = [
    {
      id: 'verb-blocks', title: '把动作组合读成一块', pattern: 'need to / don’t need to / can + 动作',
      goal: '先辨认需要、不需要、能够，再读具体动作。不要把 not 漏掉。',
      reminder: 'need to 是常用搭配，不是一个新时态。don’t = do not；can 后直接接动词原形。',
      words: [['need to','需要做'],['don’t need to','不必做（不是“禁止”）'],['check','检查；核对'],['send','发送'],['again','再一次'],['address','地址']],
      examples: [
        e('我们需要核对地址。','We need to check the address.','need 是带时态的动词；阅读时可把 need to check 连起来理解为“需要核对”。', c('We','subject','谁','我们'), c('need to check','verb','动作组合','需要核对'), c('the address.','object','核对什么','地址')),
        e('你不必再次发送文件。','You don’t need to send the file.','否定的是“需要”：不必发送，不等于不能发送。', c('You','subject','谁','你'), c('don’t need to send','verb','否定动作组合','不需要发送'), c('the file','object','发送什么','文件'), c('again.','modifier','次数','再一次')),
        e('我们需要先核对地址，但你现在就可以发消息。','We need to check the address, but you can send the message.','but 连接两个判断；第二部分重新找 you + can send。', c('We','subject','第一部分主语','我们'), c('need to check','verb','第一组动作','需要核对'), c('the address first,','object','对象和顺序','先核对地址'), c('but','modifier','连接关系','但是'), c('you','subject','第二部分主语','你'), c('can send','verb','第二组动作','可以发送'), c('the message now.','object','对象和时间','现在发消息'))
      ],
      transfer: { text: 'You don’t need to print the ticket. You can show it on your phone.', words: 'print 打印；ticket 票；show 出示；phone 手机；it 指票。', question: '对方需要做什么？', options: ['必须先打印票','不必打印，可以用手机出示票','不能出示电子票'], answer: 1, explain: 'don’t need to print = 不必打印；can show = 可以出示。这两块决定意思。', translation: '你不必打印票。可以在手机上出示。' }
    },
    {
      id: 'noun-blocks', title: '先认出长一点的“谁／什么”', pattern: '名词 + in / on / with / of …',
      goal: '主语可以是一整块，而不只是谓语前的一个单词。',
      reminder: '介词短语常补充位置、所属或特征。读主干时暂放括号内，最后必须补回。',
      words: [['message','消息'],['on your phone','在你的手机上'],['from','来自'],['friend','朋友'],['important','重要的'],['list of names','姓名列表']],
      examples: [
        e('这条消息很重要。','The message is important.','is 连接 message 和状态 important，不必把 is 单独译成“是”。', c('The message','subject','说什么','这条消息'), c('is','verb','连接状态','处于什么状态'), c('important.','object','什么状态','重要')),
        e('你手机上的这条消息很重要。','The message is important.','on your phone 修饰 message；phone 不是全句主语。', c('The message','subject','主语中心','消息'), c('on your phone','modifier','哪条消息','在你手机上的'), c('is','verb','主句动词','连接消息与状态'), c('important.','object','状态','重要')),
        e('你手机上来自朋友的那条消息很重要。','The message is important.','先认 message，再把 from your friend、on your phone 接回去。两个介词块没有另起一个完整句子。', c('The message','subject','主语中心','消息'), c('from your friend','modifier','来自谁','来自你的朋友'), c('on your phone','modifier','在哪里','在你的手机上'), c('is','verb','主句动词','连接状态'), c('important.','object','状态','重要'))
      ],
      transfer: { text: 'The list of names in this file is wrong.', words: 'list 列表；names 姓名；wrong 错误的。', question: '这句话主要说什么有错？', options: ['这个文件里的姓名列表','一个人的名字叫 File','文件所在的位置'], answer: 0, explain: '中心是 list，is 与单数 list 对应。of names 和 in this file 都在说明这份列表。', translation: '这个文件里的姓名列表有误。' }
    },
    {
      id: 'verb-time', title: '把助动词和动作一起读', pattern: 'is checking / checked / has checked',
      goal: '区分正在做、过去做过、截至现在已经做过，不要求背整张时态表。',
      reminder: 'check—checked—checked：过去式和过去分词同形；要看前面有没有 has / have，不能只看 -ed。',
      words: [['check','检查'],['is checking','正在检查'],['checked','检查了'],['has checked','已经检查过（与现在相关）'],['yet','在此类否定句中：还'],['result','结果']],
      examples: [
        e('她正在检查文件。','She is checking the file.','is + checking 才构成进行时；不要只抓 checking。', c('She','subject','谁','她'), c('is checking','verb','完整谓语','正在检查'), c('the file.','object','对象','文件')),
        e('她昨天检查了文件。','She checked the file.','checked 在这里独立作谓语，yesterday 明确表示过去时间。', c('She','subject','谁','她'), c('checked','verb','过去的动作','检查了'), c('the file','object','对象','文件'), c('yesterday.','modifier','什么时候','昨天')),
        e('她已经检查过文件，但还没有发来结果。','She has checked the file, but she hasn’t sent the result.','hasn’t = has not；sent 是 send 的过去分词。两个完成时描述截至现在的进度。完成时也可表达持续或经历，不总是“做完”。', c('She','subject','谁','她'), c('has checked','verb','已发生','已经检查过'), c('the file,','object','对象','文件'), c('but she','subject','转折后的主语','但她'), c('hasn’t sent','verb','尚未发生','还没有发送'), c('the result yet.','object','对象与时间提示','结果，至今还没有'))
      ],
      transfer: { text: 'I have read your message, but I haven’t replied yet.', words: 'read—read—read（后两者读 /red/）；replied 是 reply 回复的过去分词。', question: '目前的状态是？', options: ['还没读，也没回','正在写消息','读过消息，但还没回复'], answer: 2, explain: 'have read 与 haven’t replied 要成组读。不能看到 have 就都译成“有”。', translation: '我已经读过你的消息，但还没有回复。' }
    },
    {
      id: 'passive', title: '看出“谁被做了什么”', pattern: 'is saved / can be saved / has been saved',
      goal: '熟悉文档里对象做主语的写法，不把每个主语都当作动作执行者。',
      reminder: '被动常用 be + 过去分词。be 的形式会变；并非所有 be + -ed 都是动作被动，有些描述状态。',
      words: [['save','保存'],['saved','save 的过去式／过去分词'],['automatically','自动地'],['can be saved','可以被保存'],['has been saved','已经被保存'],['folder','文件夹']],
      examples: [
        e('文件会自动保存。','The file is saved.','is saved 是一般现在时被动：说明系统通常如何处理文件，不表示“正在保存”。', c('The file','subject','承受动作的对象','文件'), c('is saved','verb','被动谓语','被保存'), c('automatically.','modifier','方式','自动地')),
        e('文件可以保存在这个文件夹里。','The file can be saved.','can + be + saved 整块表示“可以被保存”；can 后用 be 原形。', c('The file','subject','什么','文件'), c('can be saved','verb','情态＋被动','可以被保存'), c('in this folder.','modifier','位置','在这个文件夹里')),
        e('文件已经保存，所以你现在可以关闭应用。','The file has been saved, so you can close the app.','has been saved = 完成时＋被动；so 后给出结果。中文自然表达不必每次加“被”。', c('The file','subject','什么','文件'), c('has been saved,','verb','现在完成时被动','已经保存好了'), c('so you','subject','结果部分主语','所以你'), c('can close','verb','可以做什么','可以关闭'), c('the app now.','object','对象和时间','现在关闭应用'))
      ],
      transfer: { text: 'Your order has been sent, but it hasn’t arrived yet.', words: 'order 订单（此处指订购的货物）；arrived 到达；it 指货物。', question: '货物到哪一步了？', options: ['已经送达','已经发出，但尚未送达','还没有发出'], answer: 1, explain: 'has been sent 是“已被发出”；hasn’t arrived 是“还没到”。arrive 在此不使用被动。', translation: '你订购的货物已发出，但还没有送达。' }
    },
    {
      id: 'conditions', title: '条件和时间不是可丢掉的装饰', pattern: 'if / before / unless + 小句',
      goal: '读出什么时候能做、必须先做什么，以及否定条件。',
      reminder: '从句也是小句：里面有自己的主语和谓语。先暂分块，再还原关系，不能只翻译主句。',
      words: [['if','如果'],['before','在……之前'],['unless','除非；如果不'],['leave','离开'],['change','更改'],['setting','设置项']],
      examples: [
        e('如果需要帮助，你可以打电话给我。','You can call me.','if you need help 限定建议适用的情况；不要读成“你肯定需要帮助”。', c('If you need help,','modifier','条件小句','如果你需要帮助'), c('you','subject','主句主语','你'), c('can call','verb','主句动作','可以打电话'), c('me.','object','给谁','给我')),
        e('离开之前，请保存文件。','Save the file.','主句是祈使句，省略了 you。顺序是先保存，再离开。', c('Before you leave,','modifier','时间小句','在你离开之前'), c('save','verb','要求做什么','保存（祈使句）'), c('the file.','object','对象','文件')),
        e('除非你更改这一设置，否则应用会自动保存文件。','The app saves your files automatically.','unless you change this setting ≈ if you do not change this setting。不要把条件方向翻反。', c('The app','subject','主句主语','应用'), c('saves','verb','主句动作','保存'), c('your files automatically','object','对象和方式','自动保存你的文件'), c('unless you change this setting.','modifier','例外条件','除非你更改这一设置'))
      ],
      transfer: { text: 'Do not close this window until the download is complete.', words: 'until 直到；download 下载；complete 在这里是形容词“完成的”。', question: '什么时候才可以关闭窗口？', options: ['下载完成之后','下载开始之前','随时都可以'], answer: 0, explain: 'Do not ... until ... = 在……之前不要……／直到……才……。not 和 until 必须一起理解。', translation: '下载完成之前，不要关闭这个窗口。' }
    },
    {
      id: 'logic', title: '认出原因、转折和结果', pattern: 'because / although / so / but',
      goal: '两个小句各读懂后，再判断它们是因果还是转折。',
      reminder: '英语一般不照搬中文的“虽然……但是……”双标记：Although A, B；也可 A, but B。',
      words: [['because','因为'],['although','虽然'],['so','所以（此处）'],['but','但是'],['busy','忙的'],['reply','回复']],
      examples: [
        e('我很忙，所以稍后回复。','I am busy, so I will reply later.','熟悉的 am 被放进真实消息；要读出忙是稍后回复的原因。', c('I','subject','第一部分主语','我'), c('am','verb','系动词','连接状态'), c('busy,','object','状态','忙'), c('so','modifier','结果标记','所以'), c('I','subject','第二部分主语','我'), c('will reply','verb','第二部分谓语','将回复'), c('later.','modifier','时间','稍后')),
        e('我不能打开文件，因为它太大了。','I can’t open the file.','can’t = cannot；because 后解释打不开的原因，it 指文件。', c('I','subject','谁','我'), c('can’t open','verb','否定动作','无法打开'), c('the file','object','对象','文件'), c('because it is too large.','modifier','原因小句','因为它太大了')),
        e('虽然文件很大，但我可以用这个应用打开它。','I can open it with this app.','although 引出的事实没有阻止主句结果；与 because 的因果关系不同。', c('Although the file is large,','modifier','让步小句','虽然文件很大'), c('I','subject','主句主语','我'), c('can open','verb','主句动作','可以打开'), c('it','object','指代','它＝文件'), c('with this app.','modifier','使用工具','用这个应用'))
      ],
      transfer: { text: 'Although the room is small, it has everything we need.', words: 'everything we need 我们需要的一切（we need 限定 everything）；room 房间。', question: '作者主要想表达什么？', options: ['因为小，所以缺东西','房间很大','虽小，但所需东西齐全'], answer: 2, explain: 'Although 标出让步。主句 it has everything... 才给出完整判断；it 指 room。', translation: '虽然房间很小，但我们需要的东西都有。' }
    },
    {
      id: 'content-clause', title: '把一件事当作“知道的内容”', pattern: 'know / think / see + (that) 小句',
      goal: '看见两个动词时，分清外层“我知道”和内层“它能用”。',
      reminder: '宾语可以是一件完整的事。that 在这里引出内容，不译成“那个”；常可省略。',
      words: [['know','知道'],['think','认为'],['work','起作用；正常运行（此处）'],['that','在此引出内容，常不单译'],['whether','是否'],['available','可用的；有空的'],['method','办法；方法']],
      examples: [
        e('我知道这个应用能正常运行。','I know + 一件事。','内层再读 the app + works。works 在这里不是名词“工作”。', c('I','subject','外层主语','我'), c('know','verb','外层动作','知道'), c('that the app works.','object','知道什么','这个应用能正常运行')),
        e('我认为这个办法对你有用。','I think + 一件事。','think 后省略 that；this method can help you 仍然是内容小句。', c('I','subject','外层主语','我'), c('think','verb','外层动作','认为'), c('this method can help you.','object','所想的内容','这个办法可以帮助你')),
        e('我不知道这个房间明天是否可用。','I don’t know + 是否……。','whether 引出尚未确定的内容；不要把 don’t know 误读成“确定不可用”。', c('I','subject','外层主语','我'), c('don’t know','verb','外层否定','不知道'), c('whether the room is available tomorrow.','object','不知道的内容','房间明天是否可用'))
      ],
      transfer: { text: 'She said the meeting starts at nine.', words: 'said 是 say 的过去式；meeting 会议；at nine 在九点。', question: '哪项正确区分两层内容？', options: ['她说了话；说的内容是会议九点开始','会议说了话；她九点开始','starts 和 said 是同一个动作'], answer: 0, explain: '外层 She said；内层 the meeting starts at nine。省略了 that；现在时可描述仍有效的安排。', translation: '她说会议九点开始。' }
    },
    {
      id: 'relative-clause', title: '名词后的小句说明“哪一个”', pattern: 'the file (that) you sent / people who …',
      goal: '遇到夹在主语中间的小句，保留主语中心，继续等主句动作。',
      reminder: '关系词在定语从句中作宾语时常能省略，如 the file you sent；作主语时通常不能直接省略。',
      words: [['sent','send 的过去式／过去分词'],['useful','有用的'],['who','指人，引出限定说明'],['that','此处引出对名词的限定'],['yesterday','昨天'],['wrote','write 的过去式：写了']],
      examples: [
        e('你发来的文件很有用。','The file is useful.','that you sent 回头限定 file；sent 是从句动作，is 才是主句动词。', c('The file','subject','主语中心','文件'), c('that you sent','modifier','哪个文件','你发来的'), c('is','verb','主句动词','连接状态'), c('useful.','object','状态','有用')),
        e('你昨天发来的文件很有用。','The file is useful.','省略关系词后，you sent yesterday 仍在修饰 file，不是新的主句。', c('The file','subject','主语中心','文件'), c('you sent yesterday','modifier','省略 that 的定语从句','你昨天发来的'), c('is','verb','主句动词','连接状态'), c('useful.','object','状态','有用')),
        e('写这份指南的人在这里工作。','The person works here.','who 在从句里就是 wrote 的主语；整句的主语中心仍是 person。', c('The person','subject','主语中心','这个人'), c('who wrote this guide','modifier','哪个人','写这份指南的'), c('works','verb','主句动词','工作'), c('here.','modifier','地点','这里'))
      ],
      transfer: { text: 'The book I bought last week explains this problem.', words: 'bought 是 buy 买的过去式；last week 上周；explains 解释；problem 问题。', question: '全句的主干是？', options: ['I bought last week','The book explains this problem','The week explains the book'], answer: 1, explain: 'I bought last week 修饰 book，省略的关系词作 bought 的宾语。主句动词是 explains。', translation: '我上周买的那本书解释了这个问题。' }
    },
    {
      id: 'infinitive', title: 'to do 不总是“为了”', pattern: 'want to / use … to / how to',
      goal: '区分动词所需的内容、动作目的和“如何做”的内容块。',
      reminder: 'to + 动词原形是不定式，不单独表示过去或现在；to 后若是名词，则可能是介词，如 to the office。',
      words: [['want to','想要做'],['use … to …','用……来……'],['how to','如何做'],['share','分享'],['show','展示；说明'],['guide','指南']],
      examples: [
        e('我想分享这份文件。','I want to share this file.','to share 补充 want 的内容：想做什么。这里不译成“为了分享，我想”。', c('I','subject','谁','我'), c('want','verb','主句动词','想要'), c('to share this file.','object','想做什么','分享这份文件')),
        e('我用这个应用和团队分享文件。','I use this app.','to share 表示使用应用的目的；with my team 表示与谁分享。', c('I','subject','谁','我'), c('use','verb','主句动词','使用'), c('this app','object','使用什么','这个应用'), c('to share files with my team.','modifier','目的','为了和团队分享文件')),
        e('这份指南向你说明如何安全地分享文件。','This guide shows you + 如何做。','how to share files safely 是 shows 的内容，不是另一个独立的谓语。', c('This guide','subject','什么','这份指南'), c('shows','verb','主句动词','展示；说明'), c('you','object','向谁','向你'), c('how to share files safely.','object','说明什么','如何安全地分享文件'))
      ],
      transfer: { text: 'Use this button to choose where to save the file.', words: 'button 按钮；choose 选择；where to save 保存到哪里。', question: '这条指令让你做什么？', options: ['直接删除文件','选择按钮的颜色','用按钮选择文件保存位置'], answer: 2, explain: 'Use 是祈使句动作；to choose 表示目的；where to save 是 choose 的内容。层次多，但每层很短。', translation: '使用这个按钮选择文件的保存位置。' }
    },
    {
      id: 'participles', title: '-ing / -ed 也能说明“哪一些”', pattern: 'people waiting … / files saved …',
      goal: '区分主句谓语与名词后面的分词修饰。',
      reminder: '没有 be 的 -ing 不自动是进行时；没有助动词的 -ed 也不自动是过去时，要看它在句中的位置和作用。',
      words: [['waiting','wait 等待的 -ing 形式'],['outside','在外面'],['saved','此处：保存的（过去分词修饰）'],['online','在线；联网'],['without','没有；不使用'],['connection','连接']],
      examples: [
        e('在外面等候的人需要帮助。','The people need help.','waiting outside 修饰 people，表示他们在等；need 才是主句动词。', c('The people','subject','主语中心','这些人'), c('waiting outside','modifier','-ing 修饰','在外面等候的'), c('need','verb','主句动词','需要'), c('help.','object','需要什么','帮助')),
        e('保存在这里的文件可以离线使用。','Files are available offline.','saved here 修饰 Files，说明是哪些文件；are available 表示可用状态。', c('Files','subject','主语中心','文件'), c('saved here','modifier','过去分词修饰','保存在这里的'), c('are','verb','主句系动词','连接状态'), c('available offline.','object','状态','离线可用')),
        e('只保存在网上的文件，没有网络连接就无法打开。','Files cannot be opened without an internet connection.','saved 只是主语里的修饰；cannot be opened 才是完整谓语。only 和 without 都不能漏读。', c('Files','subject','主语中心','文件'), c('saved only online','modifier','限定范围','只在线保存的'), c('cannot be opened','verb','否定被动','无法被打开'), c('without an internet connection.','modifier','必要条件','没有网络连接时'))
      ],
      transfer: { text: 'The photos taken yesterday are ready to download.', words: 'taken 是 take 的过去分词；take photos 拍照；ready to download 可以下载。', question: '哪项是主句的判断？', options: ['照片可以下载了','照片正在拍摄中','昨天准备拍照片'], answer: 0, explain: 'taken yesterday 限定 photos；are ready 说明照片现在的状态，不是 are taken。', translation: '昨天拍的照片可以下载了。' }
    },
    {
      id: 'whole-action', title: '把“做一件事”整体当主角', pattern: 'It is … to do / Doing … helps …',
      goal: '读懂不以具体人物为主角的说明句，不强行套“某人做某物”。',
      reminder: '形式主语 it 不指某个物体。-ing 短语也能作主语，表示“做某事”这件事。',
      words: [['important','重要的'],['keep','保留；保持'],['copy','副本'],['reading','阅读这件事（本课）'],['help','有助于'],['avoid','避免']],
      examples: [
        e('保留一个副本很重要。','It is important + 要评价的事情。','it 先占主语位置，真正被评价的是 to keep a copy。', c('It','subject','形式主语','占位置，不译成“它”'), c('is','verb','系动词','连接评价'), c('important','object','评价','重要'), c('to keep a copy.','modifier','实际被评价的事情','保留一个副本')),
        e('读例句有助于我理解规则。','Reading examples helps me understand the rule.','Reading examples 整体作主语；helps 是主句动词；help 后可接人＋动词原形。', c('Reading examples','subject','哪件事','阅读例句'), c('helps','verb','带来什么作用','帮助'), c('me understand the rule.','object','帮助谁做什么','帮助我理解规则')),
        e('在更改任何内容之前检查设置，可以帮助你避免问题。','Checking the settings can help you avoid problems.','主语内部包含 before 时间块，读完它还要继续找 can help。', c('Checking the settings','subject','主语中心','检查设置这件事'), c('before you change anything','modifier','何时检查','在更改任何内容之前'), c('can help','verb','主句谓语','能够帮助'), c('you avoid problems.','object','作用','帮助你避免问题'))
      ],
      transfer: { text: 'It is easier to find a file when you give it a clear name.', words: 'easier 更容易；give it a clear name 给它一个清楚易懂的名称。', question: '什么会变得更容易？', options: ['给人起名字','找到文件','删除所有名称'], answer: 1, explain: '真正被评价的是 to find a file；when 引出有利条件，it 在 give it 中则指 file。同一个 it 不一定同一种用法。', translation: '给文件起一个清楚易懂的名称后，找起来就更容易。' }
    },
    {
      id: 'combine', title: '把学过的块装回完整消息', pattern: '主干 + 哪一个 + 条件／时间',
      goal: '长句不是新的一整条规则，而是几种熟悉关系的组合。',
      reminder: '分块是暂时减轻负担，不是删掉细节。最后要说清对象、动作、条件、否定和指代。',
      words: [['guide','指南'],['explains','说明；解释'],['setting','设置项'],['restart','重新启动'],['once','在这里：一旦；……之后'],['take effect','生效']],
      examples: [
        e('这份指南解释了如何更改设置。','The guide explains + 如何做。','先读外层 guide + explains；再读解释的内容 how to change the settings。', c('The guide','subject','主语','指南'), c('explains','verb','主句动词','解释'), c('how to change the settings.','object','解释什么','如何更改设置')),
        e('你昨天发给我的指南解释了如何更改设置。','The guide explains how to change the settings.','you sent me yesterday 回头限定 guide；它不改变后面的主句动作 explains。', c('The guide','subject','主语中心','指南'), c('you sent me yesterday','modifier','哪份指南','你昨天发给我的'), c('explains','verb','主句动词','解释'), c('how to change the settings.','object','解释什么','如何更改设置')),
        e('按照你昨天发给我的指南操作之后，我现在知道如何更改设置了。','I now know how to change the settings.','外层 After 时间块中又有 you sent me yesterday；括号内读完，回到 I now know。', c('After I followed the guide','modifier','时间块的起点','在我按照指南操作之后'), c('you sent me yesterday,','modifier','时间块内部：哪份指南','你昨天发给我的指南'), c('I','subject','主句主语','我'), c('now know','verb','主句谓语','现在知道'), c('how to change the settings.','object','知道什么','如何更改设置'))
      ],
      transfer: { text: 'The settings you changed will take effect once you restart the app.', words: 'take effect 生效；once 在此引出时间条件；restart 重新启动。', question: '设置什么时候生效？', options: ['只要读完指南就生效','更改之前已经生效','重新启动应用之后'], answer: 2, explain: '主干 settings will take effect；you changed 限定 settings；once you restart the app 给出生效的时间条件。', translation: '一旦重新启动应用，你更改的设置就会生效。' }
    }
  ];
})();
