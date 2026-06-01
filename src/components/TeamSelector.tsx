import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Team } from '../types';
import { teams, getAllGroups, getTeamsInGroup } from '../data/worldCupData';

interface TeamSelectorProps {
  onSelect: (team: Team) => void;
}

export default function TeamSelector({ onSelect }: TeamSelectorProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [filterGroup, setFilterGroup] = useState<string>('all');

  // 根据筛选条件获取球队列表
  const filteredTeams = useMemo(() => {
    if (filterGroup === 'all') {
      return teams;
    }
    return getTeamsInGroup(filterGroup);
  }, [filterGroup]);

  // 处理球队选择
  const handleSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  // 打开确认动画
  const handleConfirm = () => {
    if (selectedTeam) {
      setShowConfirmation(true);
    }
  };

  // 确认完成后触发选择回调
  const handleAnimationComplete = () => {
    if (selectedTeam) {
      onSelect(selectedTeam);
    }
  };

  // 获取星级球员标签
  const getPlayerTags = (team: Team) => {
    if (team.rating >= 90) return { text: '夺冠热门', color: 'bg-red-500' };
    if (team.rating >= 80) return { text: '强队', color: 'bg-blue-500' };
    if (team.rating >= 70) return { text: '中游球队', color: 'bg-yellow-500' };
    return { text: '黑马潜力', color: 'bg-green-500' };
  };

  // 全屏确认动画
  if (showConfirmation && selectedTeam) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 背景颜色扩散动画 */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: selectedTeam.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* 球队信息展示 */}
        <motion.div
          className="relative z-10 text-center text-white"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          {/* 奖杯动画 */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-9xl mb-8"
          >
            {selectedTeam.flag}
          </motion.div>

          {/* 球队名称 */}
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-bold mb-4 drop-shadow-2xl"
          >
            {selectedTeam.name}
          </motion.h2>

          {/* 小组信息 */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl mb-6 opacity-90"
          >
            2026世界杯 · 小组 {selectedTeam.group}
          </motion.p>

          {/* 星级球员 */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4 mb-8"
          >
            {selectedTeam.starPlayers.map((player, index) => (
              <motion.span
                key={player}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-lg"
              >
                ⭐ {player}
              </motion.span>
            ))}
          </motion.div>

          {/* 出征仪式文字 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-3xl font-bold tracking-wider"
          >
            ⚽ 出征世界杯！⚽
          </motion.div>

          {/* 自动跳转 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8"
          >
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="h-1 bg-white/50 rounded-full max-w-xs mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* 粒子效果 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: 0,
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* 触发完成 */}
        <motion.rect
          x="0"
          y="0"
          width="1"
          height="1"
          fill="transparent"
          onAnimationComplete={handleAnimationComplete}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-white/10"
    >
      {/* 标题区域 */}
      <div className="text-center mb-6">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
        >
          🏆 选择你的主队 🏆
        </motion.h2>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-sm md:text-base"
        >
          2026 美加墨世界杯 · 32强逐鹿
        </motion.p>
      </div>

      {/* 小组筛选器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setFilterGroup('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterGroup === 'all'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
          >
            全部球队
          </button>
          {getAllGroups().map((group) => (
            <button
              key={group}
              onClick={() => setFilterGroup(group)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterGroup === group
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              组 {group}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 球队网格列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-500/50 scrollbar-track-transparent">
        {filteredTeams.map((team, index) => {
          const playerTag = getPlayerTags(team);
          const isSelected = selectedTeam?.id === team.id;

          return (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: `0 20px 40px -10px ${team.color}50`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(team)}
              className={`
                relative p-4 rounded-2xl cursor-pointer transition-all border-2
                ${
                  isSelected
                    ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400 shadow-lg shadow-yellow-400/30'
                    : 'bg-white/5 hover:bg-white/10 border-transparent hover:border-white/20'
                }
              `}
              style={{
                boxShadow: isSelected ? `0 0 30px ${team.color}40` : undefined,
              }}
            >
              {/* 球队卡片内容 */}
              <div className="flex items-start gap-3">
                {/* 国旗 */}
                <motion.div
                  animate={isSelected ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0 }}
                  className="text-4xl md:text-5xl flex-shrink-0"
                >
                  {team.flag}
                </motion.div>

                {/* 球队信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-base md:text-lg truncate">
                      {team.name}
                    </h3>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xl"
                      >
                        ✨
                      </motion.span>
                    )}
                  </div>

                  {/* 小组和标签 */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                      组 {team.group}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${playerTag.color} text-white`}
                    >
                      {playerTag.text}
                    </span>
                  </div>

                  {/* 实力评分 */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-white/60">实力</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.floor(team.rating / 20)
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/60">{team.rating}</span>
                  </div>
                </div>
              </div>

              {/* 星级球员信息 */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/10"
                  >
                    <div className="flex flex-wrap gap-1">
                      {team.starPlayers.map((player) => (
                        <motion.span
                          key={player}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs bg-white/10 px-2 py-1 rounded-full"
                        >
                          ⭐ {player}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 悬停时的光芒效果 */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  background: `radial-gradient(circle at center, ${team.color}20 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* 确认按钮 */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: `0 20px 40px -10px ${selectedTeam.color}50`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirm}
              className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 text-black font-bold py-4 px-8 rounded-2xl text-lg md:text-xl transition-all shadow-lg"
              style={{
                boxShadow: `0 10px 30px -10px ${selectedTeam.color}50`,
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span>⚽</span>
                <span>确认选择 {selectedTeam.name}</span>
                <span>🏆</span>
              </span>

              {/* 按钮流光效果 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 已选提示 */}
      <AnimatePresence>
        {!selectedTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center text-white/40 text-sm"
          >
            👆 点击球队卡片选择你的主队
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
