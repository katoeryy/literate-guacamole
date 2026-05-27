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
      className="min-h-screen flex flex-col items-center justify-center text-white p-8 relative overflow-hidden"
    >
      {/* 背景装饰粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-world-cup-yellow/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-world-cup-blue/20 rounded-full blur-3xl"
        />
      </div>

      {/* 3D 旋转奖杯动画 */}
      <motion.div
        animate={{
          rotateY: [0, 180, 360],
          rotateX: [0, 15, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{
          rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="relative mb-8"
      >
        {/* 奖杯主体 */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-9xl md:text-[12rem] drop-shadow-2xl"
          style={{
            textShadow: '0 0 60px rgba(234, 179, 8, 0.8), 0 0 120px rgba(234, 179, 8, 0.4)',
          }}
        >
          🏆
        </motion.div>

        {/* 奖杯光晕效果 */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 bg-world-cup-yellow/30 rounded-full blur-2xl" />
        </motion.div>
      </motion.div>

      {/* 主标题 */}
      <motion.h1
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold mb-4 text-center leading-tight"
        style={{
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        我的世界杯之旅
      </motion.h1>

      {/* 副标题 */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="text-xl md:text-2xl text-center mb-12 text-white/80"
      >
        2026 美加墨世界杯
      </motion.p>

      {/* 装饰性星星 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="flex gap-4 mb-8"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            className="text-3xl"
          >
            ⭐
          </motion.div>
        ))}
      </motion.div>

      {/* 开始旅程按钮 */}
      <motion.button
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        whileHover={{ 
          scale: 1.08,
          boxShadow: '0 20px 40px rgba(234, 179, 8, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="relative bg-gradient-to-r from-world-cup-yellow to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-4 px-12 rounded-full text-xl transition-all shadow-2xl overflow-hidden group"
      >
        {/* 按钮内部光效 */}
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
        <span className="relative z-10 flex items-center gap-2">
          <span>开始旅程</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⚽
          </motion.span>
        </span>
      </motion.button>

      {/* 底部装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 text-white/40 text-sm"
      >
        <p>选择你的主队，开启世界杯征程</p>
      </motion.div>

      {/* 底部渐变装饰线 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-world-cup-yellow to-transparent opacity-50"
      />
    </motion.div>
  );
}
