import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GameState } from '../types';
import { analyzeCoachStyle, calculatePredictionScore } from '../utils/styleAnalyzer';
import { generateCareerImage, downloadImage, shareImage } from '../utils/imageGenerator';

interface CareerImageGeneratorProps {
  gameState: GameState;
  onComplete: () => void;
}

/**
 * 生涯图生成组件
 * 根据游戏结果生成精美的生涯图
 * 支持三种模板：夺冠型、虽败犹荣型、预言帝型
 */
export default function CareerImageGenerator({ gameState, onComplete }: CareerImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const careerCardRef = useRef<HTMLDivElement>(null);

  if (!gameState.selectedTeam) return null;

  // 分析教练风格
  const coachStyle = analyzeCoachStyle(gameState.decisions);
  
  // 计算预测准确率
  const predictionScore = calculatePredictionScore(gameState.matchResults);
  
  // 检查是否有预测模式
  const hasPredictionMode = gameState.matchResults.some(m => m.isPrediction);
  
  // 计算获胜场次
  const wins = gameState.matchResults.filter(m => !m.isPrediction && m.isWin).length;
  
  // 判断生涯图类型
  const isChampion = wins >= 5 && !hasPredictionMode;
  const isProphet = hasPredictionMode && predictionScore >= 70 && wins < 3;

  // 生成生涯图
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

  // 下载图片
  const handleDownload = () => {
    if (imageUrl) {
      downloadImage(imageUrl, `world-cup-journey-${Date.now()}.png`);
    }
  };

  // 分享图片
  const handleShare = async () => {
    if (imageUrl) {
      const success = await shareImage(imageUrl);
      if (success) {
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
      }
    }
  };

  // 渲染生涯图模板
  const renderCareerCard = () => {
    // 获取模板标题和图标
    let title, emoji, gradient;
    if (isChampion) {
      title = '传奇教练，带队夺冠！';
      emoji = '🏆';
      gradient = 'from-yellow-500 via-amber-500 to-orange-500';
    } else if (isProphet) {
      title = '预言帝！';
      emoji = '🔮';
      gradient = 'from-purple-500 via-violet-500 to-indigo-500';
    } else {
      title = '虽败犹荣';
      emoji = '💪';
      gradient = 'from-blue-500 via-cyan-500 to-teal-500';
    }

    return (
      <div
        id="career-card"
        ref={careerCardRef}
        className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 text-white max-w-md mx-auto shadow-2xl`}
      >
        {/* 顶部装饰 */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        <div className="text-center relative">
          {/* 球队旗帜和名称 */}
          <div className="text-7xl mb-4 animate-bounce">{gameState.selectedTeam!.flag}</div>
          <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">我的世界杯之旅</h1>
          <p className="text-xl mb-6 text-white/90">{gameState.selectedTeam!.name}</p>

          {/* 主要成就卡片 */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6 border border-white/30">
            <div className="text-5xl mb-3">{emoji}</div>
            <div className="text-2xl font-bold mb-2">{title}</div>
            <div className="text-white/80 text-lg">
              {coachStyle}
            </div>
          </div>

          {/* 数据统计网格 */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/15 rounded-xl p-4 backdrop-blur border border-white/20">
              <div className="text-3xl font-bold">{wins}</div>
              <div className="text-sm text-white/70">获胜场次</div>
            </div>
            <div className="bg-white/15 rounded-xl p-4 backdrop-blur border border-white/20">
              <div className="text-3xl font-bold">{gameState.decisions.length}</div>
              <div className="text-sm text-white/70">关键决策</div>
            </div>
            <div className="bg-white/15 rounded-xl p-4 backdrop-blur border border-white/20">
              <div className="text-3xl font-bold">{predictionScore.toFixed(0)}%</div>
              <div className="text-sm text-white/70">预测准确</div>
            </div>
          </div>

          {/* 比赛记录 */}
          <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur border border-white/20">
            <div className="text-sm text-white/60 mb-2">比赛记录</div>
            <div className="flex justify-center gap-2 flex-wrap">
              {gameState.matchResults.slice(0, 6).map((result, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                    result.isPrediction
                      ? result.predictionCorrect
                        ? 'bg-green-500/50'
                        : 'bg-red-500/50'
                      : result.isWin
                      ? 'bg-green-500/50'
                      : 'bg-red-500/50'
                  }`}
                >
                  {result.isPrediction ? (
                    result.predictionCorrect ? '✓' : '✗'
                  ) : result.isWin ? (
                    '✓'
                  ) : (
                    '✗'
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 底部水印 */}
          <div className="text-sm text-white/50 flex items-center justify-center gap-2">
            <span>⚽</span>
            <span>2026 美加墨世界杯</span>
            <span>⚽</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* 生涯图预览区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {renderCareerCard()}
      </motion.div>

      {/* 操作按钮区域 */}
      <div className="text-center space-y-4">
        {!imageUrl ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold py-4 px-12 rounded-full text-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                生成中...
              </span>
            ) : (
              '生成生涯图'
            )}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {/* 图片预览 */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src={imageUrl}
                alt="我的世界杯生涯图"
                className="w-full"
              />
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载图片
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                分享
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg"
              >
                继续
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* 分享成功提示 */}
      {showShareToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          已复制到剪贴板，快去分享吧！📱
        </motion.div>
      )}
    </div>
  );
}
