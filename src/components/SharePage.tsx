import { motion } from 'framer-motion';
import { GameState } from '../types';
import { analyzeCoachStyle, calculatePredictionScore } from '../utils/styleAnalyzer';

interface SharePageProps {
  gameState: GameState;
}

export default function SharePage({ gameState }: SharePageProps) {
  const handleRestart = () => {
    window.location.reload();
  };

  const handleShare = async () => {
    const shareData = {
      title: '我的世界杯之旅',
      text: `我在2026世界杯带领${gameState.selectedTeam?.name}完成了一段精彩旅程！`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('分享被取消或失败');
      }
    } else {
      // 复制链接到剪贴板
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板，可以粘贴分享！');
      } catch (err) {
        alert('分享功能暂不可用，请手动复制链接');
      }
    }
  };

  const coachStyle = analyzeCoachStyle(gameState.decisions);
  const predictionScore = calculatePredictionScore(gameState.matchResults);
  const hasPredictionMode = gameState.matchResults.some(m => m.isPrediction);
  const wins = gameState.matchResults.filter(m => !m.isPrediction && m.isWin).length;

  const handleLeaderboard = () => {
    alert('排行榜功能即将上线，敬请期待！🌟');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板！快去分享给朋友们吧 🎉');
    } catch (err) {
      alert('复制失败，请手动复制链接');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 text-white text-center overflow-hidden relative"
    >
      {/* 庆祝动画背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 1,
              y: -20,
              x: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [1, 1, 0],
              y: ['0vh', '100vh'],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute text-2xl md:text-3xl"
          >
            {['🎉', '🎊', '⚽', '🏆', '⭐'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* 主标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="text-6xl md:text-7xl mb-4"
        >
          🎉
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          世界杯之旅完成！
        </h2>
        <p className="text-white/80 mb-6 text-base md:text-lg">
          恭喜你完成了这段精彩的旅程
        </p>
      </motion.div>

      {/* 成绩展示卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 rounded-2xl p-5 md:p-6 mb-6 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-4xl md:text-5xl">{gameState.selectedTeam?.flag}</span>
          <span className="text-xl md:text-2xl font-bold">{gameState.selectedTeam?.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-white/10 rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold text-world-cup-yellow">
              {wins > 0 ? `🏆 ${wins}胜` : hasPredictionMode ? `${predictionScore.toFixed(0)}%` : '⚽'}
            </div>
            <div className="text-sm text-white/60 mt-1">
              {wins > 0 ? '执教获胜' : hasPredictionMode ? '预测准确率' : '精彩表现'}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold text-world-cup-blue">
              {gameState.decisions.length}
            </div>
            <div className="text-sm text-white/60 mt-1">关键决策</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="text-sm text-white/60 mb-1">教练风格</div>
          <div className="text-lg font-bold text-world-cup-green">
            {coachStyle}
          </div>
        </div>
      </motion.div>

      {/* 分享按钮区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3 relative z-10"
      >
        <div className="grid grid-cols-2 gap-3">
          {/* 分享到微信 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg touch-manipulation"
          >
            <span className="text-2xl">💬</span>
            <span className="text-base">分享</span>
          </motion.button>

          {/* 朋友圈分享 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg touch-manipulation"
          >
            <span className="text-2xl">📱</span>
            <span className="text-base">朋友圈</span>
          </motion.button>
        </div>

        {/* 排行榜按钮 */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLeaderboard}
          className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-colors border border-white/20 touch-manipulation"
        >
          <span className="flex items-center justify-center gap-2">
            <span>🏅</span>
            <span>排行榜</span>
            <span className="text-xs bg-world-cup-yellow text-black px-2 py-0.5 rounded-full">即将上线</span>
          </span>
        </motion.button>

        {/* 再玩一次按钮 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="w-full bg-world-cup-yellow hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-2xl text-xl transition-colors shadow-lg touch-manipulation"
        >
          再玩一次
        </motion.button>
      </motion.div>

      {/* 底部信息 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-white/40 text-sm relative z-10"
      >
        2026 美加墨世界杯 ⚽
      </motion.div>

      {/* 二维码提示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-4 p-4 bg-white/5 rounded-xl relative z-10"
      >
        <div className="text-white/60 text-xs mb-2">分享给好友</div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          className="w-full bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 border border-white/20 rounded-lg p-3 transition-all"
        >
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <span>🔗</span>
            <span>复制链接分享</span>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
