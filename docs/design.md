# 我的世界杯之旅 - 设计文档

## 项目概述

一款专为2026美加墨世界杯打造的轻量级互动体验产品，用户在5-6分钟内通过关键决策体验世界杯征程，生成精美的生涯图用于社交分享。

### 核心特点
- 全程互动决策，无无聊自动模拟
- 即使球队被淘汰，也能以"传奇球迷"身份继续参与
- 精美动漫Q版风格
- 一键生成社交分享图片
- 适合病毒式传播

---

## 产品名称

**我的世界杯之旅**

---

## 目标用户

- 世界杯球迷
- 喜欢社交分享的用户
- 喜欢轻量级互动体验的用户
- 朋友圈/社群活跃用户

---

## 完整流程设计

### 时间轴（5-6分钟）

```
0:00 - 0:05  开场动画（世界杯奖杯）
0:05 - 0:45  选择球队
0:45 - 2:00  小组赛阶段（3场比赛，每场有决策点）
2:00 - 4:30  淘汰赛阶段（如果出线，继续执教；如果被淘汰，切换为球迷模式）
4:30 - 5:00  生成生涯图
5:00 - 5:30  分享页面
```

---

## 详细流程设计

### 第1步：开场动画（0:00-0:05）

**视觉呈现**：
- 3D旋转的世界杯奖杯动画
- 渐变到"选择你的主队"画面

**动效**：
- 奖杯旋转入场
- 光芒效果
- 平滑过渡到下一步

---

### 第2步：选择球队（0:05-0:45）

**设计概念**："你的世界杯，从选择开始"

**视觉呈现**：
- 48支球队按小组分组展示
- 每个球队卡片包含：
  - 动漫大头队徽
  - 1-2个当家球星Q版头像
  - 简短标签（"卫冕冠军"、"黑马潜力"等）
  - 球队实力评分

**交互效果**：
- 悬停时：球星头像跳动，队徽发光
- 点击选择：全屏动画，球队颜色铺满屏幕
- 确认选择：简短的"出征仪式"动画

---

### 第3步：小组赛阶段（0:45-2:00）

每场比赛前，用户做1-2个关键决策：

**小组赛第1场**：
- **场景**：球队第一场比赛，有点紧张
- **选择**：
  A. 全力进攻，拿下开门红
  B. 稳扎稳打，先保平争胜
- **结果**：选择后 → 快速展示结果动画（3秒）

**小组赛第2场**：
- **场景**：根据第一场结果动态调整
  - 如果赢了："乘胜追击还是保留实力？"
  - 如果平/输："背水一战还是稳守反击？"
- **选择**：2个选项
- **结果**：结果动画

**小组赛第3场**：
- **场景**：出线生死战
- **选择**："全力争胜还是看其他比赛结果？"
- **结果**：结果动画 + 是否出线

---

### 第4步：淘汰赛阶段（2:00-4:30）

#### 场景A：球队出线 → 继续作为主教练

**16强赛**：
- **场景**：对手分析（展示对方球星）
- **选择**：
  A. 对攻大战（精彩但风险高）
  B. 防守反击（稳健但可能沉闷）
- **结果**：关键进球动画 → 胜负

**8强赛**：
- **场景**：球员有小伤病
- **选择**：
  A. 带伤出战，拼了！
  B. 轮换球员，保存实力

**4强赛**：
- **场景**：点球大战！
- **选择**：你安排罚球顺序（从5个球员中选）

**半决赛**：
- **场景**：落后1球，最后10分钟
- **选择**：
  A. 全线压上，拼死一搏
  B. 稳守反击，等待机会

**决赛**：
- **场景**：最后时刻，你有一个换人调整
- **选择**：换上进攻手还是防守球员？

#### 场景B：球队被淘汰 → 切换为"传奇球迷"模式

**转换点**：
- 简短动画："虽然你的球队离开了，但你的世界杯之旅还在继续！"
- 身份切换：主教练 → 传奇球迷

**球迷模式玩法**：
- 继续预测后面每一场比赛
- 每场预测：选择胜负 + 简单理由
- 预测正确获得"预测积分"
- 最终生涯图包含两部分成绩

---

### 第5步：生成生涯图（4:30-5:00）

根据不同结果，有三种生涯图模板：

#### 模板1：夺冠型
- **标题**："传奇教练，带队夺冠！"
- **内容**：
  - 你的球队和最终成绩
  - 关键决策点回顾
  - MVP球员
  - 数据统计
  - 教练风格评价

#### 模板2：虽败犹荣型
- **标题**："你的球队X强，预测准确率X%！"
- **内容**：
  - 执教成绩
  - 预测成绩
  - 双料评价

#### 模板3：预言帝型
- **标题**："预言帝！"
- **内容**：
  - 球队早早淘汰，但预测几乎全中
  - 预测准确率
  - "章鱼保罗转世"称号

---

### 第6步：分享页面（5:00-5:30）

**功能**：
- 一键生成图片
- 一键分享到微信/朋友圈
- 查看排行榜
- "再玩一次"按钮
- 二维码（扫码回看完整历程）

---

## UI/视觉设计

### 视觉风格
- **动漫Q版风格**：所有元素卡通化
- **配色**：世界杯主题色（红、黄、绿、蓝）+ 球队专属色
- **动效**：流畅的过渡动画，燃的关键时刻
- **字体**：活泼有力的字体

### 关键动画设计

#### 球队选择动画
- 悬停：球星头像弹跳
- 选择：全屏色彩蔓延

#### 比赛结果动画
- 进球：Q版球员射门动画 + 庆祝
- 晋级：球队队徽放大 + 庆祝彩带

#### 身份切换动画
- 主教练 → 传奇球迷：平滑过渡 + 文案说明

---

## 技术架构

### 前端技术栈
- **React 18** + **TypeScript**
- **Vite** 构建工具
- **Tailwind CSS** + **shadcn/ui** 组件库
- **Framer Motion** 动画库
- **html2canvas** 图片生成
- **Canvas API** 图片质量优化

### 后端服务
- **Supabase**（BaaS）：
  - 用户认证（匿名访问 + 可选登录）
  - 数据库存储排行榜、生涯图数据
  - 实时同步

### 部署
- **Vercel** 或 **Netlify** 部署前端
- **Supabase** 提供后端服务

---

## 数据结构设计

### 1. 世界杯静态数据

```typescript
interface Team {
  id: string;
  name: string;
  country: string;
  group: string;
  flag: string;
  avatar: string; // 动漫大头形象
  starPlayers: string[]; // 当家球星
  rating: number; // 球队实力评分 1-100
}

interface Match {
  id: string;
  stage: 'group' | '16' | '8' | '4' | 'semi' | 'final';
  teamA: string;
  teamB: string;
  date: string;
  groupMatchNumber?: number;
}

interface WorldCupData {
  teams: Team[];
  matches: Match[];
  groups: Record<string, string[]>;
}
```

### 2. 用户游戏会话数据

```typescript
interface UserGameSession {
  id: string;
  selectedTeam: string;
  startTimestamp: number;
  endTimestamp?: number;

  // 决策记录
  decisions: Decision[];

  // 比赛结果
  matchResults: MatchResult[];

  // 最终状态
  status: 'in_progress' | 'coaching' | 'predicting' | 'completed';
  finalPosition?: string; // 'champion', 'final', 'semi', 'quarter', '16', 'group'
  predictionScore?: number;
  coachStyle?: string;

  // 生成的生涯图
  careerImageUrl?: string;
}

interface Decision {
  matchId: string;
  stage: string;
  scenario: string;
  options: string[];
  choice: string;
  outcome: string;
  timestamp: number;
}

interface MatchResult {
  matchId: string;
  stage: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  isWin: boolean;
  keyEvent: string;
  isPrediction?: boolean;
  predictionCorrect?: boolean;
}
```

### 3. 排行榜数据

```typescript
interface LeaderboardEntry {
  id: string;
  sessionId: string;
  nickname?: string;
  selectedTeam: string;
  finalPosition: string;
  totalScore: number;
  predictionScore?: number;
  timestamp: number;
}
```

---

## 核心算法设计

### 1. 比赛结果模拟算法

根据用户选择 + 球队实力 + 随机因素生成结果：

```typescript
function simulateMatch(
  teamA: Team,
  teamB: Team,
  userChoice: string,
  stage: string
): MatchResult {
  // 基础实力差
  let powerDiff = teamA.rating - teamB.rating;

  // 用户选择影响
  if (userChoice.includes('进攻')) {
    powerDiff += 10; // 增加进攻倾向
  } else if (userChoice.includes('防守')) {
    powerDiff -= 5; // 减少失球但也减少进球
  }

  // 随机因素（增加戏剧性）
  const randomFactor = (Math.random() - 0.5) * 20;
  powerDiff += randomFactor;

  // 生成比分
  const scoreA = Math.max(0, Math.floor((50 + powerDiff) / 20 + Math.random() * 3));
  const scoreB = Math.max(0, Math.floor((50 - powerDiff) / 20 + Math.random() * 3));

  // 生成关键事件
  const keyEvents = [
    `${teamA.starPlayers[0]} 远射破门！`,
    `${teamB.starPlayers[0]} 头球得分！`,
    `点球破门！`,
    `补时绝杀！`,
    `反击得手！`
  ];
  const keyEvent = keyEvents[Math.floor(Math.random() * keyEvents.length)];

  return {
    matchId: '',
    stage,
    teamA: teamA.id,
    teamB: teamB.id,
    scoreA,
    scoreB,
    isWin: scoreA > scoreB,
    keyEvent
  };
}
```

### 2. 教练风格分析算法

根据用户所有决策，分析教练风格：

```typescript
function analyzeCoachStyle(decisions: Decision[]): string {
  let aggressiveCount = 0;
  let defensiveCount = 0;

  decisions.forEach(d => {
    if (d.choice.includes('进攻') || d.choice.includes('全力') || d.choice.includes('拼搏')) {
      aggressiveCount++;
    } else if (d.choice.includes('防守') || d.choice.includes('稳健') || d.choice.includes('保平')) {
      defensiveCount++;
    }
  });

  if (aggressiveCount > defensiveCount + 1) {
    return '激进进攻型';
  } else if (defensiveCount > aggressiveCount + 1) {
    return '稳健防守型';
  } else {
    return '平衡智慧型';
  }
}
```

---

## 图片生成方案

### 技术选型
- **html2canvas**：将DOM转为图片
- **Canvas API**：后处理优化

### 图片质量保证
1. **高分辨率渲染**：2x/3x屏幕适配
2. **资源预加载**：确保图片生成时无缺失
3. **模板化设计**：确保每个元素位置精准
4. **多种导出格式**：PNG/JPG可选
5. **不同尺寸**：朋友圈（1:1）、故事（9:16）

### 生成流程
1. 隐藏界面元素，只显示生涯图区域
2. html2canvas渲染
3. Canvas后处理（锐化、色彩增强）
4. 生成Blob URL
5. 提供下载/分享

---

## 变现思路（可选）

1. **去除广告**：付费去除分享图上的水印
2. **高级模板**：解锁更精美的生涯图模板
3. **多次生成**：免费用户只能生成1次，付费用户无限
4. **个性化定制**：自定义头像、昵称等

---

## 后续迭代方向

1. **增加更多决策点**：丰富剧情分支
2. **多人模式**：和朋友一起玩，对比结果
3. **真实比赛联动**：和真实世界杯比赛结果联动
4. **更多主题**：欧洲杯、美洲杯等

---

## 风险与应对

| 风险 | 影响 | 概率 | 应对方案 |
|-----|------|-----|---------|
| 图片生成质量不高 | 高 | 中 | 提前测试，使用Canvas优化 |
| 用户觉得决策影响不大 | 高 | 低 | 明显的结果差异，文案强调 |
| 世界杯后热度下降 | 中 | 高 | 世界杯期间抓住流量，之后改为"经典世界杯"模式 |

---

*文档版本：v1.0*
*创建日期：2026-05-27*
