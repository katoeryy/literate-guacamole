import { motion, AnimatePresence } from 'framer-motion';
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
  const isPrediction = latestResult.isPrediction;
  const predictionCorrect = latestResult.predictionCorrect;
  const isDraw = latestResult.scoreA === latestResult.scoreB;
  const isEliminated = gameState.status === 'coaching' && !isWin && gameState.currentMatchIndex >= 2;

  const getResultConfig = () => {
    if (isPrediction) {
      return {
        emoji: predictionCorrect ? '🎉' : '😅',
        title: predictionCorrect ? '预测正确！' : '预测错了',
        color: predictionCorrect ? 'text-world-cup-green' : 'text-world-cup-red',
        bgGradient: predictionCorrect
          ? 'from-green-500/20 to-emerald-500/20'
          : 'from-red-500/20 to-orange-500/20',
      };
    }
    if (isDraw) {
      return {
        emoji: '🤝',
        title: '握手言和',
        color: 'text-world-cup-yellow',
        bgGradient: 'from-yellow-500/20 to-amber-500/20',
      };
    }
    if (isWin) {
      return {
        emoji: '🏆',
        title: '我们赢了！',
        color: 'text-world-cup-green',
        bgGradient: 'from-green-500/20 to-emerald-500/20',
      };
    }
    return {
      emoji: '💪',
      title: '虽败犹荣',
      color: 'text-world-cup-red',
      bgGradient: 'from-red-500/20 to-rose-500/20',
    };
  };

  const resultConfig = getResultConfig();
  const isKnockoutStage = gameState.currentMatchIndex >= 3;
  const isChampion = isKnockoutStage && isWin && latestResult.stage === 'final';

  const handleContinue = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const getContinueButtonText = () => {
    if (isEliminated) {
      return '进入球迷模式 →';
    }
    if (isChampion) {
      return '生成生涯图 🏆';
    }
    const nextMatchIndex = gameState.currentMatchIndex + 1;
    if (nextMatchIndex >= 8) {
      return '生成生涯图';
    }
    if (nextMatchIndex === 3) {
      return '进入淘汰赛 →';
    }
    return '下一场比赛 →';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 text-white overflow-hidden relative"
    >
      {/* 背景装饰动画 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {(isWin || predictionCorrect) && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                  }}
                  animate={{
                    opacity: 0,
                    x: (Math.random() - 0.5) * 400,
                    y: Math.random() * -300 - 100,
                    scale: 0,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 0.5,
                    delay: i * 0.05,
                    ease: 'easeOut',
                  }}
                  className="absolute top-1/2 left-1/2 text-2xl"
                >
                  {['✨', '⭐', '🎊', '🌟'][i % 4]}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 晋级/冠军动画 */}
      <AnimatePresence>
        {isChampion && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 8, stiffness: 50, delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="text-8xl mb-4"
              >
                🏆
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold text-world-cup-yellow"
              >
                世界冠军！
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 比赛阶段标识 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-4"
      >
        <span className="text-xs md:text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
          {isPrediction
            ? '球迷预测模式'
            : isKnockoutStage
            ? ['16强', '8强', '4强', '半决赛', '决赛'][gameState.currentMatchIndex - 3]
            : `小组赛 ${gameState.currentMatchIndex + 1}/3`}
        </span>
        <span className="text-xs md:text-sm text-white/60">
          {teamA.flag} vs {teamB.flag}
        </span>
      </motion.div>

      {/* 结果标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`text-2xl md:text-3xl font-bold mb-6 ${resultConfig.color}`}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.3 }}
          className="inline-block mr-2"
        >
          {resultConfig.emoji}
        </motion.span>
        {resultConfig.title}
      </motion.div>

      {/* 比分展示区域 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', damping: 12 }}
        className={`bg-gradient-to-br ${resultConfig.bgGradient} rounded-2xl p-6 mb-6`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* 主队 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1 text-center"
          >
            <motion.div
              animate={isWin ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, repeat: 2 }
              } : {}}
              className="text-4xl md:text-5xl mb-2"
            >
              {teamA.flag}
            </motion.div>
            <div className="font-bold text-sm md:text-base truncate">{teamA.name}</div>
            {isWin && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-world-cup-green mt-1"
              >
                ✦ 胜
              </motion.div>
            )}
          </motion.div>

          {/* 比分 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', damping: 10 }}
            className="flex items-center gap-2 md:gap-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={latestResult.scoreA}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`text-4xl md:text-6xl font-bold ${
                  isWin ? 'text-world-cup-green' : !isPrediction && !isWin ? 'text-white/40' : ''
                }`}
              >
                {latestResult.scoreA}
              </motion.div>
            </AnimatePresence>
            <span className="text-2xl md:text-4xl text-white/40">-</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={latestResult.scoreB}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`text-4xl md:text-6xl font-bold ${
                  !isWin && !isDraw ? 'text-world-cup-green' : !isPrediction && isWin ? 'text-white/40' : ''
                }`}
              >
                {latestResult.scoreB}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 客队 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1 text-center"
          >
            <motion.div
              animate={!isWin && !isDraw && !isPrediction ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, repeat: 2 }
              } : {}}
              className="text-4xl md:text-5xl mb-2"
            >
              {teamB.flag}
            </motion.div>
            <div className="font-bold text-sm md:text-base truncate">{teamB.name}</div>
            {!isWin && !isDraw && !isPrediction && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-world-cup-green mt-1"
              >
                ✦ 胜
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* 关键事件 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-world-cup-yellow"
          >
            ⚡
          </motion.span>
          <span className="text-white/80 italic text-sm md:text-base">
            "{latestResult.keyEvent}"
          </span>
        </div>
      </motion.div>

      {/* 淘汰提示 */}
      <AnimatePresence>
        {isEliminated && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ delay: 0.8, type: 'spring', damping: 15 }}
            className="bg-gradient-to-r from-world-cup-blue/30 to-purple-500/30 rounded-2xl p-5 mb-6 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">👔</div>
              <div>
                <p className="font-bold text-lg mb-1">教练模式结束</p>
                <p className="text-white/70 text-sm">
                  虽然球队未能晋级，但你的世界杯之旅还在继续！
                </p>
                <p className="text-world-cup-yellow text-sm mt-2">
                  接下来，作为资深球迷继续预测后面的比赛吧！⚽
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 继续按钮 */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className={`
          w-full font-bold py-4 px-8 rounded-2xl text-lg md:text-xl
          transition-all shadow-lg active:shadow-md
          ${
            isWin || predictionCorrect
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white'
              : isEliminated
              ? 'bg-gradient-to-r from-world-cup-blue to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white'
              : 'bg-gradient-to-r from-world-cup-yellow to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black'
          }
        `}
      >
        <motion.span
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {getContinueButtonText()}
        </motion.span>
      </motion.button>

      {/* 底部装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 pt-4 border-t border-white/10 text-center"
      >
        <div className="flex justify-center gap-6 text-white/40 text-xs">
          <span>⚽ 世界杯之旅</span>
          <span>•</span>
          <span>2026 美加墨</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
