(() => {
  const chunk = (text, type, role, explain, tip) => ({ text, type, role, explain, tip });
  const forms = (base, third, past, participle, ing) => ({ base, third, past, participle, ing });
  const verb = (display, lemma, meaning, grammar, role, verbForms) => ({
    display, lemma, kind: 'verb', pos: '核心动词', meaning, grammar, role,
    tip: `先认原形 ${lemma}，再根据助动词和词尾判断本句形式。`, forms: verbForms
  });
  const finish = (category, source, chunks, translation, plain, words, imitate) => ({
    category, source, chunks, translation, plain, imitate,
    words: words.map(item => ({ ...item, context: `${chunks.map(part => part.text).join(' ')}.` }))
  });

  window.EXAM_SENTENCE_LIBRARY = [
    finish('宾语从句', '2014 学位英语阅读试题整理 · 科技与耐心', [
      chunk('Some analysts', 'subject', '主语｜谁', 'Some analysts 是提出观点的人。', '先找到主句主语，不要被后面的长从句拖走。'),
      chunk('suggest', 'verb', '谓语｜提出什么', 'suggest 是主句谓语，后面接完整宾语从句。', 'suggest that... 是阅读题常见观点句。'),
      chunk('that digital technology has increased our desire for instant satisfaction', 'object', '宾语从句｜观点内容', 'that 后面是“科技增加即时满足欲望”这一完整判断。', 'that 后另有主语 technology 和谓语 has increased。')
    ], '一些分析人士认为，数字技术增强了我们追求即时满足的欲望。', '主干：Some analysts suggest + that 宾语从句；从句内部是 technology — has increased — desire。', [
      verb('suggest', 'suggest', '建议；表明；提出', '一般现在时', '主句谓语。', forms('suggest','suggests','suggested','suggested','suggesting')),
      verb('has increased', 'increase', '增加；提高', '现在完成时', '宾语从句的谓语。', forms('increase','increases','increased','increased','increasing'))
    ], 'Some teachers suggest that daily reading has improved students\' vocabulary.'),

    finish('时间从句', '2014 学位英语阅读试题整理 · 科技与耐心', [
      chunk('When that does not happen', 'modifier', '时间 / 条件背景', 'When 引出期待没有实现的情形。', '逗号前先当背景，逗号后再找主句。'),
      chunk('we', 'subject', '主语｜谁', 'we 是主句主语。', 'we 作主格，宾格是 us。'),
      chunk('tend to become', 'verb', '谓语｜往往怎样', 'tend to do 表示“往往会；倾向于”。', '把 tend to do 当成一个高频动词块。'),
      chunk('impatient', 'object', '表语｜变得怎样', 'impatient 说明 become 后的状态。', 'become + 形容词表示状态变化。')
    ], '当期待没有实现时，我们往往会变得不耐烦。', '主句：we tend to become impatient；When 从句只交代触发情形。', [
      verb('does not happen', 'happen', '发生', '一般现在时·否定', '时间从句谓语。', forms('happen','happens','happened','happened','happening')),
      verb('tend to become', 'tend', '倾向于；往往会', '一般现在时 + 不定式', '主句谓语。', forms('tend','tends','tended','tended','tending'))
    ], 'When progress is slow, learners tend to become impatient.'),

    finish('动名词主语', '2014 学位英语阅读试题整理 · 科技与耐心', [
      chunk('Slowing down and practicing patience', 'subject', '主语｜两件事', '两个 -ing 短语并列作主语。', '句首 doing 不一定是进行时，也可能是“做某事”这个名词性内容。'),
      chunk('can make', 'verb', '谓语｜能带来什么', 'can + make 构成情态动词谓语。', 'can 后使用动词原形。'),
      chunk('us', 'object', '宾语｜使谁', 'us 是 we 的宾格。', 'make + 人 + 形容词。'),
      chunk('healthier and happier', 'modifier', '宾补｜变得怎样', '两个比较级说明结果。', 'healthy → healthier；happy → happier。')
    ], '放慢节奏并练习耐心，能让我们更健康、更快乐。', '骨架：doing A and doing B — can make — us — healthier and happier。', [
      verb('Slowing', 'slow', '放慢；减速', '动名词', '与 practicing 并列作主语。', forms('slow','slows','slowed','slowed','slowing')),
      verb('practicing', 'practice', '练习；实践', '动名词', '与 Slowing 并列作主语。', forms('practice','practices','practiced','practiced','practicing')),
      verb('can make', 'make', '使；制作', '情态动词 + 原形', '全句谓语。', forms('make','makes','made','made','making'))
    ], 'Reading slowly and reviewing key words can make difficult sentences clearer.'),

    finish('并列谓语', '2015 学位英语阅读试题整理 · 在线课程', [
      chunk('Only about five percent of students', 'subject', '主语｜多少学生', 'of students 修饰 five percent。', '百分比后的 of 短语说明统计对象。'),
      chunk('complete the course', 'verb', '谓语一｜完成课程', 'complete 是第一个谓语。', 'complete 既可作动词“完成”，也可作形容词“完整的”。'),
      chunk('and receive a certificate', 'verb', '谓语二｜获得证书', 'receive 与 complete 并列，共用同一主语。', '看到 and，先检查它连接的是词、短语还是两个谓语。')
    ], '只有大约百分之五的学生完成课程并获得证书。', '主语后有两个并列动作：complete... and receive...。', [
      verb('complete', 'complete', '完成；完整的', '一般现在时', '第一个并列谓语。', forms('complete','completes','completed','completed','completing')),
      verb('receive', 'receive', '收到；获得', '一般现在时', '第二个并列谓语。', forms('receive','receives','received','received','receiving'))
    ], 'Many learners complete the lesson and receive useful feedback.'),

    finish('宾语从句', '2015 学位英语阅读试题整理 · 在线课程', [
      chunk('More than eighty percent of surveyed students', 'subject', '主语｜受访学生', 'surveyed 是过去分词作前置修饰语，表示“被调查的”。', '先把 surveyed students 作为一个名词块。'),
      chunk('say', 'verb', '谓语｜说什么', 'say 后接省略 that 的宾语从句。', 'say 后若出现“主语 + 谓语”，通常是宾语从句。'),
      chunk('they met their main objective', 'object', '宾语从句｜调查结果', 'they 指 surveyed students；met 是 meet 的过去式。', '从句内部再找一次 they — met — objective。')
    ], '超过百分之八十的受访学生表示，他们实现了主要目标。', '主干：students say + 宾语从句；宾语从句省略了 that。', [
      verb('say', 'say', '说；表明', '一般现在时', '主句谓语。', forms('say','says','said','said','saying')),
      verb('met', 'meet', '达到；满足；会见', '一般过去时', '宾语从句谓语。', forms('meet','meets','met','met','meeting'))
    ], 'Most learners say they reached their weekly goal.'),

    finish('介词短语前置', '2015 学位英语阅读试题整理 · 在线课程', [
      chunk('With no cost to enroll', 'modifier', '背景｜在什么条件下', 'With 短语说明在线课程没有报名成本。', '先跳过句首背景，再读主句。'),
      chunk('students', 'subject', '主语｜谁', 'students 是主句主语。', '逗号后立即找主语和谓语。'),
      chunk('can use', 'verb', '谓语｜可以使用', 'can 后接 use 原形。', '情态动词后不加 -s 或 -ed。'),
      chunk('online courses in different ways', 'object', '宾语 + 方式', 'online courses 是宾语，in different ways 补充使用方式。', '先读宾语 courses，再补 in 短语。')
    ], '由于报名没有费用，学生可以用不同方式学习在线课程。', '主干：students can use online courses；With 短语只交代背景。', [
      verb('to enroll', 'enroll', '注册；报名入学', '不定式', '修饰 cost，说明报名这件事。', forms('enroll','enrolls','enrolled','enrolled','enrolling')),
      verb('can use', 'use', '使用；利用', '情态动词 + 原形', '主句谓语。', forms('use','uses','used','used','using'))
    ], 'With a clear plan, students can review difficult words in different ways.'),

    finish('宾语从句 + 完成时', '2016 学位英语阅读试题整理 · 第九行星', [
      chunk('Scientists', 'subject', '主语｜谁', 'Scientists 是报告发现的人。', '先找主句 Scientists said。'),
      chunk('said', 'verb', '谓语｜说了什么', 'said 是主句过去时谓语。', 'said 后面接宾语从句。'),
      chunk('they had found evidence of a giant planet in the distant solar system', 'object', '宾语从句｜发现内容', 'had found 表示发现早于“说”这个过去动作。', '过去完成时 = had + 过去分词。')
    ], '科学家说，他们已经发现了遥远太阳系中一颗巨大行星的证据。', '主句是 Scientists said；从句用 had found 表示“过去的过去”。', [
      verb('said', 'say', '说；表明', '一般过去时', '主句谓语。', forms('say','says','said','said','saying')),
      verb('had found', 'find', '发现；找到', '过去完成时', '宾语从句谓语。', forms('find','finds','found','found','finding'))
    ], 'Researchers said they had found a better way to process the data.'),

    finish('被动 + 定语从句', '2016 学位英语阅读试题整理 · 第九行星', [
      chunk('The discovery', 'subject', '主语｜什么', 'discovery 是动作承受者。', '被动句先问“什么被做了”。'),
      chunk('was made', 'verb', '谓语｜被完成', 'was + made 构成一般过去时被动。', 'be + 过去分词是被动语态核心。'),
      chunk('by two researchers', 'modifier', '施动者｜由谁', 'by 短语说明发现由两位研究者作出。', 'by 后是动作执行者。'),
      chunk('who used mathematical models', 'modifier', '定语从句｜哪两位研究者', 'who 指代 researchers，并在从句中作主语。', '人后面的 who 从句通常修饰这个人。')
    ], '这项发现是由两位使用数学模型的研究人员作出的。', '主干：The discovery was made；by... 说明施动者，who... 修饰 researchers。', [
      verb('was made', 'make', '制作；作出', '一般过去时·被动语态', '主句谓语。', forms('make','makes','made','made','making')),
      verb('used', 'use', '使用；利用', '一般过去时', '定语从句谓语。', forms('use','uses','used','used','using'))
    ], 'The result was checked by two teachers who used the same standard.'),

    finish('It 形式主语', '2016 学位英语阅读试题整理 · 第九行星', [
      chunk('It', 'subject', '形式主语｜先占位置', 'It 不指具体事物，真正内容在后面的 to do。', '翻译时把后面的不定式提前。'),
      chunk('would take', 'verb', '谓语｜将需要', 'would take 表示估计需要某段时间。', 'It takes time to do 是高频句型。'),
      chunk('the planet thousands of years', 'object', '对象 + 时间', 'the planet 是逻辑行动者，thousands of years 是所需时间。', 'take 后先看“谁”，再看“多长时间”。'),
      chunk('to make one full orbit around the sun', 'modifier', '真正内容｜做什么', '不定式说明需要时间完成的动作。', 'to do 是真正主语内容。')
    ], '这颗行星绕太阳完整运行一周需要数千年。', '句型：It would take + 对象 + 时间 + to do。', [
      verb('would take', 'take', '花费；需要', '情态过去式 + 原形', '主句谓语。', forms('take','takes','took','taken','taking')),
      verb('to make', 'make', '形成；完成', '不定式', '真正内容中的动作。', forms('make','makes','made','made','making'))
    ], 'It may take learners several weeks to recognize the core patterns.'),

    finish('被动定义句', '2017 学位英语阅读试题整理 · 大数据', [
      chunk('Big data', 'subject', '主语｜被定义的概念', 'Big data 是全句要解释的概念。', '定义句常出现 be defined as。'),
      chunk('can be defined as', 'verb', '谓语｜可以被定义为', 'can + be + defined 是带情态动词的被动结构。', '把 be defined as 整块记为“被定义为”。'),
      chunk('information', 'object', '表语｜是什么', 'information 给出上位概念。', 'as 后先读核心名词。'),
      chunk('that is too complex to be processed by one person or machine', 'modifier', '定语从句｜什么样的信息', 'that 修饰 information；to be processed 又是被动不定式。', '长修饰语先折叠：information（怎样的信息）。')
    ], '大数据可以定义为复杂到无法由一个人或一台机器处理的信息。', '主干：Big data can be defined as information；that 从句补充 information 的特征。', [
      verb('can be defined', 'define', '定义；界定', '情态动词 + 被动语态', '主句谓语。', forms('define','defines','defined','defined','defining')),
      verb('to be processed', 'process', '处理；加工', '不定式·被动语态', '定语从句中的结果结构。', forms('process','processes','processed','processed','processing'))
    ], 'A complex sentence can be defined as a sentence that contains more than one clause.'),

    finish('时间从句 + 疑问词从句', '2017 学位英语阅读试题整理 · 大数据', [
      chunk('When Dailly completed his studies', 'modifier', '时间背景｜什么时候', 'When 从句交代完成学业之后。', '逗号前是时间背景。'),
      chunk('he', 'subject', '主语｜谁', 'he 指代 Dailly。', 'he 是主格，宾格是 him。'),
      chunk('wondered', 'verb', '谓语｜想知道', 'wondered 后接 how 引导的宾语从句。', 'wonder + 疑问词从句表示“想知道……”。'),
      chunk('how he would earn a living', 'object', '宾语从句｜想知道什么', 'how 表示方式；earn a living 是“谋生”。', '疑问词从句仍用陈述语序：how he would earn。')
    ], '当戴利完成学业时，他不知道自己将如何谋生。', '主句：he wondered；how 从句作 wondered 的宾语。', [
      verb('completed', 'complete', '完成', '一般过去时', '时间从句谓语。', forms('complete','completes','completed','completed','completing')),
      verb('wondered', 'wonder', '想知道；感到疑惑', '一般过去时', '主句谓语。', forms('wonder','wonders','wondered','wondered','wondering')),
      verb('would earn', 'earn', '挣得；谋生', '过去将来时', '宾语从句谓语。', forms('earn','earns','earned','earned','earning'))
    ], 'When students meet a long sentence, they often wonder how they should begin.'),

    finish('现在完成时', '2017 学位英语阅读试题整理 · 大数据', [
      chunk("The company's earnings", 'subject', '主语｜什么', 'earnings 表示公司的收入。', '先把所有格 company\'s 和名词 earnings 看成一个整体。'),
      chunk('have increased', 'verb', '谓语｜已经增长', 'have + increased 构成现在完成时。', '完成时强调从过去延续到现在的变化。'),
      chunk('by twenty-five percent', 'modifier', '幅度｜增长多少', 'by + 数字表示变化幅度。', 'increase by 是“增长了”，increase to 是“增长到”。'),
      chunk('each year', 'modifier', '频率｜多久一次', 'each year 表示每年。', '时间词帮助判断数据变化趋势。')
    ], '这家公司的收入每年增长百分之二十五。', '主干：earnings have increased；两个修饰语分别说明幅度和频率。', [
      verb('have increased', 'increase', '增加；增长', '现在完成时', '主句谓语。', forms('increase','increases','increased','increased','increasing'))
    ], 'The number of recognized words has increased by ten percent this month.')
  ];
})();
