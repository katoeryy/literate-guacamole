// 球队类型定义
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

// 比赛类型定义
export interface Match {
  id: string;
  stage: 'group' | '16' | '8' | '4' | 'semi' | 'final';
  teamA: string;
  teamB: string;
  date: string;
  groupMatchNumber?: number;
}

// 决策类型定义
export interface Decision {
  matchId: string;
  stage: string;
  scenario: string;
  options: string[];
  choice: string;
  outcome: string;
  timestamp: number;
}

// 比赛结果类型定义
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

// 游戏状态类型定义
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

// 游戏动作类型定义
export type GameAction =
  | { type: 'NEXT_STEP' }
  | { type: 'SELECT_TEAM'; payload: Team }
  | { type: 'MAKE_DECISION'; payload: Decision }
  | { type: 'ADD_MATCH_RESULT'; payload: MatchResult }
  | { type: 'SET_STATUS'; payload: 'coaching' | 'predicting' | 'completed' }
  | { type: 'SET_FINAL_POSITION'; payload: string }
  | { type: 'SET_CAREER_IMAGE'; payload: string };
