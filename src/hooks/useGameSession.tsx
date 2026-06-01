import { useReducer, useContext, createContext, ReactNode } from 'react';
import { GameState, GameAction } from '../types';

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
        return { 
          ...state, 
          step: state.status === 'predicting' ? 'predicting' : (nextMatchIndex < 3 ? 'group-stage' : 'knockout'), 
          currentMatchIndex: nextMatchIndex 
        };
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
