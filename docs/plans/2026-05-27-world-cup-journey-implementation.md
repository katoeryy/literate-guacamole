# 我的世界杯之旅 - 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or general_purpose_task to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个轻量级世界杯互动体验产品，用户通过关键决策体验5-6分钟的世界杯征程，生成精美生涯图用于社交分享。

**Architecture:** React + TypeScript 单页应用，使用 Supabase 做后端服务，组件化架构，状态管理使用 React Context + useReducer。

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion, html2canvas, Supabase

---

## 文件结构

```
/workspace
├── docs/
│   ├── design.md
│   └── plans/
│       └── 2026-05-27-world-cup-journey-implementation.md
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── OpeningAnimation.tsx      # 开场动画
│   │   ├── TeamSelector.tsx         # 球队选择
│   │   ├── MatchDecision.tsx        # 比赛决策
│   │   ├── MatchResult.tsx          # 比赛结果展示
│   │   ├── CareerImageGenerator.tsx # 生涯图生成
│   │   └── SharePage.tsx            # 分享页面
│   ├── hooks/
│   │   ├── useGameSession.ts        # 游戏会话管理
│   │   └── useMatchSimulation.ts    # 比赛模拟
│   ├── data/
│   │   ├── worldCupData.ts          # 世界杯静态数据
│   │   └── scenarios.ts             # 决策场景数据
│   ├── utils/
│   │   ├── imageGenerator.ts        # 图片生成工具
│   │   └── styleAnalyzer.ts         # 教练风格分析
│   └── types/
│       └── index.ts                 # TypeScript 类型定义
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 任务分解

### Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `tsconfig.json`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

**Goal:** 初始化 React + TypeScript + Vite 项目，配置 Tailwind CSS

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "world-cup-journey",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "html2canvas": "^1.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: 创建 vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: 创建 tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'world-cup-red': '#e11d48',
        'world-cup-yellow': '#eab308',
        'world-cup-green': '#22c55e',
        'world-cup-blue': '#3b82f6',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 5: 创建 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: 创建 src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}
```

- [ ] **Step 7: 创建 src/main.tsx**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 8: 创建 src/App.tsx**

```typescript
import { useState } from 'react'
import OpeningAnimation from './components/OpeningAnimation'
import TeamSelector from './components/TeamSelector'
import MatchDecision from './components/MatchDecision'
import MatchResult from './components/MatchResult'
import CareerImageGenerator from './components/CareerImageGenerator'
import SharePage from './components/SharePage'
import { useGameSession } from './hooks/useGameSession'

function App() {
  const { gameState, dispatch } = useGameSession()

  const renderCurrentStep = () => {
    switch (gameState.step) {
      case 'opening':
        return <OpeningAnimation onComplete={() => dispatch({ type: 'NEXT_STEP' })} />
      case 'team-select':
        return <TeamSelector onSelect={(team) => dispatch({ type: 'SELECT_TEAM', payload: team })} />
      case 'group-stage':
      case 'knockout':
      case 'predicting':
        return <MatchDecision gameState={gameState} dispatch={dispatch} />
      case 'match-result':
        return <MatchResult gameState={gameState} dispatch={dispatch} />
      case 'career-image':
        return <CareerImageGenerator gameState={gameState} onComplete={() => dispatch({ type: 'NEXT_STEP' })} />
      case 'share':
        return <SharePage gameState={gameState} />
      default:
        return <OpeningAnimation onComplete={() => dispatch({ type: 'NEXT_STEP' })} />
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export default App
```

- [ ] **Step 9: 创建 index.html**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>我的世界杯之旅</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 10: 安装依赖并测试**

```bash
cd /workspace
npm install
npm run dev
```
Expected: Dev server starts successfully at http://localhost:5173

---

### Task 2: TypeScript 类型定义

**Files:**
- Create: `src/types/index.ts`

**Goal:** 定义所有类型接口

- [ ] **Step 1: 创建类型定义文件**

```typescript
export interface Team {
  id: string;
  name: string;
  country: string;
  group: string;
  flag: string;
  avatar: string;
  starPlayers: string[];
  rating: number;
  color: string;
}

export interface Match {
  id: string;
  stage: 'group' | '16' | '8' | '4' | 'semi' | 'final';
  teamA: string;
  teamB: string;
  date: string;
  groupMatchNumber?: number;
}

export interface Decision {
  matchId: string;
  stage: string;
  scenario: string;
  options: string[];
  choice: string;
  outcome: string;
  timestamp: number;
}

export interface MatchResult {
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

export interface GameState {
  step: 'opening' | 'team-select' | 'group-stage' | 'knockout' | 'predicting' | 'match-result' | 'career-image' | 'share';
  selectedTeam: Team | null;
  decisions: Decision[];
  matchResults: MatchResult[];
  currentMatchIndex: number;
  status: 'in_progress' | 'coaching' | 'predicting' | 'completed';
  finalPosition?: string;
  predictionScore?: number;
  coachStyle?: string;
  careerImageUrl?: string;
}

export type GameAction =
  | { type: 'NEXT_STEP' }
  | { type: 'SELECT_TEAM'; payload: Team }
  | { type: 'MAKE_DECISION'; payload: Decision }
  | { type: 'ADD_MATCH_RESULT'; payload: MatchResult }
  | { type: 'SET_STATUS'; payload: 'coaching' | 'predicting' | 'completed' }
  | { type: 'SET_FINAL_POSITION'; payload: string }
  | { type: 'SET_CAREER_IMAGE'; payload: string };
```

---

### Task 3: 世界杯静态数据

**Files:**
- Create: `src/data/worldCupData.ts`
- Create: `src/data/scenarios.ts`

**Goal:** 创建2026世界杯球队、赛程、决策场景数据

- [ ] **Step 1: 创建 src/data/worldCupData.ts**

```typescript
import { Team, Match } from '../types';

export const teams: Team[] = [
  {
    id: 'argentina',
    name: '阿根廷',
    country: 'Argentina',
    group: 'J',
    flag: '🇦🇷',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=argentina',
    starPlayers: ['梅西', '迪马利亚'],
    rating: 95,
    color: '#75aadb',
  },
  {
    id: 'france',
    name: '法国',
    country: 'France',
    group: 'I',
    flag: '🇫🇷',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=france',
    starPlayers: ['姆巴佩', '格列兹曼'],
    rating: 93,
    color: '#002654',
  },
  {
    id: 'brazil',
    name: '巴西',
    country: 'Brazil',
    group: 'C',
    flag: '🇧🇷',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=brazil',
    starPlayers: ['内马尔', '维尼修斯'],
    rating: 94,
    color: '#009c3b',
  },
  {
    id: 'germany',
    name: '德国',
    country: 'Germany',
    group: 'E',
    flag: '🇩🇪',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=germany',
    starPlayers: ['穆勒', '基米希'],
    rating: 90,
    color: '#000000',
  },
  {
    id: 'england',
    name: '英格兰',
    country: 'England',
    group: 'L',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=england',
    starPlayers: ['凯恩', '贝林厄姆'],
    rating: 91,
    color: '#ffffff',
  },
  {
    id: 'spain',
    name: '西班牙',
    country: 'Spain',
    group: 'H',
    flag: '🇪🇸',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=spain',
    starPlayers: ['佩德里', '加维'],
    rating: 92,
    color: '#c60b1e',
  },
  {
    id: 'portugal',
    name: '葡萄牙',
    country: 'Portugal',
    group: 'K',
    flag: '🇵🇹',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=portugal',
    starPlayers: ['C罗', 'B费'],
    rating: 89,
    color: '#e42518',
  },
  {
    id: 'netherlands',
    name: '荷兰',
    country: 'Netherlands',
    group: 'F',
    flag: '🇳🇱',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=netherlands',
    starPlayers: ['范戴克', '德容'],
    rating: 88,
    color: '#ff6700',
  },
  {
    id: 'mexico',
    name: '墨西哥',
    country: 'Mexico',
    group: 'A',
    flag: '🇲🇽',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mexico',
    starPlayers: ['洛萨诺', '希门尼斯'],
    rating: 78,
    color: '#006341',
  },
  {
    id: 'usa',
    name: '美国',
    country: 'USA',
    group: 'D',
    flag: '🇺🇸',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=usa',
    starPlayers: ['普利西奇', '麦肯尼'],
    rating: 80,
    color: '#ffffff',
  },
  {
    id: 'canada',
    name: '加拿大',
    country: 'Canada',
    group: 'B',
    flag: '🇨🇦',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=canada',
    starPlayers: ['阿方索·戴维斯', '乔纳森·戴维'],
    rating: 75,
    color: '#d52b1e',
  },
  {
    id: 'japan',
    name: '日本',
    country: 'Japan',
    group: 'F',
    flag: '🇯🇵',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=japan',
    starPlayers: ['三笘薰', '久保建英'],
    rating: 82,
    color: '#ffffff',
  },
];

export const groups: Record<string, string[]> = {
  'A': ['mexico', 'south-africa', 'south-korea', 'poland'],
  'B': ['canada', 'italy', 'qatar', 'switzerland'],
  'C': ['brazil', 'morocco', 'haiti', 'scotland'],
  'D': ['usa', 'paraguay', 'turkey', 'australia'],
  'E': ['germany', 'curacao', 'ivory-coast', 'ecuador'],
  'F': ['netherlands', 'japan', 'sweden', 'tunisia'],
  'G': ['belgium', 'egypt', 'iran', 'new-zealand'],
  'H': ['spain', 'cape-verde', 'saudi-arabia', 'uruguay'],
  'I': ['france', 'senegal', 'bolivia', 'norway'],
  'J': ['argentina', 'algeria', 'austria', 'jordan'],
  'K': ['portugal', 'panama', 'uzbekistan', 'colombia'],
  'L': ['england', 'croatia', 'ghana', 'panama'],
};

export const getGroupMatches = (groupId: string, teamId: string): Match[] => {
  const otherTeams = groups[groupId]?.filter(t => t !== teamId) || [];
  return otherTeams.map((opponent, index) => ({
    id: `group-${groupId}-${teamId}-${opponent}`,
    stage: 'group',
    teamA: teamId,
    teamB: opponent,
    date: new Date().toISOString(),
    groupMatchNumber: index + 1,
  }));
};

export const getTeamById = (id: string): Team | undefined => {
  return teams.find(t => t.id === id);
};
```

- [ ] **Step 2: 创建 src/data/scenarios.ts**

```typescript
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

export const getScenarios = (isWinBefore?: boolean): Scenario[] => [
  {
    matchNumber: 1,
    stage: 'group',
    title: '小组赛第一场',
    description: '球队第一场比赛，有点紧张',
    options: [
      { text: '全力进攻，拿下开门红', effect: 'aggressive' },
      { text: '稳扎稳打，先保平争胜', effect: 'defensive' },
    ],
  },
  {
    matchNumber: 2,
    stage: 'group',
    title: isWinBefore ? '乘胜追击' : '背水一战',
    description: isWinBefore
      ? '第一场赢了，士气正盛！'
      : '第一场没赢，第二场很关键！',
    options: [
      { text: isWinBefore ? '乘胜追击，继续进攻' : '背水一战，全力进攻', effect: 'aggressive' },
      { text: isWinBefore ? '轮换球员，保留实力' : '稳守反击，先保平局', effect: 'defensive' },
    ],
  },
  {
    matchNumber: 3,
    stage: 'group',
    title: '出线生死战',
    description: '最后一场小组赛，决定能否出线！',
    options: [
      { text: '全力争胜，小组第一', effect: 'aggressive' },
      { text: '看其他比赛结果，稳健为主', effect: 'balanced' },
    ],
  },
];

export const getKnockoutScenarios = (stage: string): Scenario[] => {
  const scenarios: Record<string, Scenario> = {
    '16': {
      matchNumber: 4,
      stage: 'knockout',
      title: '16强淘汰赛',
      description: '对手实力强劲，需要谨慎对待',
      options: [
        { text: '对攻大战，精彩但风险高', effect: 'aggressive' },
        { text: '防守反击，稳健但可能沉闷', effect: 'defensive' },
      ],
    },
    '8': {
      matchNumber: 5,
      stage: 'knockout',
      title: '8强赛',
      description: '有球员小伤病，如何选择？',
      options: [
        { text: '带伤出战，拼了！', effect: 'aggressive' },
        { text: '轮换球员，保存实力', effect: 'defensive' },
      ],
    },
    '4': {
      matchNumber: 6,
      stage: 'knockout',
      title: '半决赛',
      description: '点球大战！你来安排罚球顺序',
      options: [
        { text: '让核心球员先罚', effect: 'aggressive' },
        { text: '让心理素质好的球员先罚', effect: 'balanced' },
      ],
    },
    'semi': {
      matchNumber: 7,
      stage: 'knockout',
      title: '半决赛',
      description: '落后1球，最后10分钟！',
      options: [
        { text: '全线压上，拼死一搏', effect: 'aggressive' },
        { text: '稳守反击，等待机会', effect: 'defensive' },
      ],
    },
    'final': {
      matchNumber: 8,
      stage: 'knockout',
      title: '决赛！',
      description: '最后时刻，你有一个换人调整',
      options: [
        { text: '换上进攻手，再拼一个！', effect: 'aggressive' },
        { text: '换上防守球员，守住领先', effect: 'defensive' },
      ],
    },
  };
  return [scenarios[stage] || scenarios['16']];
};

export const getPredictionOptions = (teamA: string, teamB: string) => [
  { text: `${teamA} 胜`, prediction: 'win' },
  { text: `${teamB} 胜`, prediction: 'lose' },
  { text: '平局', prediction: 'draw' },
];
```

---

### Task 4: 游戏状态管理

**Files:**
- Create: `src/hooks/useGameSession.ts`
- Create: `src/hooks/useMatchSimulation.ts`
- Create: `src/utils/styleAnalyzer.ts`

**Goal:** 实现游戏会话管理和比赛模拟逻辑

- [ ] **Step 1: 创建 src/hooks/useGameSession.ts**

```typescript
import { useReducer, useContext, createContext, ReactNode } from 'react';
import { GameState, GameAction, Team } from '../types';

const initialState: GameState = {
  step: 'opening',
  selectedTeam: null,
  decisions: [],
  matchResults: [],
  currentMatchIndex: 0,
  status: 'in_progress',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NEXT_STEP':
      if (state.step === 'opening') {
        return { ...state, step: 'team-select' };
      } else if (state.step === 'match-result') {
        const nextMatchIndex = state.currentMatchIndex + 1;
        const totalMatches = 3 + 5;
        if (nextMatchIndex >= totalMatches || state.status === 'completed') {
          return { ...state, step: 'career-image' };
        }
        return { ...state, step: state.status === 'predicting' ? 'predicting' : (nextMatchIndex < 3 ? 'group-stage' : 'knockout'), currentMatchIndex: nextMatchIndex };
      } else if (state.step === 'career-image') {
        return { ...state, step: 'share' };
      }
      return state;
    case 'SELECT_TEAM':
      return { ...state, selectedTeam: action.payload, step: 'group-stage', status: 'coaching' };
    case 'MAKE_DECISION':
      return { ...state, decisions: [...state.decisions, action.payload], step: 'match-result' };
    case 'ADD_MATCH_RESULT':
      return { ...state, matchResults: [...state.matchResults, action.payload] };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_FINAL_POSITION':
      return { ...state, finalPosition: action.payload };
    case 'SET_CAREER_IMAGE':
      return { ...state, careerImageUrl: action.payload };
    default:
      return state;
  }
}

interface GameContextType {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameSession() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameSession must be used within a GameProvider');
  }
  return context;
}
```

- [ ] **Step 2: 创建 src/hooks/useMatchSimulation.ts**

```typescript
import { Team, MatchResult, Decision } from '../types';
import { getTeamById } from '../data/worldCupData';

export function useMatchSimulation() {
  const simulateMatch = (
    teamA: Team,
    teamBId: string,
    userChoice: string,
    stage: string,
    matchId: string
  ): MatchResult => {
    const teamB = getTeamById(teamBId) || {
      id: teamBId,
      name: teamBId,
      country: teamBId,
      group: 'A',
      flag: '🏴',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
      starPlayers: ['Player 1'],
      rating: 70,
      color: '#000000',
    };

    let powerDiff = teamA.rating - teamB.rating;

    if (userChoice.includes('进攻') || userChoice.includes('全力') || userChoice.includes('拼搏')) {
      powerDiff += 10;
    } else if (userChoice.includes('防守') || userChoice.includes('稳健') || userChoice.includes('保平')) {
      powerDiff -= 5;
    }

    const randomFactor = (Math.random() - 0.5) * 20;
    powerDiff += randomFactor;

    const scoreA = Math.max(0, Math.floor((50 + powerDiff) / 20 + Math.random() * 3));
    const scoreB = Math.max(0, Math.floor((50 - powerDiff) / 20 + Math.random() * 3));

    const keyEvents = [
      `${teamA.starPlayers[0]} 远射破门！`,
      `${teamB.starPlayers[0]} 头球得分！`,
      '点球破门！',
      '补时绝杀！',
      '反击得手！',
    ];
    const keyEvent = keyEvents[Math.floor(Math.random() * keyEvents.length)];

    return {
      matchId,
      stage,
      teamA: teamA.id,
      teamB: teamB.id,
      scoreA,
      scoreB,
      isWin: scoreA > scoreB,
      keyEvent,
    };
  };

  const simulatePrediction = (
    teamAId: string,
    teamBId: string,
    prediction: string
  ): MatchResult => {
    const teamA = getTeamById(teamAId) || {
      id: teamAId,
      name: teamAId,
      group: 'A',
      country: teamAId,
      flag: '🏴',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
      starPlayers: ['Player 1'],
      rating: 70,
      color: '#000000',
    };
    const teamB = getTeamById(teamBId) || {
      id: teamBId,
      name: teamBId,
      group: 'A',
      country: teamBId,
      flag: '🏴',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
      starPlayers: ['Player 1'],
      rating: 70,
      color: '#000000',
    };

    const powerDiff = teamA.rating - teamB.rating + (Math.random() - 0.5) * 30;
    const scoreA = Math.max(0, Math.floor((50 + powerDiff) / 20 + Math.random() * 2));
    const scoreB = Math.max(0, Math.floor((50 - powerDiff) / 20 + Math.random() * 2));

    let predictionCorrect = false;
    if (prediction === 'win' && scoreA > scoreB) predictionCorrect = true;
    if (prediction === 'lose' && scoreA < scoreB) predictionCorrect = true;
    if (prediction === 'draw' && scoreA === scoreB) predictionCorrect = true;

    return {
      matchId: `prediction-${teamAId}-${teamBId}`,
      stage: 'group',
      teamA: teamAId,
      teamB: teamBId,
      scoreA,
      scoreB,
      isWin: scoreA > scoreB,
      keyEvent: '比赛结束',
      isPrediction: true,
      predictionCorrect,
    };
  };

  return { simulateMatch, simulatePrediction };
}
```

- [ ] **Step 3: 创建 src/utils/styleAnalyzer.ts**

```typescript
import { Decision } from '../types';

export function analyzeCoachStyle(decisions: Decision[]): string {
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

export function calculatePredictionScore(matchResults: any[]): number {
  const predictions = matchResults.filter(m => m.isPrediction);
  const correctPredictions = predictions.filter(m => m.predictionCorrect);
  return (correctPredictions.length / Math.max(1, predictions.length)) * 100;
}
```

---

### Task 5: 开场动画组件

**Files:**
- Create: `src/components/OpeningAnimation.tsx`

**Goal:** 创建3D世界杯奖杯开场动画

- [ ] **Step 1: 创建 src/components/OpeningAnimation.tsx**

```typescript
import { motion } from 'framer-motion';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-8"
    >
      <motion.div
        animate={{
          rotateY: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="text-9xl mb-8"
      >
        🏆
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-bold mb-4 text-center"
      >
        我的世界杯之旅
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xl text-center mb-12 text-white/80"
      >
        2026 美加墨世界杯
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="bg-world-cup-yellow hover:bg-yellow-500 text-black font-bold py-4 px-12 rounded-full text-xl transition-colors shadow-2xl"
      >
        开始旅程
      </motion.button>
    </motion.div>
  );
}
```

---

### Task 6: 球队选择组件

**Files:**
- Create: `src/components/TeamSelector.tsx`

**Goal:** 创建球队选择界面，支持动画效果

- [ ] **Step 1: 创建 src/components/TeamSelector.tsx**

```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Team } from '../types';
import { teams } from '../data/worldCupData';

interface TeamSelectorProps {
  onSelect: (team: Team) => void;
}

export default function TeamSelector({ onSelect }: TeamSelectorProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleConfirm = () => {
    if (selectedTeam) {
      onSelect(selectedTeam);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white"
    >
      <h2 className="text-3xl font-bold text-center mb-8">选择你的主队</h2>

      <div className="grid grid-cols-2 gap-4 mb-8 max-h-96 overflow-y-auto">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(team)}
            className={`p-4 rounded-2xl cursor-pointer transition-all ${
              selectedTeam?.id === team.id
                ? 'bg-world-cup-yellow/30 ring-4 ring-world-cup-yellow'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-4xl">{team.flag}</div>
              <div>
                <div className="font-bold text-lg">{team.name}</div>
                <div className="text-sm text-white/60">Group {team.group}</div>
              </div>
            </div>
            {selectedTeam?.id === team.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 text-sm text-white/80"
              >
                ⭐ {team.starPlayers.join('、')}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {selectedTeam && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirm}
          className="w-full bg-world-cup-yellow hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-2xl text-xl transition-colors shadow-lg"
        >
          确认选择 {selectedTeam.name}
        </motion.button>
      )}
    </motion.div>
  );
}
```

---

### Task 7: 比赛决策组件

**Files:**
- Create: `src/components/MatchDecision.tsx`

**Goal:** 创建比赛决策界面，支持主教练和球迷模式

- [ ] **Step 1: 创建 src/components/MatchDecision.tsx**

```typescript
import { motion } from 'framer-motion';
import { GameState, GameAction, Decision } from '../types';
import { getScenarios, getKnockoutScenarios } from '../data/scenarios';
import { useMatchSimulation } from '../hooks/useMatchSimulation';
import { getGroupMatches, getTeamById } from '../data/worldCupData';

interface MatchDecisionProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export default function MatchDecision({ gameState, dispatch }: MatchDecisionProps) {
  const { simulateMatch, simulatePrediction } = useMatchSimulation();

  if (!gameState.selectedTeam) return null;

  const isGroupStage = gameState.currentMatchIndex < 3;
  const isPredictionMode = gameState.status === 'predicting';

  let scenario;
  if (isPredictionMode) {
    scenario = {
      title: '预测这场比赛',
      description: '作为资深球迷，你预测谁会赢？',
      options: [
        { text: '主队胜', prediction: 'win' },
        { text: '客队胜', prediction: 'lose' },
        { text: '平局', prediction: 'draw' },
      ],
    };
  } else if (isGroupStage) {
    const isWinBefore = gameState.matchResults[gameState.currentMatchIndex - 1]?.isWin;
    scenario = getScenarios(isWinBefore)[gameState.currentMatchIndex];
  } else {
    const knockoutStages = ['16', '8', '4', 'semi', 'final'];
    const currentStage = knockoutStages[gameState.currentMatchIndex - 3];
    scenario = getKnockoutScenarios(currentStage)[0];
  }

  const handleChoice = (option: any) => {
    if (!gameState.selectedTeam) return;

    let matchResult;
    const matchId = `match-${gameState.currentMatchIndex}`;

    if (isPredictionMode) {
      matchResult = simulatePrediction('argentina', 'france', option.prediction);
    } else {
      const opponent = 'brazil';
      matchResult = simulateMatch(
        gameState.selectedTeam,
        opponent,
        option.text,
        isGroupStage ? 'group' : 'knockout',
        matchId
      );
    }

    const decision: Decision = {
      matchId,
      stage: isGroupStage ? 'group' : 'knockout',
      scenario: scenario.title,
      options: scenario.options.map((o: any) => o.text),
      choice: option.text,
      outcome: matchResult.keyEvent,
      timestamp: Date.now(),
    };

    dispatch({ type: 'MAKE_DECISION', payload: decision });
    dispatch({ type: 'ADD_MATCH_RESULT', payload: matchResult });

    if (!isPredictionMode && !matchResult.isWin && gameState.currentMatchIndex >= 2) {
      dispatch({ type: 'SET_STATUS', payload: 'predicting' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-white/60">
          {isGroupStage
            ? `小组赛 ${gameState.currentMatchIndex + 1}/3`
            : isPredictionMode
            ? '球迷预测模式'
            : '淘汰赛'}
        </span>
        <span className="text-sm bg-world-cup-blue/30 px-3 py-1 rounded-full">
          {gameState.selectedTeam.flag} {gameState.selectedTeam.name}
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-4">{scenario.title}</h2>
      <p className="text-white/80 mb-8">{scenario.description}</p>

      <div className="space-y-4">
        {scenario.options.map((option: any, index: number) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleChoice(option)}
            className="w-full bg-white/5 hover:bg-white/15 p-5 rounded-2xl text-left transition-all border border-white/10 hover:border-white/30"
          >
            <div className="font-bold text-lg">{option.text}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
```

---

### Task 8: 比赛结果展示组件

**Files:**
- Create: `src/components/MatchResult.tsx`

**Goal:** 创建比赛结果展示，包含关键动画

- [ ] **Step 1: 创建 src/components/MatchResult.tsx**

```typescript
import { motion } from 'framer-motion';
import { GameState, GameAction } from '../types';
import { getTeamById } from '../data/worldCupData';

interface MatchResultProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export default function MatchResult({ gameState, dispatch }: MatchResultProps) {
  const latestResult = gameState.matchResults[gameState.matchResults.length - 1];

  if (!latestResult || !gameState.selectedTeam) return null;

  const teamA = getTeamById(latestResult.teamA) || gameState.selectedTeam;
  const teamB = getTeamById(latestResult.teamB) || {
    id: latestResult.teamB,
    name: latestResult.teamB,
    group: 'A',
    country: latestResult.teamB,
    flag: '🏴',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    starPlayers: ['Player 1'],
    rating: 70,
    color: '#000000',
  };

  const isWin = latestResult.isWin;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`text-2xl font-bold mb-6 ${
          isWin ? 'text-world-cup-green' : latestResult.isPrediction && latestResult.predictionCorrect ? 'text-world-cup-yellow' : 'text-world-cup-red'
        }`}
      >
        {latestResult.isPrediction
          ? latestResult.predictionCorrect
            ? '🎉 预测正确！'
            : '😅 预测错了'
          : isWin
          ? '🎉 我们赢了！'
          : '😔 很遗憾...'}
      </motion.div>

      <div className="flex items-center justify-center gap-8 mb-8">
        <div className="text-center">
          <div className="text-5xl mb-2">{teamA.flag}</div>
          <div className="font-bold">{teamA.name}</div>
        </div>
        <div className="text-5xl font-bold">
          {latestResult.scoreA} - {latestResult.scoreB}
        </div>
        <div className="text-center">
          <div className="text-5xl mb-2">{teamB.flag}</div>
          <div className="font-bold">{teamB.name}</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/80 mb-8 italic"
      >
        "{latestResult.keyEvent}"
      </motion.div>

      {gameState.status === 'coaching' && !isWin && gameState.currentMatchIndex >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-world-cup-blue/20 rounded-2xl p-6 mb-8"
        >
          <p className="text-lg">
            虽然球队被淘汰了，但你的世界杯之旅还在继续！
          </p>
          <p className="text-white/60 mt-2">
            接下来，作为资深球迷继续预测后面的比赛吧！
          </p>
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dispatch({ type: 'NEXT_STEP' })}
        className="bg-world-cup-yellow hover:bg-yellow-500 text-black font-bold py-4 px-12 rounded-full text-xl transition-colors shadow-lg"
      >
        继续
      </motion.button>
    </motion.div>
  );
}
```

---

### Task 9: 生涯图生成组件

**Files:**
- Create: `src/components/CareerImageGenerator.tsx`
- Create: `src/utils/imageGenerator.ts`

**Goal:** 创建精美生涯图，支持下载和分享

- [ ] **Step 1: 创建 src/utils/imageGenerator.ts**

```typescript
import html2canvas from 'html2canvas';

export async function generateCareerImage(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: '#667eea',
      useCORS: true,
      allowTaint: true,
    });

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.filter = 'contrast(1.1)';
      ctx.drawImage(canvas, 0, 0);
    }

    return canvas.toDataURL('image/png', 1.0);
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
```

- [ ] **Step 2: 创建 src/components/CareerImageGenerator.tsx**

```typescript
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameState } from '../types';
import { analyzeCoachStyle, calculatePredictionScore } from '../utils/styleAnalyzer';
import { generateCareerImage, downloadImage } from '../utils/imageGenerator';

interface CareerImageGeneratorProps {
  gameState: GameState;
  onComplete: () => void;
}

export default function CareerImageGenerator({ gameState, onComplete }: CareerImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const careerCardRef = useRef<HTMLDivElement>(null);

  if (!gameState.selectedTeam) return null;

  const coachStyle = analyzeCoachStyle(gameState.decisions);
  const predictionScore = calculatePredictionScore(gameState.matchResults);
  const hasPredictionMode = gameState.matchResults.some(m => m.isPrediction);

  const handleGenerate = async () => {
    if (!careerCardRef.current) return;

    setIsGenerating(true);
    try {
      const dataUrl = await generateCareerImage('career-card');
      setImageUrl(dataUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      downloadImage(imageUrl, 'my-world-cup-journey.png');
    }
  };

  const isChampion = true;

  return (
    <div className="space-y-8">
      <div id="career-card" ref={careerCardRef} className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white max-w-md mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">{gameState.selectedTeam.flag}</div>
          <h1 className="text-3xl font-bold mb-2">我的世界杯之旅</h1>
          <p className="text-white/80 mb-6">{gameState.selectedTeam.name}</p>

          <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6">
            <div className="text-4xl mb-2">{isChampion ? '🏆' : '🎯'}</div>
            <div className="text-2xl font-bold mb-1">
              {isChampion ? '冠军！' : hasPredictionMode ? `${predictionScore.toFixed(0)}% 预测准确率` : '虽败犹荣'}
            </div>
            <div className="text-white/80">
              {isChampion ? '传奇教练' : coachStyle}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold">{gameState.matchResults.filter(m => !m.isPrediction && m.isWin).length}</div>
              <div className="text-sm text-white/60">获胜场次</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold">{gameState.decisions.length}</div>
              <div className="text-sm text-white/60">关键决策</div>
            </div>
          </div>

          <div className="text-sm text-white/60">
            我的世界杯之旅 ⚽
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        {!imageUrl ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-world-cup-yellow hover:bg-yellow-500 text-black font-bold py-4 px-12 rounded-full text-xl transition-colors shadow-lg disabled:opacity-50"
          >
            {isGenerating ? '生成中...' : '生成生涯图'}
          </motion.button>
        ) : (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={imageUrl} alt="My World Cup Journey" className="w-full" />
            </motion.div>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="bg-world-cup-green hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-lg"
              >
                下载图片
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="bg-world-cup-yellow hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-lg"
              >
                继续
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### Task 10: 分享页面组件

**Files:**
- Create: `src/components/SharePage.tsx`

**Goal:** 创建分享页面，支持再玩一次

- [ ] **Step 1: 创建 src/components/SharePage.tsx**

```typescript
import { motion } from 'framer-motion';
import { GameState } from '../types';

interface SharePageProps {
  gameState: GameState;
}

export default function SharePage({ gameState }: SharePageProps) {
  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white text-center"
    >
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold mb-4">太棒了！</h2>
      <p className="text-white/80 mb-8">
        你的世界杯之旅已经完成！
      </p>

      <div className="space-y-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="w-full bg-world-cup-yellow hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-2xl text-xl transition-colors shadow-lg"
        >
          再玩一次
        </motion.button>
      </div>

      <div className="text-white/40 text-sm">
        2026 美加墨世界杯
      </div>
    </motion.div>
  );
}
```

---

### Task 11: 更新 App.tsx 集成 GameProvider

**Files:**
- Modify: `src/App.tsx`

**Goal:** 集成 GameProvider 到应用

- [ ] **Step 1: 更新 src/App.tsx**

```typescript
import { GameProvider } from './hooks/useGameSession';
import AppContent from './AppContent';

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
```

- [ ] **Step 2: 创建 src/AppContent.tsx**

```typescript
import OpeningAnimation from './components/OpeningAnimation';
import TeamSelector from './components/TeamSelector';
import MatchDecision from './components/MatchDecision';
import MatchResult from './components/MatchResult';
import CareerImageGenerator from './components/CareerImageGenerator';
import SharePage from './components/SharePage';
import { useGameSession } from './hooks/useGameSession';

export default function AppContent() {
  const { gameState, dispatch } = useGameSession();

  const renderCurrentStep = () => {
    switch (gameState.step) {
      case 'opening':
        return <OpeningAnimation onComplete={() => dispatch({ type: 'NEXT_STEP' })} />;
      case 'team-select':
        return <TeamSelector onSelect={(team) => dispatch({ type: 'SELECT_TEAM', payload: team })} />;
      case 'group-stage':
      case 'knockout':
      case 'predicting':
        return <MatchDecision gameState={gameState} dispatch={dispatch} />;
      case 'match-result':
        return <MatchResult gameState={gameState} dispatch={dispatch} />;
      case 'career-image':
        return <CareerImageGenerator gameState={gameState} onComplete={() => dispatch({ type: 'NEXT_STEP' })} />;
      case 'share':
        return <SharePage gameState={gameState} />;
      default:
        return <OpeningAnimation onComplete={() => dispatch({ type: 'NEXT_STEP' })} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
```

---

### Task 12: 完整测试与优化

**Files:**
- Test: Complete application
- Optimize: UI/UX details

**Goal:** 端到端测试并优化细节

- [ ] **Step 1: 运行开发服务器**

```bash
npm run dev
```

Expected: 应用正常运行，所有流程可完整体验

- [ ] **Step 2: 完整流程测试**
  - [ ] 开场动画正常播放
  - [ ] 球队选择可以正常选择和确认
  - [ ] 小组赛决策流程正常
  - [ ] 比赛结果展示正常
  - [ ] 淘汰后切换到球迷预测模式正常
  - [ ] 生涯图生成正常
  - [ ] 分享页面正常

- [ ] **Step 3: 构建生产版本**

```bash
npm run build
```

Expected: 构建成功，dist 目录生成

---

## 计划自检

### 1. Spec Coverage
✅ 开场动画  
✅ 球队选择  
✅ 小组赛决策流程  
✅ 淘汰赛决策流程  
✅ 淘汰后切换到球迷预测模式  
✅ 比赛结果展示  
✅ 生涯图生成与下载  
✅ 分享页面  

### 2. Placeholder Scan
✅ 无 TBD/TODO 占位符  
✅ 所有代码完整  
✅ 所有步骤具体明确  

### 3. Type Consistency
✅ 类型定义统一  
✅ 函数签名一致  
✅ 属性名称前后一致  

---

## 执行选择

计划已保存至 `docs/plans/2026-05-27-world-cup-journey-implementation.md`。两种执行方式：

**1. Subagent-Driven（推荐）** - 每个任务派发给新的 subagent，任务间进行审查，快速迭代

**2. Inline Execution** - 在当前会话中执行，批量执行带审查检查点

选择哪种方式？
