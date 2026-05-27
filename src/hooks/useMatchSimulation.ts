import { Team, MatchResult } from '../types';
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
