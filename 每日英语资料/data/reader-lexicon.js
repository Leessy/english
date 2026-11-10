/* 随文提示的人工整理词库。一般词义不冒充本句词义；语境提示由材料单独提供。 */
(() => {
  // 配套词条的 pattern 有些只解释它自己的例句，不能当作每个新句的语法结论。
  const words = Object.fromEntries((window.READING_VOCABULARY || []).map(item => [item.word, {...item, note:''}]));
  const irregular = [
    ['be','is','was / were','been','being','是；处于；助动词'],
    ['have','has','had','had','having','有；完成时助动词'],
    ['do','does','did','done','doing','做；疑问或否定助动词'],
    ['go','goes','went','gone','going','去'],['come','comes','came','come','coming','来'],
    ['get','gets','got','got / gotten','getting','得到；到达；变得'],['make','makes','made','made','making','制作；使'],
    ['take','takes','took','taken','taking','拿；带；花费'],['give','gives','gave','given','giving','给'],
    ['find','finds','found','found','finding','找到；发现'],['think','thinks','thought','thought','thinking','认为；思考'],
    ['know','knows','knew','known','knowing','知道；了解'],['say','says','said','said','saying','说'],
    ['tell','tells','told','told','telling','告诉；讲述'],['see','sees','saw','seen','seeing','看见；明白'],
    ['read','reads','read','read','reading','阅读'],['write','writes','wrote','written','writing','写'],
    ['send','sends','sent','sent','sending','发送'],['buy','buys','bought','bought','buying','买'],
    ['bring','brings','brought','brought','bringing','带来'],['leave','leaves','left','left','leaving','离开；留下'],
    ['meet','meets','met','met','meeting','见面；满足'],['feel','feels','felt','felt','feeling','感觉'],
    ['keep','keeps','kept','kept','keeping','保持；保留'],['put','puts','put','put','putting','放'],
    ['let','lets','let','let','letting','让；允许'],['set','sets','set','set','setting','设置；放置'],
    ['run','runs','ran','run','running','跑；运行'],['sit','sits','sat','sat','sitting','坐'],
    ['stand','stands','stood','stood','standing','站立'],['speak','speaks','spoke','spoken','speaking','说话'],
    ['eat','eats','ate','eaten','eating','吃'],['drink','drinks','drank','drunk','drinking','喝'],
    ['sleep','sleeps','slept','slept','sleeping','睡觉'],['hear','hears','heard','heard','hearing','听见'],
    ['lose','loses','lost','lost','losing','丢失；失去'],['win','wins','won','won','winning','赢'],
    ['pay','pays','paid','paid','paying','支付'],['spend','spends','spent','spent','spending','花费；度过'],
    ['build','builds','built','built','building','建造'],['begin','begins','began','begun','beginning','开始'],
    ['choose','chooses','chose','chosen','choosing','选择'],['break','breaks','broke','broken','breaking','打破；损坏'],
    ['forget','forgets','forgot','forgotten','forgetting','忘记'],['learn','learns','learned / learnt','learned / learnt','learning','学习'],
    ['understand','understands','understood','understood','understanding','理解'],['wear','wears','wore','worn','wearing','穿；戴'],
    ['drive','drives','drove','driven','driving','驾驶'],['hold','holds','held','held','holding','拿着；举行'],
    ['catch','catches','caught','caught','catching','赶上；抓住'],['teach','teaches','taught','taught','teaching','教'],
    ['sell','sells','sold','sold','selling','出售'],['show','shows','showed','shown / showed','showing','展示；说明'],
    ['mean','means','meant','meant','meaning','意味着；意思是'],['become','becomes','became','become','becoming','变成'],
    ['cut','cuts','cut','cut','cutting','切；削减'],['cost','costs','cost','cost','costing','价钱为；使付出'],
    ['grow','grows','grew','grown','growing','生长；增加'],['fall','falls','fell','fallen','falling','落下；跌倒']
  ];
  for (const [base, third, past, participle, ing, meaning] of irregular) {
    words[base] = {...words[base], word:base, pos:'v.', meaning:words[base]?.meaning || meaning, forms:{base,third,past,participle,ing}};
  }
  const regular = {
    need:'需要',want:'想要',use:'使用',work:'工作；起作用',help:'帮助',check:'检查；核对',save:'保存；节省',seem:'似乎',allow:'允许',change:'更改',open:'打开',ask:'问；请求',
    call:'打电话；称呼',close:'关闭',share:'分享；共用',explain:'解释；说明',reply:'回复',print:'打印',arrive:'到达',restart:'重新启动',wait:'等待',follow:'按照；跟随',
    book:'预订',cook:'烹饪',delete:'删除',try:'尝试',plan:'计划',stop:'停止',look:'看；看起来',turn:'转向；变成',pick:'挑选；接',return:'归还；返回',
    borrow:'借入',lend:'借出',walk:'步行',carry:'携带',start:'开始',finish:'完成',remember:'记得',download:'下载',upload:'上传',install:'安装',update:'更新',
    accept:'接受',agree:'同意',cancel:'取消',clean:'清洁',connect:'连接',copy:'复制',decide:'决定',depend:'依赖；取决于',enjoy:'享受；喜欢',expect:'预期；期待',
    fix:'修理；解决',happen:'发生',invite:'邀请',join:'加入',listen:'听',live:'居住',load:'加载',move:'移动；搬家',notice:'注意到',offer:'提供',order:'订购',
    prefer:'更喜欢',prepare:'准备',receive:'收到',repeat:'重复',reset:'重置',review:'复习；检查',search:'搜索',stay:'停留；保持',support:'支持',test:'测试',
    travel:'旅行',visit:'拜访',watch:'观看',worry:'担心',avoid:'避免',enter:'进入；输入',include:'包含',complete:'完成',create:'创建',select:'选择',
    thank:'感谢',practice:'练习',miss:'错过；想念',rain:'下雨',answer:'回答',talk:'谈论',collect:'收集',
    back:'备份（back up）；支持；向后移动',sign:'签名；签到／登录（sign in）',like:'喜欢；想要（would like）',guess:'猜测',discuss:'讨论',exchange:'交换',translate:'翻译'
  };
  // 下列词是明确选入的规则动词；不对任意词性猜测五形态。
  const overrides = {lend:['lends','lent','lent','lending'],reset:['resets','reset','reset','resetting'],cancel:['cancels','canceled / cancelled','canceled / cancelled','canceling / cancelling']};
  for (const [base, meaning] of Object.entries(regular)) {
    if (!meaning) continue;
    const y = /[^aeiou]y$/.test(base), doubled = ['plan','stop','prefer'].includes(base);
    const past = base.endsWith('e') ? base+'d' : y ? base.slice(0,-1)+'ied' : base+(doubled?base.at(-1):'')+'ed';
    const ing = base.endsWith('e') && !base.endsWith('ee') ? base.slice(0,-1)+'ing' : base+(doubled?base.at(-1):'')+'ing';
    const third = y ? base.slice(0,-1)+'ies' : /(?:s|sh|ch|x|z|o)$/.test(base)?base+'es':base+'s';
    const f = overrides[base] || [third,past,past,ing];
    words[base] = {...words[base], word:base, pos:'v.', meaning:words[base]?.meaning || meaning, forms:{base,third:f[0],past:f[1],participle:f[2],ing:f[3]}};
  }
  words.be.note = '现在式：I am；he/she/it is；you/we/they are。be 还可帮助构成进行时和被动，不要一律翻成“是”。';
  words.have.note = 'have/has + 过去分词可构成完成时；have + 名词也可表示“有”。不能只凭 have 判断时态。';
  words.do.note = 'do/does/did 可作“做”，也可帮助构成否定或疑问；助动词后用动词原形。';
  words.read.note = 'read 原形读 /riːd/；过去式和过去分词都写 read，但读 /red/。';
  words.get.note = 'get 后的搭配决定意思：get a message 收到消息；get home 到家；get cold 变冷。gotten 常见于美式英语。';
  words.leave.note = 'leave 的过去式和过去分词是 left；left 也可能是形容词“左边的”，要看本句。';
  words.know.note = 'know 在“知道”的状态义下通常不用进行时；knowing 是词形，不表示可以机械套进每一种时态。';
  const pronouns = [
    ['I','me','my','mine','myself','我'],['you','you','your','yours','yourself / yourselves','你；你们'],
    ['he','him','his','his','himself','他'],['she','her','her','hers','herself','她'],
    ['it','it','its','—','itself','它'],['we','us','our','ours','ourselves','我们'],['they','them','their','theirs','themselves','他们；她们；它们']
  ];
  const pronounMeanings = {i:'我',me:'我（宾格）',my:'我的（后接名词）',mine:'我的（独立使用）',you:'你；你们（主格或宾格）',your:'你的；你们的（后接名词）',yours:'你的；你们的（独立使用）',he:'他',him:'他（宾格）',his:'他的（接名词或独立使用）',she:'她',her:'她（宾格）；她的（后接名词）',hers:'她的（独立使用）',it:'它；也可能作形式主语',its:'它的（后接名词，不带撇号）',we:'我们',us:'我们（宾格）',our:'我们的（后接名词）',ours:'我们的（独立使用）',they:'他们；她们；它们',them:'他们／她们／它们（宾格）',their:'他们／她们／它们的（后接名词）',theirs:'他们／她们／它们的（独立使用）'};
  pronouns.forEach((row,index) => row.slice(0,5).forEach(value => value.split(' / ').forEach(form => {
    if (form === '—') return;
    const key = form.toLowerCase();
    words[key] = {word:form, pos:'pron. / det.', meaning:pronounMeanings[key] || row[5]+'自己', pronoun:index,
      note:'先找它指代谁／什么，再看位置。主格常作主语，宾格常在动词或介词后；my/your 等放在名词前，mine/yours 等可独立使用。'};
  })));
  const add = (pos, values) => Object.entries(values).forEach(([word,meaning]) => {
    const existing=words[word];
    words[word]={...existing,word,pos:existing?.forms ? `v./${pos}` : pos,
      meaning:existing?.forms && !meaning.includes(existing.meaning) ? `${existing.meaning}；${meaning}` : meaning};
  });
  add('n.', {
    file:'文件',app:'应用',application:'应用；申请',address:'地址',message:'消息',phone:'电话；手机',friend:'朋友',name:'名字；名称',list:'列表',result:'结果',folder:'文件夹',
    order:'订单；次序；订购',ticket:'票',window:'窗口；窗户',setting:'设置项',connection:'连接',internet:'互联网',room:'房间',method:'方法',meeting:'会议',guide:'指南',
    person:'人',book:'书；预订',problem:'问题',button:'按钮',team:'团队',rule:'规则',example:'例子',photo:'照片',copy:'副本；复制',kitchen:'厨房',owner:'主人；所有者',door:'门',
    work:'工作；起作用',time:'时间；次数',day:'一天；白天',week:'周',weekend:'周末',morning:'早晨',afternoon:'下午',evening:'傍晚；晚上',night:'夜晚',hour:'小时',minute:'分钟',
    home:'家',office:'办公室',shop:'商店',store:'商店；存储',bag:'包',box:'盒子',key:'钥匙；关键',table:'桌子；表格',desk:'书桌；办公桌',seat:'座位',bus:'公共汽车',train:'火车',
    station:'车站',stop:'站点；停止',street:'街道',road:'道路',map:'地图',place:'地方',way:'方式；路',end:'末尾',side:'一边',water:'水',food:'食物',coffee:'咖啡',lunch:'午餐',
    dinner:'晚餐',breakfast:'早餐',bread:'面包',fruit:'水果',milk:'牛奶',rice:'米饭',price:'价格',money:'钱',receipt:'收据',size:'尺寸',color:'颜色',colour:'颜色',pair:'一双；一对',
    shoes:'鞋（复数）',shoe:'鞋',jacket:'夹克',weather:'天气',rain:'雨；下雨',umbrella:'雨伞',plan:'计划',change:'变化；更改',question:'问题；疑问',answer:'答案；回答',
    note:'笔记；便条',screen:'屏幕',account:'账户',password:'密码',email:'电子邮件',link:'链接',website:'网站',page:'页面',browser:'浏览器',computer:'电脑',laptop:'笔记本电脑',
    device:'设备',data:'数据',backup:'备份；备用物',version:'版本',instruction:'指令；说明',step:'步骤',option:'选项',name:'名字；名称',access:'访问权限；进入',
    information:'信息（不可数）',detail:'细节',update:'更新',error:'错误',team:'团队',colleague:'同事',manager:'经理',customer:'顾客',member:'成员',family:'家庭',child:'孩子',
    adult:'成年人',student:'学生',teacher:'老师',lesson:'课程；一课',language:'语言',english:'英语',word:'单词',sentence:'句子',story:'故事',article:'文章',paragraph:'段落',
    meaning:'意思',structure:'结构',grammar:'语法',practice:'练习',habit:'习惯',reason:'原因',idea:'想法',difference:'区别',progress:'进步',mistake:'错误',
    library:'图书馆',notice:'通知；注意到',staff:'全体员工',website:'网站',report:'报告',project:'项目',task:'任务',schedule:'日程',button:'按钮',download:'下载',
    turn:'转弯；轮次',route:'路线',walk:'步行',trip:'短途旅行',journey:'行程',address:'地址',visitor:'来访者',help:'帮助',support:'支持',course:'课程',part:'部分',
    lunch:'午餐',line:'一行；队列',text:'文字；短信',permission:'许可',number:'数字；号码',notification:'通知',appointment:'预约',choice:'选择',customer:'顾客',service:'服务'
  });
  add('adj.', {
    useful:'有用的',important:'重要的',available:'可用的；有空的',ready:'准备好的',clear:'清楚的；易懂的',wrong:'错误的',right:'正确的；右边的',left:'左边的；leave 的过去式／过去分词',
    good:'好的',better:'更好的；更好地',best:'最好的',bad:'坏的',small:'小的',large:'大的',big:'大的',short:'短的',long:'长的',new:'新的',old:'旧的；年老的',
    easy:'容易的',easier:'更容易的',difficult:'困难的',hard:'困难的；硬的',busy:'忙的',free:'免费的；有空的',early:'早的；早地',late:'迟的；迟地',same:'相同的',different:'不同的',
    possible:'可能的',safe:'安全的',slow:'慢的',quick:'快的',simple:'简单的',familiar:'熟悉的',common:'常见的',local:'本地的',original:'原始的',shared:'共享的；share 的过去分词',
    complete:'完成的；完整的',full:'满的；完整的',empty:'空的',quiet:'安静的',comfortable:'舒适的',friendly:'友好的',fresh:'新鲜的',warm:'暖和的',cold:'冷的',wet:'湿的',
    tired:'疲倦的',happy:'高兴的',sure:'确定的',sorry:'抱歉的',welcome:'受欢迎的；欢迎',personal:'个人的',public:'公共的',main:'主要的',final:'最终的',next:'下一个的',last:'上一个的；最后的',
    first:'第一的；首先',second:'第二的；秒',third:'第三的',daily:'每天的',weekly:'每周的',usual:'通常的',necessary:'必要的',regular:'定期的；规则的',broken:'损坏的；break 的过去分词',
    saved:'保存的；save 的过去式／过去分词',open:'开着的；打开',closed:'关着的；close 的过去式／过去分词',extra:'额外的',whole:'整个的',correct:'正确的',own:'自己的'
  });
  add('adv.', {
    now:'现在',then:'然后；当时',later:'稍后',again:'再一次',still:'仍然',already:'已经',yet:'还；尚',only:'只；仅',also:'也',too:'太；也',very:'很；非常',just:'刚刚；只是',
    really:'确实；真正地',almost:'几乎',usually:'通常',often:'经常',sometimes:'有时',always:'总是',never:'从不',once:'一次；曾经；一旦（连词）',twice:'两次',
    here:'这里',there:'那里；there be 中不一定表示地点',outside:'在外面',inside:'在里面',away:'离开；在别处',back:'回到原处',together:'一起',apart:'分开',
    today:'今天',tomorrow:'明天',yesterday:'昨天',tonight:'今晚',automatically:'自动地',safely:'安全地',carefully:'仔细地',quickly:'迅速地',slowly:'缓慢地',
    online:'在线；在网上',offline:'离线',probably:'很可能',perhaps:'也许',instead:'代替；反而',finally:'最后；终于',especially:'尤其',even:'甚至',enough:'足够',
    not:'不；没有',well:'好地；身体好的',soon:'不久',else:'另外；其他',however:'然而',anyway:'无论如何',up:'向上；也常是词块的一部分',down:'向下；也常是词块的一部分'
  });
  add('功能词', {
    a:'一个；不定冠词',an:'一个；不定冠词',the:'特指某人／物，常不单译',this:'这个',that:'那个；也可引出内容从句或定语从句',these:'这些',those:'那些',
    each:'每个',every:'每个',all:'所有；全部',some:'一些',any:'任何；一些（疑问或否定中）',no:'没有',both:'两者都',other:'其他的',another:'另一个',
    much:'许多（常修饰不可数名词）',many:'许多（常修饰可数复数）',more:'更多；更',most:'大多数；最',few:'很少（可数）',little:'少量；小的',several:'几个',such:'这样的',
    one:'一；一个',two:'二',three:'三',four:'四',five:'五',six:'六',seven:'七',eight:'八',nine:'九',ten:'十',half:'一半',
    something:'某事／某物',anything:'任何事物；某事物（疑问中）',everything:'一切',nothing:'没有什么',someone:'某人',anyone:'任何人',everyone:'每个人',nobody:'没有人',
    and:'和；并且',or:'或者；否则',but:'但是',so:'所以；如此',because:'因为',although:'虽然',if:'如果；是否',unless:'除非；如果不',whether:'是否',
    before:'在……之前',after:'在……之后',when:'当……时；何时',while:'当……时；然而',until:'直到',than:'比',as:'作为；像；当……时；由于（依语境）',
    who:'谁；引出对人的限定',which:'哪一个；引出对物的限定',what:'什么；所……的事物',why:'为什么',how:'怎样',where:'哪里',whose:'谁的',
    in:'在……里',on:'在……上；关于；在某日',at:'在某地点／时刻',to:'向；到；不定式标记',of:'……的；属于',for:'为了；给；持续一段时间',from:'从；来自',
    with:'和；用；带有',without:'没有；不使用',by:'由；通过；不迟于',about:'关于；大约',into:'进入……里',out:'向外',over:'在……上方；超过',under:'在……下面',
    between:'在两者之间',through:'穿过；通过',during:'在……期间',since:'自从；因为',off:'离开；关闭（常见于词块）',near:'在……附近',around:'周围；大约',
    can:'能；可以',could:'能够；可以（也用于礼貌请求）',will:'将会；愿意',would:'会；愿意（也用于礼貌表达）',may:'可能；可以',might:'可能',must:'必须；一定',should:'应该',
    please:'请',yes:'是；对',okay:'可以；好的',ok:'可以；好的',hello:'你好',thanks:'谢谢',bye:'再见'
  });
  add('n.',{action:'动作；行动',advance:'提前（in advance）',calendar:'日历',case:'情况；in case 表以防',chapter:'章',effect:'作用；效果',hand:'手；by hand 表手动',mind:'头脑；keep in mind 表记住',person:'人',people:'人们（复数）',woman:'女士；女人',women:'女人们（woman 的复数）',man:'男人',men:'男人们（man 的复数）',child:'孩子',children:'孩子们（child 的复数）',section:'章节；部分',space:'空间',thing:'东西；事情',top:'顶部',year:'年',phrase:'短语；词块',location:'位置',monday:'星期一',tuesday:'星期二',wednesday:'星期三',thursday:'星期四',friday:'星期五',saturday:'星期六',sunday:'星期日'});
  add('adj.',{fine:'不错的；可以的',larger:'更大的（large 的比较级）',latest:'最新的',least:'最少的；at least 表至少',spare:'备用的；多余的',separate:'分开的；单独的',missing:'不见了的；缺失的'});
  add('adv.',{forward:'向前；look forward to 表期待',longer:'更久；no longer 表不再',apart:'分开'});
  add('prep. / conj.',{across:'在……对面；穿过',whenever:'每当；无论何时'});
  words.once.pos='adv./conj.';
  for (const key of ['this','that','these','those']) words[key].note='this/that 常指单数，these/those 常指复数。that 还可引出内容或定语从句，不是每次都译成“那个”。';
  const abbreviations = {
    "don't":['do not','不；没有，助动词后接原形'],"doesn't":['does not','第三人称单数的否定；后接原形'],"didn't":['did not','过去的否定；后接原形'],
    "isn't":['is not','不是；不处于'],"aren't":['are not','不是；不处于'],"wasn't":['was not','过去不是'],"weren't":['were not','过去不是'],
    "haven't":['have not','尚未；也可能表示没有'],"hasn't":['has not','尚未；也可能表示没有'],"hadn't":['had not','此前还没有'],
    "can't":['cannot','不能；无法'],cannot:['can not / cannot','不能；通常写成一个词 cannot'],"couldn't":['could not','不能；无法（常指过去）'],
    "won't":['will not','不会；不愿意，注意不是 willn’t'],"wouldn't":['would not','不会；不愿意'],"shouldn't":['should not','不应该'],"mustn't":['must not','禁止；不许（不是“不必”）'],
    "i'm":['I am','我是／我正在……，看后续内容'],"you're":['you are','你是／你们是'],"we're":['we are','我们是／正在……'],"they're":['they are','他们是／正在……'],
    "it's":['it is / it has','可能是 it is，也可能是 it has；不能和 its（它的）混淆'],"he's":['he is / he has','可能是 he is 或 he has'],"she's":['she is / she has','可能是 she is 或 she has'],
    "that's":['that is / that has','可能是 that is 或 that has'],"there's":['there is / there has','依后面的结构判断'],"what's":['what is / what has','依后面的结构判断'],
    "i've":['I have','I have 的缩写'],"you've":['you have','you have 的缩写'],"we've":['we have','we have 的缩写'],"they've":['they have','they have 的缩写'],
    "i'll":['I will','我将会'],"you'll":['you will','你将会'],"we'll":['we will','我们将会'],"they'll":['they will','他们将会'],"it'll":['it will','它将会'],
    "i'd":['I would / I had','would + 原形；had + 过去分词。也留意 had better 等固定结构'],"you'd":['you would / you had','可能是 would，也可能是 had，结合后文'],"we'd":['we would / we had','可能是 would，也可能是 had，结合后文'],
    "let's":['let us','让我们……，表示建议'],"who's":['who is / who has','不是 whose（谁的）'],
    asap:['as soon as possible','尽快'],fyi:['for your information','供你参考／知悉'],faq:['frequently asked questions','常见问题'],
    id:['identification / identifier','身份证明；标识符，文档中常是唯一标识'],url:['uniform resource locator','网址；统一资源定位符'],
    api:['application programming interface','应用程序接口'],pdf:['portable document format','一种文档格式'],"e.g.":['for example','例如（源自拉丁语缩写）'],"i.e.":['that is','即；也就是说（不是“例如”）']
  };
  Object.entries(abbreviations).forEach(([word,[expansion,meaning]]) => {words[word]={word,pos:'缩写／缩略式',meaning,expansion,note:'先展开理解，再整块认读。存在多个展开形式时，本句提示会在材料有标注时给出。'};});
  const phrases = [
    ['need to','需要做','need to + 动词原形；don’t need to 表示不必，不是禁止。',['needs to','needed to']],
    ['have to','不得不；需要','have to + 原形表示必要性；had to 表示过去需要。',['has to','had to']],
    ['be able to','能够做','后接动词原形；根据主语和时间改变 be。',['am able to','is able to','are able to','was able to','were able to']],
    ['would like to','想要做（礼貌表达）','would like to + 原形，比 want to 更委婉。',["I'd like to","you'd like to","we'd like to","they'd like to"]],
    ['make sure','确保；确认','后接一件要确认的事；不要逐词翻成“制作确定”。',['makes sure','made sure','making sure']],
    ['take effect','生效','更改／规则开始起作用。',['takes effect','took effect','taken effect']],
    ['look for','寻找','look for + 寻找的对象，不等于 look at（看）。',['looks for','looked for','looking for']],
    ['find out','查明；弄清','find out + 信息／原因。',['finds out','found out','finding out']],
    ['turn on','开启','可说 turn it on；代词通常夹在动词与 on 中间。',['turns on','turned on','turning on','turn it on']],
    ['turn off','关闭','可说 turn it off；不是“转离开”。',['turns off','turned off','turning off','turn it off']],
    ['pick up','取；接；捡起','从上下文确定是在取物还是接人。',['picks up','picked up','picking up','pick it up']],
    ['put off','推迟','put off + 名词／doing；代词可放在中间，如 put it off。',['puts off','putting off','put it off','putting it off']],
    ['set up','设置；建立','set 的过去式、过去分词仍是 set。',['sets up','setting up']],
    ['back up','备份','动词词块写 back up；名词常写 backup。',['backs up','backed up','backing up']],
    ['log in','登录','log in to + 系统；log out 退出登录。',['logs in','logged in','logging in']],
    ['sign in','登录；签到','sign in to + 系统。',['signs in','signed in','signing in']],
    ['run out of','用完；耗尽','run out of + 耗尽的东西。',['runs out of','ran out of']],
    ['get back','回来；取回','get back to somebody 常指稍后回复某人。',['gets back','got back','getting back']],
    ['get off','下车；离开','与 get on（上车）对照记。',['gets off','got off','getting off']],
    ['write down','记下','可说 write it down；不是字面上的“向下写”。',['writes down','wrote down','written down','writing down']],
    ['get used to','逐渐习惯','to 在这里是介词，后接名词或 -ing。',['gets used to','got used to','getting used to']],
    ['be used to','习惯于','be used to + 名词／doing；与 be used to do（被用来做）不同，必须看后接形式。',['am used to','is used to','are used to','was used to','were used to']],
    ['used to','过去常常','used to + 原形表示过去的习惯／状态；不能和“习惯于 doing”混淆。'],
    ['look forward to','期待','to 是介词，后接名词或 -ing。',['looking forward to']],
    ['as soon as','一……就……','后接小句；as soon as possible 是“尽快”。'],
    ['as well','也','常放在句末；不是“同样健康”。'],
    ['a few','几个；一些','修饰可数复数，与 few（很少，偏否定）不同。'],
    ['a little','一点','常修饰不可数名词或程度。'],
    ['a lot of','很多','可接可数复数或不可数名词。'],
    ['at least','至少','表示最低数量或最低限度。'],
    ['in advance','提前','表示在事情发生前做好。'],
    ['on time','准时','按照约定的时间；in time 则强调来得及。'],
    ['in time','及时；来得及','赶在太晚之前。'],
    ['right away','马上','相当于 immediately。'],
    ['by mistake','误；无意中','不是刻意做的。'],
    ['instead of','而不是；代替','后接名词、代词或 -ing。'],
    ['because of','由于','后接名词性内容；because 则接小句。'],
    ['depend on','取决于；依靠','on 后说明依赖的条件。',['depends on','depended on']],
    ['ask for','请求；要求','ask for + 想要的东西／帮助。',['asks for','asked for']],
    ['let me know','告诉我；让我知道','let + 人 + 动词原形。'],
    ['how to','如何做','how to + 动词原形可以整体当作内容。'],
    ['where to','在哪里做','where to + 动词原形表示待决定的地点。'],
    ['every day','每天','两个词；everyday 作形容词表示“日常的”。'],
    ['each other','彼此','表示相互的关系。'],
    ['at the moment','此刻；目前','强调当前时间。'],
    ['no longer','不再','曾经有这种情况，现在没有了。'],
    ['so that','以便；为了','常引出目的小句。'],
    ['even if','即使','假设一种情况，结果仍不改变。'],
    ['rather than','而不是','连接两个选择或做法。'],
    ['be supposed to','按安排／要求应当','后接原形；不一定是个人的期望。',['am supposed to','is supposed to','are supposed to','was supposed to']],
    ['take a look','看一下','take a look at + 查看对象。',['took a look','taken a look']],
    ['keep in mind','记住；考虑到','keep in mind + 要记住的事。'],
    ['feel free to','尽管做；请随意','礼貌地表示对方可以放心做某事。'],
    ['in case','以防','引出防备某种情况的理由。'],
    ['by hand','手动；用手','文档里常与 automatically（自动地）对照。'],
    ['at first','起初','指事情开始时，常与后来的改变对照。']
  ].map(([text,meaning,note,aliases=[]]) => ({text,meaning,note,aliases}));
  window.READER_LEXICON = {words,pronouns,phrases};
})();
