window.GRAMMAR_REFERENCE = {
  pronouns: [
    { subject: 'I', object: 'me', determiner: 'my', possessive: 'mine', reflexive: 'myself', meaning: '我' },
    { subject: 'you', object: 'you', determiner: 'your', possessive: 'yours', reflexive: 'yourself / yourselves', meaning: '你 / 你们' },
    { subject: 'he', object: 'him', determiner: 'his', possessive: 'his', reflexive: 'himself', meaning: '他' },
    { subject: 'she', object: 'her', determiner: 'her', possessive: 'hers', reflexive: 'herself', meaning: '她' },
    { subject: 'it', object: 'it', determiner: 'its', possessive: 'its（少单独使用）', reflexive: 'itself', meaning: '它' },
    { subject: 'we', object: 'us', determiner: 'our', possessive: 'ours', reflexive: 'ourselves', meaning: '我们' },
    { subject: 'they', object: 'them', determiner: 'their', possessive: 'theirs', reflexive: 'themselves', meaning: '他们 / 她们 / 它们' }
  ],
  verbs: {
    be: { base: 'be', third: 'am / is / are', past: 'was / were', participle: 'been', ing: 'being', meaning: '是；处于；成为', note: '现在时按主语使用 am / is / are。be 既可作系动词，也可帮助构成进行时和被动语态。' },
    have: { base: 'have', third: 'has', past: 'had', participle: 'had', ing: 'having', meaning: '有；助动词', note: 'have / has + 过去分词构成现在完成时；had + 过去分词构成过去完成时。' },
    create: { base: 'create', third: 'creates', past: 'created', participle: 'created', ing: 'creating', meaning: '创建；创造', note: '规则动词：词尾 e 在加 -ing 时去掉，过去式和过去分词加 -d。' },
    load: { base: 'load', third: 'loads', past: 'loaded', participle: 'loaded', ing: 'loading', meaning: '装载；加载', note: '规则动词。be + loaded 表示“被加载”，此时 loaded 是过去分词。' },
    start: { base: 'start', third: 'starts', past: 'started', participle: 'started', ing: 'starting', meaning: '开始；启动', note: '规则动词。主语是 he / she / it 或单数名词时，一般现在时使用 starts。' },
    become: { base: 'become', third: 'becomes', past: 'became', participle: 'become', ing: 'becoming', meaning: '成为；变得', note: '不规则动词：过去式 became，过去分词仍是 become。' },
    spend: { base: 'spend', third: 'spends', past: 'spent', participle: 'spent', ing: 'spending', meaning: '花费；度过', note: '不规则动词。常用结构：spend time doing 或 spend money on something。' },
    believe: { base: 'believe', third: 'believes', past: 'believed', participle: 'believed', ing: 'believing', meaning: '相信；认为', note: '常接名词或 that 从句：believe the story / believe that ...。' }
  },
  sentences: [
    {
      source: '基础拆句例句',
      words: [
        { display: 'The', lemma: 'the', kind: 'function', pos: '冠词', meaning: '这；该（表示特指）', role: '限定 configuration file，说明是特定的配置文件。', tip: 'the 通常不单独翻译，先和后面的名词一起读。' },
        { display: 'configuration', lemma: 'configuration', kind: 'content', pos: '名词', meaning: '配置；设置', role: '修饰 file，合起来是 configuration file（配置文件）。', tip: '长名词短语先找最右边的核心名词 file。' },
        { display: 'file', lemma: 'file', kind: 'content', pos: '名词', meaning: '文件', role: '整个主语的核心名词。', tip: 'configuration 说明是什么文件，file 才是中心。' },
        { display: 'that', lemma: 'that', kind: 'function', pos: '关系代词', meaning: '……的；那个', role: '引出定语从句 that you created yesterday，修饰 file。', tip: '名词后面的 that 小句，常可先理解成“……的”。' },
        { display: 'you', lemma: 'you', kind: 'pronoun', pronoun: 'you', pos: '人称代词·主格', meaning: '你；你们', role: '在 created 前作从句主语：是“你”创建了文件。', tip: 'you 的主格和宾格形式相同，要靠位置判断。' },
        { display: 'created', lemma: 'create', kind: 'verb', pos: '动词', meaning: '创建了', grammar: '一般过去时', formula: '主语 + 动词过去式', role: '定语从句的谓语；yesterday 明确提示动作发生在过去。', context: 'that you created yesterday', tip: 'created 单独承担谓语时可表示过去；have created 中则是过去分词。' },
        { display: 'yesterday', lemma: 'yesterday', kind: 'content', pos: '时间副词', meaning: '昨天', role: '说明 created 发生的时间。', tip: 'yesterday、last week、ago 常提示一般过去时。' },
        { display: 'is loaded', lemma: 'load', helper: 'be', kind: 'verb', pos: '动词组', meaning: '被加载', grammar: '一般现在时·被动语态', formula: 'am / is / are + 过去分词', role: '全句谓语。file 承受加载动作，所以使用被动语态。', context: 'The configuration file is loaded.', tip: '被动语态中只有 be 随时态和主语变化，loaded 保持过去分词形式。' },
        { display: 'automatically', lemma: 'automatically', kind: 'content', pos: '方式副词', meaning: '自动地', role: '修饰 is loaded，说明加载以什么方式发生。', tip: '很多 -ly 词是副词，用来回答“怎样发生”。' },
        { display: 'when', lemma: 'when', kind: 'function', pos: '连词', meaning: '当……时', role: '引出时间从句 when the application starts。', tip: 'when 后接完整小句，整个部分充当时间信息。' },
        { display: 'application', lemma: 'application', kind: 'content', pos: '名词', meaning: '应用程序；应用', role: '时间从句的主语。', tip: '在计算机场景中 application 常表示“应用程序”。' },
        { display: 'starts', lemma: 'start', kind: 'verb', pos: '动词', meaning: '启动；开始', grammar: '一般现在时·第三人称单数', formula: '单数主语 + 动词 -s / -es', role: 'application 是单数第三人称，所以 start 变为 starts。', context: 'the application starts', tip: '一般现在时中，he / she / it 或单数名词后的动词通常加 -s。' }
      ]
    },
    {
      source: '真题语境改编',
      words: [
        { display: 'Although', lemma: 'although', kind: 'function', pos: '让步连词', meaning: '虽然；尽管', role: '引出让步信息：虽然我们不同。', tip: 'although 和 but 通常不在同一句中重复使用。' },
        { display: 'we', lemma: 'we', kind: 'pronoun', pronoun: 'we', pos: '人称代词·主格', meaning: '我们', role: '放在 are / have become / spend 前作主语。', tip: 'we 是主格；动词或介词后要用宾格 us。' },
        { display: 'are', lemma: 'be', kind: 'verb', pos: 'be 动词', meaning: '是；处于', grammar: '一般现在时·复数形式', formula: 'we / you / they + are', role: '连接主语 we 和状态 different。', context: 'Although we are different', tip: 'I 用 am，he / she / it 用 is，you / we / they 用 are。' },
        { display: 'different', lemma: 'different', kind: 'content', pos: '形容词', meaning: '不同的', role: '放在 are 后说明 we 的状态。', tip: 'be + 形容词常表示“处于某种状态”。' },
        { display: 'have become', lemma: 'become', helper: 'have', kind: 'verb', pos: '动词组', meaning: '已经成为', grammar: '现在完成时', formula: 'have / has + 过去分词', role: '主句谓语，强调从过去到现在已经发生的变化。', context: 'we have become close friends', tip: 'become 的过去分词仍是 become；过去式才是 became。' },
        { display: 'close friends', lemma: 'friend', kind: 'content', pos: '名词短语', meaning: '亲密的朋友', role: '说明 we 已经成为什么。', tip: 'become 后常接身份或状态。' },
        { display: 'because', lemma: 'because', kind: 'function', pos: '原因连词', meaning: '因为', role: '引出原因从句，解释成为朋友的原因。', tip: 'because 后接完整句；because of 后接名词或名词短语。' },
        { display: 'spend', lemma: 'spend', kind: 'verb', pos: '动词', meaning: '花费；度过', grammar: '一般现在时', formula: '主语 + 动词原形', role: '主语 we 是复数，所以使用原形 spend。', context: 'we spend a lot of time together', tip: '常用：spend time doing something（花时间做某事）。' },
        { display: 'a lot of', lemma: 'a lot of', kind: 'function', pos: '数量词组', meaning: '大量；许多', role: '修饰不可数名词 time。', tip: 'a lot of 可修饰可数复数和不可数名词。' },
        { display: 'time', lemma: 'time', kind: 'content', pos: '名词', meaning: '时间', role: 'spend 的宾语。', tip: 'spend time together = 一起度过时间。' },
        { display: 'together', lemma: 'together', kind: 'content', pos: '副词', meaning: '一起；共同', role: '补充说明怎样度过时间。', tip: '副词位置较灵活，这里放在句末最自然。' }
      ]
    },
    {
      source: '真题语境改编',
      words: [
        { display: 'It', lemma: 'it', kind: 'pronoun', pronoun: 'it', pos: '形式主语', meaning: '不具体翻译', role: '先占据主语位置，真正内容是后面的 to believe。', tip: 'It is + 形容词 + to do：中文通常从 to do 开始翻译。' },
        { display: 'is', lemma: 'be', kind: 'verb', pos: 'be 动词', meaning: '是；处于', grammar: '一般现在时·第三人称单数', formula: 'it / he / she + is', role: '连接形式主语 It 和状态 hard。', context: 'It is hard to believe ...', tip: '这里 is 是系动词，不表示“被……”。' },
        { display: 'hard', lemma: 'hard', kind: 'content', pos: '形容词', meaning: '困难的；难以', role: '放在 is 后作表语，说明相信这件事很难。', tip: 'It is hard to do = 做某事很难。' },
        { display: 'to believe', lemma: 'believe', kind: 'verb', pos: '不定式', meaning: '去相信；相信', grammar: 'to + 动词原形', formula: 'It is + 形容词 + to do', role: '逻辑上的真正主语：相信这件事很难。', context: 'It is hard to believe', tip: 'to believe 不承担全句时态；全句的有限动词是 is。' },
        { display: 'that', lemma: 'that', kind: 'function', pos: '从属连词', meaning: '……这件事', role: '引出 believe 的宾语从句。', tip: '动词后的 that 小句常可整体看成“某件事”。' },
        { display: 'a stranger', lemma: 'stranger', kind: 'content', pos: '名词短语', meaning: '一个陌生人', role: 'that 从句的主语。', tip: 'strange 是“陌生的”；stranger 是“陌生人”。' },
        { display: 'became', lemma: 'become', kind: 'verb', pos: '动词', meaning: '成为了', grammar: '一般过去时', formula: '主语 + 动词过去式', role: '宾语从句的谓语，表示过去发生的变化。', context: 'a stranger became my close friend', tip: 'became 是过去式；have become 中使用过去分词 become。' },
        { display: 'my', lemma: 'I', kind: 'pronoun', pronoun: 'I', pos: '形容词性物主限定词', meaning: '我的', role: '放在 close friend 前限定所属关系。', tip: 'my 后必须接名词；mine 可以单独使用。' },
        { display: 'close friend', lemma: 'friend', kind: 'content', pos: '名词短语', meaning: '亲密的朋友', role: '说明 stranger 后来成为什么。', tip: 'close 在这里是形容词“亲密的”，不是动词“关闭”。' }
      ]
    }
  ]
};
