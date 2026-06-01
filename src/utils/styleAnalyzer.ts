import { Decision, MatchResult } from '../types';

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

export function calculatePredictionScore(matchResults: MatchResult[]): number {
  const predictions = matchResults.filter(m => m.isPrediction);
  const correctPredictions = predictions.filter(m => m.predictionCorrect);
  return (correctPredictions.length / Math.max(1, predictions.length)) * 100;
}
