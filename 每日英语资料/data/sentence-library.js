(() => {
  const scenarios = [
    ['Students','学生们','improve','improves','improved','improved','improving','their language skills','语言能力','提高'],
    ['Teachers','教师们','explain','explains','explained','explained','explaining','the key rules','关键规则','讲解'],
    ['Researchers','研究人员','collect','collects','collected','collected','collecting','reliable data','可靠数据','收集'],
    ['Volunteers','志愿者们','support','supports','supported','supported','supporting','local families','当地家庭','帮助'],
    ['Companies','企业','provide','provides','provided','provided','providing','practical training','实用培训','提供'],
    ['Doctors','医生们','recommend','recommends','recommended','recommended','recommending','regular exercise','规律运动','推荐'],
    ['Parents','家长们','encourage','encourages','encouraged','encouraged','encouraging','their children','自己的孩子','鼓励'],
    ['Workers','工作人员','follow','follows','followed','followed','following','the safety instructions','安全说明','遵守'],
    ['Readers','读者们','compare','compares','compared','compared','comparing','different ideas','不同观点','比较'],
    ['Scientists','科学家们','test','tests','tested','tested','testing','new methods','新方法','测试'],
    ['Governments','政府部门','protect','protects','protected','protected','protecting','natural resources','自然资源','保护'],
    ['Libraries','图书馆','offer','offers','offered','offered','offering','online services','线上服务','提供'],
    ['Communities','社区','reduce','reduces','reduced','reduced','reducing','household waste','生活垃圾','减少'],
    ['Managers','管理人员','review','reviews','reviewed','reviewed','reviewing','weekly reports','每周报告','审查'],
    ['Farmers','农民们','grow','grows','grew','grown','growing','healthy crops','健康作物','种植'],
    ['Engineers','工程师们','solve','solves','solved','solved','solving','technical problems','技术问题','解决'],
    ['Travelers','旅行者们','plan','plans','planned','planned','planning','their journeys','自己的行程','规划'],
    ['Customers','顾客们','choose','chooses','chose','chosen','choosing','suitable products','合适的产品','选择'],
    ['Teams','团队','complete','completes','completed','completed','completing','important projects','重要项目','完成'],
    ['Schools','学校','organize','organizes','organized','organized','organizing','learning activities','学习活动','组织'],
    ['Candidates','考生们','analyze','analyzes','analyzed','analyzed','analyzing','exam questions','考试题目','分析'],
    ['Learners','学习者们','apply','applies','applied','applied','applying','useful strategies','实用策略','运用'],
    ['Drivers','驾驶者们','avoid','avoids','avoided','avoided','avoiding','unnecessary risks','不必要的风险','避免'],
    ['Reviewers','审阅者们','check','checks','checked','checked','checking','important details','重要细节','检查'],
    ['Editors','编辑们','correct','corrects','corrected','corrected','correcting','common mistakes','常见错误','改正'],
    ['Designers','设计人员','create','creates','created','created','creating','practical solutions','实用解决方案','创造'],
    ['Organizations','组织机构','develop','develops','developed','developed','developing','new services','新服务','开发'],
    ['Coaches','教练们','encourage','encourages','encouraged','encouraged','encouraging','young players','年轻队员','鼓励'],
    ['Experts','专家们','evaluate','evaluates','evaluated','evaluated','evaluating','possible results','可能的结果','评估'],
    ['Speakers','发言者们','express','expresses','expressed','expressed','expressing','their opinions','自己的观点','表达'],
    ['Readers','读者们','identify','identifies','identified','identified','identifying','the main idea','主旨','识别'],
    ['Programs','课程项目','include','includes','included','included','including','several modules','多个模块','包括'],
    ['New policies','新政策','influence','influences','influenced','influenced','influencing','daily life','日常生活','影响'],
    ['Leaders','负责人们','manage','manages','managed','managed','managing','limited resources','有限资源','管理'],
    ['Machines','机器','measure','measures','measured','measured','measuring','small changes','细微变化','测量'],
    ['Observers','观察者们','notice','notices','noticed','noticed','noticing','unusual behavior','异常行为','注意到'],
    ['Health workers','医务工作者','prevent','prevents','prevented','prevented','preventing','common diseases','常见疾病','预防'],
    ['Factories','工厂','produce','produces','produced','produced','producing','useful goods','有用商品','生产'],
    ['Teachers','教师们','recognize','recognizes','recognized','recognized','recognizing','individual needs','个体需求','识别'],
    ['Students','学生们','remember','remembers','remembered','remembered','remembering','key information','关键信息','记住'],
    ['Experts','专家们','select','selects','selected','selected','selecting','reliable sources','可靠来源','选择'],
    ['Group members','小组成员','share','shares','shared','shared','sharing','useful knowledge','有用知识','分享'],
    ['Families','家庭','use','uses','used','used','using','public services','公共服务','使用'],
    ['Citizens','公民们','discuss','discusses','discussed','discussed','discussing','social issues','社会问题','讨论'],
    ['Explorers','探索者们','discover','discovers','discovered','discovered','discovering','new places','新地点','发现'],
    ['Committees','委员会','establish','establishes','established','established','establishing','clear standards','明确标准','建立'],
    ['Doctors','医生们','examine','examines','examined','examined','examining','their patients','自己的病人','检查'],
    ['Employers','雇主们','expect','expects','expected','expected','expecting','better performance','更好的表现','期待'],
    ['Workers','工作人员','maintain','maintains','maintained','maintained','maintaining','high quality','高质量','保持'],
    ['Technicians','技术人员','replace','replaces','replaced','replaced','replacing','damaged parts','损坏的部件','替换'],
    ['Writers','写作者们','describe','describes','described','described','describing','personal experiences','个人经历','描述'],
    ['Officers','工作人员','confirm','confirms','confirmed','confirmed','confirming','important facts','重要事实','确认'],
    ['Digital tools','数字工具','connect','connects','connected','connected','connecting','different users','不同用户','连接'],
    ['Schools','学校','continue','continues','continued','continued','continuing','educational programs','教育项目','继续开展'],
    ['Parents','家长们','control','controls','controlled','controlled','controlling','screen time','屏幕使用时间','控制'],
    ['Researchers','研究人员','compare','compares','compared','compared','comparing','different results','不同结果','比较'],
    ['Customers','顾客们','consider','considers','considered','considered','considering','available options','可用选项','考虑'],
    ['Students','学生们','understand','understands','understood','understood','understanding','complex ideas','复杂观点','理解'],
    ['Volunteers','志愿者们','prepare','prepares','prepared','prepared','preparing','emergency supplies','应急物资','准备'],
    ['Scientists','科学家们','record','records','recorded','recorded','recording','careful observations','仔细的观察记录','记录']
  ].map(([subject, cnSubject, base, third, past, participle, ing, object, cnObject, cnVerb]) => ({
    subject, cnSubject, base, third, past, participle, ing, object, cnObject, cnVerb,
    forms: { base, third, past, participle, ing }
  }));

  const chunk = (text, type, role, explain, tip) => ({ text, type, role, explain, tip });
  const subjectChunk = s => chunk(s.subject, 'subject', '主语｜谁 / 什么', `全句谈论的是 ${s.subject}。`, '先找到动作发出者，再向后寻找完整谓语。');
  const verbChunk = (text, explain) => chunk(text, 'verb', '谓语｜发生什么', explain, '谓语带有时态或情态，是句子的发动机。');
  const objectChunk = s => chunk(s.object, 'object', '宾语｜动作对象', `${s.object} 是动作直接涉及的对象。`, '在及物动词后问“什么 / 谁”，常能找到宾语。');
  const modifierChunk = (text, role, explain) => chunk(text, 'modifier', role, explain, '先拿掉修饰语看主干，再把细节补回来。');
  const verbWord = (s, display, grammar, role) => ({
    display, lemma: s.base, kind: 'verb', pos: '核心动词', meaning: `${s.cnVerb}；${s.cnVerb}${s.cnObject}`,
    grammar, role, tip: `先记 ${s.base}—${s.past}—${s.participle}，再放回句子判断时态。`, forms: s.forms
  });
  const pronounThey = {
    display: 'they', lemma: 'they', kind: 'pronoun', pronoun: 'they', pos: '人称代词·主格', meaning: '他们；它们',
    role: '代替前文的复数主语，避免重复。', tip: 'they 是主格；动词或介词后使用宾格 them。'
  };
  const functionWord = (display, meaning, role) => ({
    display, lemma: display.toLowerCase(), kind: 'function', pos: '逻辑词', meaning, role,
    tip: '看到逻辑词先判断它连接的是原因、转折、条件还是时间。'
  });
  const finish = (s, category, chunks, translation, plain, words, imitate) => {
    const text = chunks.map(item => item.text).join(' ') + (chunks.at(-1).text.endsWith('?') ? '' : '.');
    return {
      category,
      source: `广东专升本核心语法仿真 · ${category}`,
      chunks,
      translation,
      plain,
      imitate: imitate || text,
      words: words.map(item => ({ ...item, context: text }))
    };
  };

  const patterns = [
    s => finish(s, '基础句型', [subjectChunk(s), verbChunk(s.base, `${s.base} 是一般现在时谓语，表示经常发生的动作。`), objectChunk(s), modifierChunk('every day','频率｜多久一次','every day 表示日常习惯。')], `${s.cnSubject}每天${s.cnVerb}${s.cnObject}。`, `主干：${s.subject} — ${s.base} — ${s.object}。`, [verbWord(s,s.base,'一般现在时','全句谓语，表达习惯或事实。')]),
    s => finish(s, '基础句型', [subjectChunk(s), verbChunk(s.past, `${s.past} 是过去式，动作发生在过去。`), objectChunk(s), modifierChunk('yesterday','时间｜什么时候','yesterday 把动作定位在过去。')], `${s.cnSubject}昨天${s.cnVerb}了${s.cnObject}。`, `主干不变，过去式 ${s.past} 负责标记过去时间。`, [verbWord(s,s.past,'一般过去时','表示过去已经发生的动作。')]),
    s => finish(s, '核心时态', [subjectChunk(s), verbChunk(`are ${s.ing}`, `are + ${s.ing} 构成现在进行时。`), objectChunk(s), modifierChunk('now','时间｜正在何时','now 强化“正在发生”。')], `${s.cnSubject}现在正在${s.cnVerb}${s.cnObject}。`, `主干：${s.subject} — are ${s.ing} — ${s.object}。`, [verbWord(s,`are ${s.ing}`,'现在进行时','表示此刻正在进行。')]),
    s => finish(s, '核心时态', [subjectChunk(s), verbChunk(`have ${s.participle}`, `have + ${s.participle} 构成现在完成时。`), objectChunk(s), modifierChunk('recently','时间｜最近','recently 常与完成时搭配。')], `${s.cnSubject}最近已经${s.cnVerb}了${s.cnObject}。`, `have + 过去分词强调已经完成并与现在有关。`, [verbWord(s,`have ${s.participle}`,'现在完成时','表示已经完成且影响现在。')]),
    s => finish(s, '核心时态', [subjectChunk(s), verbChunk(`will ${s.base}`, `will + 原形表示将来。`), objectChunk(s), modifierChunk('next week','时间｜什么时候','next week 指向未来。')], `${s.cnSubject}下周将${s.cnVerb}${s.cnObject}。`, `will 后永远接动词原形。`, [verbWord(s,`will ${s.base}`,'一般将来时','表示未来计划或预测。')]),
    s => finish(s, '被动与情态', [chunk(s.object,'subject','主语｜动作承受者',`${s.object} 被提前成为被动句主语。`,'被动句先找“什么被做了”。'), verbChunk(`are ${s.participle}`, `are + ${s.participle} 是一般现在时被动。`), modifierChunk(`by ${s.subject}`,'施动者｜由谁完成',`by 后说明动作由 ${s.subject} 完成。`)], `${s.cnObject}由${s.cnSubject}${s.cnVerb}。`, `被动主干：${s.object} — are ${s.participle}。`, [verbWord(s,`are ${s.participle}`,'一般现在时·被动语态','主语承受动作。')]),
    s => finish(s, '被动与情态', [subjectChunk(s), verbChunk(`should ${s.base}`, `should + 原形表示“应该”。`), objectChunk(s), modifierChunk('carefully','方式｜怎样做','carefully 表示认真、谨慎地完成动作。')], `${s.cnSubject}应该认真地${s.cnVerb}${s.cnObject}。`, `情态动词 should 后直接接原形 ${s.base}。`, [verbWord(s,`should ${s.base}`,'情态动词 + 原形','表示建议或责任。')]),
    s => finish(s, '被动与情态', [subjectChunk(s), verbChunk(`can ${s.base}`, `can + 原形表示能力或可能。`), objectChunk(s), modifierChunk('more effectively','方式｜达到什么程度','more effectively 表示“更有效地”。')], `${s.cnSubject}可以更有效地${s.cnVerb}${s.cnObject}。`, `can 不随人称变化，后接动词原形。`, [verbWord(s,`can ${s.base}`,'情态动词 + 原形','表示能力或可能性。')]),
    s => finish(s, '基础句型', [subjectChunk(s), verbChunk(`do not ${s.base}`, `do not + 原形构成一般现在时否定。`), objectChunk(s), modifierChunk('without a clear plan','条件｜在什么情况下','without 表示“没有”。')], `${s.cnSubject}不会在没有清晰计划的情况下${s.cnVerb}${s.cnObject}。`, `否定信息由 do not 承担，实义动词回到原形。`, [verbWord(s,`do not ${s.base}`,'一般现在时·否定','do not 承担否定，后接原形。')]),
    s => finish(s, '基础句型', [verbChunk(`Do ${s.subject.toLowerCase()} ${s.base}`, 'Do 放在句首构成一般疑问句。'), chunk(`${s.object}?`,'object','宾语｜询问的对象',`问题询问是否${s.cnVerb}${s.cnObject}。`,'一般疑问句先回答 Yes 或 No。')], `${s.cnSubject}会${s.cnVerb}${s.cnObject}吗？`, `疑问结构：Do + 主语 + 动词原形 + 宾语？`, [verbWord(s,`do ... ${s.base}`,'一般现在时·疑问','Do 提到句首，实义动词使用原形。')]),
    s => finish(s, '逻辑从句', [modifierChunk(`Because ${s.subject.toLowerCase()} ${s.base} ${s.object}`,'原因｜为什么',`Because 引出原因：${s.cnSubject}${s.cnVerb}${s.cnObject}。`), chunk('the final result','subject','主语｜什么','主句谈论最终结果。','逗号后重新找主句主语。'), verbChunk('improves','谓语说明结果变得更好。')], `因为${s.cnSubject}${s.cnVerb}${s.cnObject}，最终结果得到了改善。`, `Because 从句是原因；逗号后的 the final result improves 才是主句。`, [functionWord('because','因为','引出原因从句。'), verbWord(s,s.base,'一般现在时','原因从句的谓语。')]),
    s => finish(s, '逻辑从句', [modifierChunk(`Although ${s.subject.toLowerCase()} ${s.base} ${s.object}`,'让步｜虽然什么','Although 引出让步信息。'), chunk('some challenges','subject','主语｜什么','主句谈论仍然存在的挑战。','转折后重新找主句主干。'), verbChunk('remain','remain 表示某种情况继续存在。')], `虽然${s.cnSubject}${s.cnVerb}${s.cnObject}，但一些挑战仍然存在。`, `Although 表示“虽然”，英语中通常不再加 but。`, [functionWord('although','虽然；尽管','引出让步从句。'), verbWord(s,s.base,'一般现在时','让步从句的谓语。')]),
    s => finish(s, '逻辑从句', [modifierChunk(`If ${s.subject.toLowerCase()} ${s.base} ${s.object}`,'条件｜如果什么','If 引出可能发生的条件。'), chunk('the situation','subject','主语｜什么','主句谈论整体情况。','逗号后是结果主句。'), verbChunk('will improve','will improve 表示条件实现后的结果。')], `如果${s.cnSubject}${s.cnVerb}${s.cnObject}，情况就会改善。`, `If 从句用一般现在时，主句用 will 表示将来结果。`, [functionWord('if','如果','引出条件。'), verbWord(s,s.base,'条件从句·一般现在时','条件从句通常不用 will。')]),
    s => finish(s, '逻辑从句', [modifierChunk(`When ${s.subject.toLowerCase()} ${s.base} ${s.object}`,'时间｜当什么时候','When 引出动作发生的时间背景。'), chunk('they','subject','代词主语｜谁','they 指代前面的复数主语。','代词帮助避免重复。'), verbChunk('learn from experience','主句说明他们从经验中学习。')], `当${s.cnSubject}${s.cnVerb}${s.cnObject}时，他们会从经验中学习。`, `When 从句交代时间；they learn... 是主句。`, [functionWord('when','当……时','引出时间从句。'), verbWord(s,s.base,'一般现在时','时间从句的谓语。'), pronounThey]),
    s => finish(s, '定语从句', [subjectChunk(s), verbChunk(s.base, `${s.base} 是主句谓语。`), chunk(`${s.object} that people need`,'object','宾语 + 定语从句',`that people need 修饰 ${s.object}，说明是哪一种。`,'名词后的 that 从句常先译成“……的”。')], `${s.cnSubject}${s.cnVerb}人们需要的${s.cnObject}。`, `主干到 ${s.object} 已完整；that 后面只负责限定宾语。`, [verbWord(s,s.base,'一般现在时','主句谓语。'), functionWord('that','……的；那个','引出定语从句，修饰前面的名词。')]),
    s => finish(s, '非谓语结构', [subjectChunk(s), verbChunk(s.base, `${s.base} 是全句有时态的谓语。`), objectChunk(s), modifierChunk('to achieve a better result','目的｜为了什么','to achieve 表示动作目的。')], `${s.cnSubject}${s.cnVerb}${s.cnObject}，以取得更好的结果。`, `to achieve 没有时态，表示“为了取得”。`, [verbWord(s,s.base,'一般现在时','全句谓语。'), {display:'to achieve',lemma:'achieve',kind:'verb',pos:'不定式',meaning:'为了实现',grammar:'to + 动词原形',role:'表示目的，不承担全句时态。',tip:'to do 常表示目的、计划或待做事项。',forms:{base:'achieve',third:'achieves',past:'achieved',participle:'achieved',ing:'achieving'}}]),
    s => finish(s, '非谓语结构', [modifierChunk(`By ${s.ing} ${s.object}`,'方式｜通过什么','By + doing 表示“通过做某事”。'), chunk('they','subject','代词主语｜谁','they 指代前面的复数行动者。','they 作主语，宾格形式是 them。'), verbChunk('gain useful experience','主句谓语表示获得经验。')], `通过${s.cnVerb}${s.cnObject}，${s.cnSubject}获得了有用经验。`, `By 后面的动词使用 -ing；主句是 they gain useful experience。`, [verbWord(s,s.ing,'介词 + doing','By 后使用动名词形式。'), pronounThey, functionWord('by','通过','引出方式。')]),
    s => finish(s, '非谓语结构', [chunk('It','subject','形式主语｜先占位置','It 不指具体事物，只占据主语位置。','真正内容在后面的 to do。'), verbChunk('is important','系动词 + 表语说明重要性。'), modifierChunk(`for ${s.subject.toLowerCase()} to ${s.base} ${s.object}`,'真正内容｜什么重要',`真正重要的是${s.cnSubject}${s.cnVerb}${s.cnObject}。`)], `对${s.cnSubject}来说，${s.cnVerb}${s.cnObject}很重要。`, `It is important for somebody to do something 是高频评价句型。`, [{display:'It',lemma:'it',kind:'pronoun',pronoun:'it',pos:'形式主语',meaning:'不具体翻译',role:'先占据主语位置。',tip:'中文翻译时通常把后面的 to do 提到前面。'}, verbWord(s,`to ${s.base}`,'to + 动词原形','真正内容中的不定式。')]),
    s => finish(s, '比较与程度', [subjectChunk(s), verbChunk(s.base, `${s.base} 是主句谓语。`), objectChunk(s), modifierChunk('more carefully than before','比较｜比以前怎样','than before 建立与过去的比较。')], `${s.cnSubject}比以前更认真地${s.cnVerb}${s.cnObject}。`, `more carefully 是比较级，than 引出比较对象。`, [verbWord(s,s.base,'一般现在时','主句谓语。'), functionWord('than','比','引出比较对象。')]),
    s => finish(s, '比较与程度', [subjectChunk(s), verbChunk('have enough time','谓语说明拥有足够时间。'), modifierChunk(`to ${s.base} ${s.object} carefully`,'结果｜足以做什么','enough time to do 表示时间足够完成某事。')], `${s.cnSubject}有足够的时间认真${s.cnVerb}${s.cnObject}。`, `enough + 名词 + to do：有足够的……去做……。`, [verbWord(s,`to ${s.base}`,'to + 动词原形','说明足够时间可以用来做什么。')]),
    s => finish(s, '强调结构', [subjectChunk(s), verbChunk(`not only ${s.base}`, 'not only 标出第一项动作。'), objectChunk(s), modifierChunk('but also improve the final result','递进｜而且怎样','but also 补充更进一步的结果。')], `${s.cnSubject}不仅${s.cnVerb}${s.cnObject}，还改善了最终结果。`, `not only ... but also ... 表示“不仅……而且……”。`, [verbWord(s,s.base,'一般现在时','not only 后的第一个谓语。'), functionWord('not only','不仅','与 but also 构成递进结构。')]),
    s => finish(s, '被动与情态', [subjectChunk(s), verbChunk(`are expected to ${s.base}`, `are expected to do 表示“被期望 / 应当做”。`), objectChunk(s)], `人们期望${s.cnSubject}${s.cnVerb}${s.cnObject}。`, `be expected to do 是考试中常见的被动搭配。`, [verbWord(s,`are expected to ${s.base}`,'被动结构 + 不定式','表示被期待做某事。')]),
    s => finish(s, '比较与程度', [modifierChunk(`The more carefully ${s.subject.toLowerCase()} ${s.base} ${s.object}`,'条件比较｜越怎样','the more... 表示程度不断增加。'), chunk('the better the result','subject','对应结果｜就越怎样','第二个 the better 给出随之变化的结果。','两个 the 比较级要成对识别。'), verbChunk('will be','系动词连接 result 和 better。')], `${s.cnSubject}越认真地${s.cnVerb}${s.cnObject}，结果就会越好。`, `The more..., the better... = 越……，就越……。`, [verbWord(s,s.base,'一般现在时','比较条件部分的谓语。'), functionWord('the more','越……','与 the better 构成对应变化。')]),
    s => finish(s, '逻辑从句', [subjectChunk(s), verbChunk(`will continue to ${s.base}`, 'will continue to do 表示将继续做。'), objectChunk(s), modifierChunk('unless conditions change','条件｜除非什么','unless = if not，表示否定条件。')], `除非条件发生变化，否则${s.cnSubject}将继续${s.cnVerb}${s.cnObject}。`, `unless conditions change 是条件从句；主句表示将继续。`, [verbWord(s,`will continue to ${s.base}`,'将来时 + 不定式','表示未来继续进行。'), functionWord('unless','除非；如果不','引出否定条件。')]),
    s => finish(s, '核心时态', [modifierChunk(`After ${s.subject.toLowerCase()} have ${s.participle} ${s.object}`,'时间｜完成之后','After 引出先完成的动作。'), chunk('they','subject','代词主语｜谁','they 指代前面的复数主语。','逗号后重新找主句。'), verbChunk('review the result','主句说明完成后再检查结果。')], `${s.cnSubject}${s.cnVerb}完${s.cnObject}后，会检查结果。`, `After 从句先发生；they review the result 是后续动作。`, [verbWord(s,`have ${s.participle}`,'现在完成时','表示动作已经完成。'), pronounThey, functionWord('after','在……之后','引出时间先后关系。')])
  ];

  window.SENTENCE_LIBRARY = scenarios.flatMap(scenario => patterns.map(pattern => pattern(scenario)));
})();
