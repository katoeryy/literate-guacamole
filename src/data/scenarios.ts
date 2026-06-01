// 决策场景接口定义
interface Scenario {
  matchNumber: number;
  stage: 'group' | 'knockout';
  title: string;
  description: string;
  options: Array<{
    text: string;
    effect: 'aggressive' | 'defensive' | 'balanced';
  }>;
}

// 小组赛决策场景
export const getScenarios = (isWinBefore?: boolean): Scenario[] => [
  {
    matchNumber: 1,
    stage: 'group',
    title: '小组赛第一场',
    description: '球队第一场比赛，有点紧张。你会如何应对这场揭幕战？',
    options: [
      { text: '全力进攻，拿下开门红！', effect: 'aggressive' },
      { text: '稳扎稳打，先保平争胜', effect: 'defensive' },
    ],
  },
  {
    matchNumber: 2,
    stage: 'group',
    title: isWinBefore ? '乘胜追击' : '背水一战',
    description: isWinBefore
      ? '第一场赢了，士气正盛！但对手也不弱，需要谨慎应对。'
      : '第一场没赢，第二场很关键！必须拿到分数才能保留出线希望。',
    options: [
      { text: isWinBefore ? '乘胜追击，继续进攻' : '背水一战，全力进攻', effect: 'aggressive' },
      { text: isWinBefore ? '轮换球员，保留实力' : '稳守反击，先保平局', effect: 'defensive' },
    ],
  },
  {
    matchNumber: 3,
    stage: 'group',
    title: '出线生死战',
    description: '最后一场小组赛，决定能否出线！需要根据积分情况做出最佳选择。',
    options: [
      { text: '全力争胜，争夺小组第一', effect: 'aggressive' },
      { text: '看其他比赛结果，稳健为主', effect: 'balanced' },
    ],
  },
];

// 淘汰赛决策场景
export const getKnockoutScenarios = (stage: string): Scenario[] => {
  const scenarios: Record<string, Scenario> = {
    '16': {
      matchNumber: 4,
      stage: 'knockout',
      title: '16强淘汰赛',
      description: '对手实力强劲，比赛很艰难。你需要做出关键决策。',
      options: [
        { text: '对攻大战，精彩但风险高', effect: 'aggressive' },
        { text: '防守反击，稳健但可能沉闷', effect: 'defensive' },
      ],
    },
    '8': {
      matchNumber: 5,
      stage: 'knockout',
      title: '8强赛',
      description: '球队核心球员有小伤病，是否让他出场？',
      options: [
        { text: '带伤出战，拼了！', effect: 'aggressive' },
        { text: '轮换球员，保存实力', effect: 'defensive' },
      ],
    },
    '4': {
      matchNumber: 6,
      stage: 'knockout',
      title: '半决赛',
      description: '比赛被拖入点球大战！你需要安排罚球顺序。',
      options: [
        { text: '让核心球员先罚，稳定军心', effect: 'aggressive' },
        { text: '让心理素质最好的球员先罚', effect: 'balanced' },
      ],
    },
    'semi': {
      matchNumber: 7,
      stage: 'knockout',
      title: '决赛前夕',
      description: '决赛前夜，有球员状态不佳，需要决定阵容。',
      options: [
        { text: '信任老将，保持稳定', effect: 'aggressive' },
        { text: '大胆启用新人，出奇制胜', effect: 'defensive' },
      ],
    },
    'final': {
      matchNumber: 8,
      stage: 'knockout',
      title: '世界杯决赛！',
      description: '决赛进行到第80分钟，比分胶着。你有一个换人调整的机会。',
      options: [
        { text: '换上进攻手，再拼一个！', effect: 'aggressive' },
        { text: '换上防守球员，守住领先', effect: 'defensive' },
      ],
    },
  };
  return [scenarios[stage] || scenarios['16']];
};

// 比赛预测选项
export const getPredictionOptions = (teamA: string, teamB: string) => [
  { text: `${teamA} 胜`, prediction: 'win' },
  { text: `${teamB} 胜`, prediction: 'lose' },
  { text: '平局', prediction: 'draw' },
];

// 获取所有淘汰赛场景
export const getAllKnockoutScenarios = (): Scenario[] => {
  return [
    ...getKnockoutScenarios('16'),
    ...getKnockoutScenarios('8'),
    ...getKnockoutScenarios('4'),
    ...getKnockoutScenarios('semi'),
    ...getKnockoutScenarios('final'),
  ];
};

// 场景描述模板
export const scenarioTemplates = {
  group: [
    '比赛开始前，球员们略显紧张。',
    '对手实力强劲，比赛充满挑战。',
    '这是关键的出线之战，必须全力以赴！',
    '主场氛围热烈，球迷们充满期待。',
    '球员们状态良好，士气高涨。',
  ],
  knockout: [
    '淘汰赛的氛围完全不同，压力巨大。',
    '对手是传统强队，必须谨慎应对。',
    '比赛进入白热化，每一个决定都至关重要。',
    '关键时刻，考验主教练智慧的时候到了。',
    '全场屏息以待，命运就在你手中。',
  ],
  final: [
    '这是世界杯决赛，全世界的目光都在这里！',
    '球员们眼神坚定，誓要为国家荣誉而战。',
    '无论结果如何，这都将是一场载入史册的比赛。',
  ],
};

// 随机获取场景描述
export const getRandomScenarioDescription = (stage: 'group' | 'knockout' | 'final'): string => {
  const templates = scenarioTemplates[stage];
  return templates[Math.floor(Math.random() * templates.length)];
};
