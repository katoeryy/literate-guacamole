import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState, GameAction, Decision } from '../types';
import { getScenarios, getKnockoutScenarios, getRandomScenarioDescription } from '../data/scenarios';
import { useMatchSimulation } from '../hooks/useMatchSimulation';
import { getTeamById } from '../data/worldCupData';

interface MatchDecisionProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

interface Scenario {
  title: string;
  description: string;
  options: DecisionOption[];
}

interface DecisionOption {
  text: string;
  effect?: 'aggressive' | 'defensive' | 'balanced';
  prediction?: 'win' | 'lose' | 'draw';
}

export default function MatchDecision({ gameState, dispatch }: MatchDecisionProps) {
  const { simulateMatch, simulatePrediction } = useMatchSimulation();
  const [isSelecting, setIsSelecting] = useState(false);

  if (!gameState.selectedTeam) return null;

  const isGroupStage = gameState.currentMatchIndex < 3;
  const isPredictionMode = gameState.status === 'predicting';
  const currentMatchInStage = isGroupStage 
    ? (gameState.currentMatchIndex + 1) 
    : (gameState.currentMatchIndex - 3 + 1);

  const totalMatches = isGroupStage ? 3 : 5;

  // 获取对手球队信息
  const getOpponentTeam = () => {
    const opponentIds = ['brazil', 'germany', 'spain', 'france', 'england'];
    const randomOpponent = opponentIds[Math.floor(Math.random() * opponentIds.length)];
    return getTeamById(randomOpponent) || {
      id: randomOpponent,
      name: randomOpponent,
      group: 'A',
      country: randomOpponent,
      flag: '🏴',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
      starPlayers: ['Player 1'],
      rating: 75,
      color: '#000000',
    };
  };

  const opponent = getOpponentTeam();

  // 根据模式获取场景
  let scenario: Scenario;
  if (isPredictionMode) {
    scenario = {
      title: '球迷预测时刻',
      description: getRandomScenarioDescription('group'),
      options: [
        { text: `${gameState.selectedTeam.name} 胜`, prediction: 'win' },
        { text: `${opponent.name} 胜`, prediction: 'lose' },
        { text: '平局', prediction: 'draw' },
      ],
    };
  } else if (isGroupStage) {
    const previousResults = gameState.matchResults.filter(r => !r.isPrediction);
    const isWinBefore = previousResults.length > 0 && previousResults[previousResults.length - 1]?.isWin;
    const groupScenarios = getScenarios(isWinBefore);
    scenario = {
      ...groupScenarios[gameState.currentMatchIndex],
      description: groupScenarios[gameState.currentMatchIndex]?.description || getRandomScenarioDescription('group'),
    };
  } else {
    const knockoutStages = ['16', '8', '4', 'semi', 'final'];
    const currentStage = knockoutStages[gameState.currentMatchIndex - 3] || '16';
    const knockoutScenario = getKnockoutScenarios(currentStage)[0];
    scenario = {
      ...knockoutScenario,
      description: knockoutScenario?.description || getRandomScenarioDescription('knockout'),
    };
  }

  const handleChoice = (option: DecisionOption) => {
    if (isSelecting) return;
    setIsSelecting(true);

    const matchId = `match-${gameState.currentMatchIndex}`;
    let matchResult;

    if (isPredictionMode) {
      matchResult = simulatePrediction(
        gameState.selectedTeam!.id,
        opponent.id,
        option.prediction || 'draw'
      );
    } else {
      matchResult = simulateMatch(
        gameState.selectedTeam!,
        opponent.id,
        option.text,
        isGroupStage ? 'group' : 'knockout',
        matchId
      );
    }

    const decision: Decision = {
      matchId,
      stage: isGroupStage ? 'group' : 'knockout',
      scenario: scenario.title,
      options: scenario.options.map((o) => o.text),
      choice: option.text,
      outcome: matchResult.keyEvent,
      timestamp: Date.now(),
    };

    // 添加短暂延迟以显示选中效果
    setTimeout(() => {
      dispatch({ type: 'MAKE_DECISION', payload: decision });
      dispatch({ type: 'ADD_MATCH_RESULT', payload: matchResult });

      // 如果输了且是小组赛第三场后，设置状态为预测模式
      if (!isPredictionMode && !matchResult.isWin && gameState.currentMatchIndex >= 2 && gameState.currentMatchIndex < 3) {
        setTimeout(() => {
          dispatch({ type: 'SET_STATUS', payload: 'predicting' });
        }, 100);
      }
      
      setIsSelecting(false);
    }, 300);
  };

  // 获取进度文本
  const getProgressText = () => {
    if (isPredictionMode) {
      const predictionCount = gameState.matchResults.filter(r => r.isPrediction).length;
      return `球迷预测 ${predictionCount + 1}/5`;
    }
    if (isGroupStage) {
      return `小组赛 ${gameState.currentMatchIndex + 1}/3`;
    }
    return `淘汰赛 ${currentMatchInStage}/${totalMatches}`;
  };

  // 获取模式徽章样式
  const getModeBadge = () => {
    if (isPredictionMode) {
      return { bg: 'bg-purple-500/30', text: '🔮 球迷模式' };
    }
    if (isGroupStage) {
      return { bg: 'bg-green-500/30', text: '⚽ 主教练模式' };
    }
    return { bg: 'bg-red-500/30', text: '🏆 淘汰赛' };
  };

  const modeBadge = getModeBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-white overflow-hidden relative"
    >
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-world-cup-yellow via-world-cup-red to-world-cup-blue" />
      
      {/* 顶部信息栏 */}
      <div className="flex items-center justify-between mb-6">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-white/60"
        >
          {getProgressText()}
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${modeBadge.bg} px-3 py-1 rounded-full text-sm font-medium`}
        >
          {modeBadge.text}
        </motion.span>
      </div>

      {/* 球队对阵信息 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-4 mb-6"
      >
        <div className="text-center">
          <div className="text-4xl mb-2">{gameState.selectedTeam.flag}</div>
          <div className="font-bold text-sm">{gameState.selectedTeam.name}</div>
        </div>
        <div className="text-2xl font-bold text-white/40">VS</div>
        <div className="text-center">
          <div className="text-4xl mb-2">{opponent.flag}</div>
          <div className="font-bold text-sm">{opponent.name}</div>
        </div>
      </motion.div>

      {/* 场景标题和描述 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
            <h2 className="text-2xl font-bold mb-3 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {scenario.title}
            </h2>
            <p className="text-white/80 text-center leading-relaxed">
              {scenario.description}
            </p>
          </motion.div>
      </AnimatePresence>

      {/* 决策选项 */}
      <div className="space-y-3">
        {scenario.options.map((option: DecisionOption, index: number) => (
          <motion.button
            key={`${scenario.title}-${index}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleChoice(option)}
            disabled={isSelecting}
            className={`w-full p-4 rounded-2xl text-left transition-all border-2 ${
              isSelecting
                ? 'bg-white/5 border-white/10 cursor-not-allowed opacity-50'
                : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/30 cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-sm">
                {String.fromCharCode(65 + index)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base">{option.text}</div>
                {option.effect && (
                  <div className="text-xs text-white/50 mt-1">
                    {option.effect === 'aggressive' && '进攻倾向 +10%'}
                    {option.effect === 'defensive' && '防守倾向 +10%'}
                    {option.effect === 'balanced' && '平衡策略'}
                  </div>
                )}
              </div>
              <motion.div
                animate={{ x: isSelecting ? [0, 5, 0] : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/30"
              >
                →
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center text-xs text-white/40"
      >
        {!isPredictionMode ? '做出你的选择，影响比赛结果！' : '作为资深球迷，预测比赛胜负'}
      </motion.div>

      {/* 触摸反馈效果 */}
      {isSelecting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        />
      )}
    </motion.div>
  );
}
