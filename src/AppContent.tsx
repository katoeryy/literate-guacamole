import OpeningAnimation from './components/OpeningAnimation';
import TeamSelector from './components/TeamSelector';
import MatchDecision from './components/MatchDecision';
import MatchResult from './components/MatchResult';
import CareerImageGenerator from './components/CareerImageGenerator';
import SharePage from './components/SharePage';
import { useGameSession } from './hooks/useGameSession';

export default function AppContent() {
  const { gameState, dispatch } = useGameSession();

  const renderCurrentStep = () => {
    switch (gameState.step) {
      case 'opening':
        return <OpeningAnimation onComplete={() => dispatch({ type: 'NEXT_STEP' })} />;
      case 'team-select':
        return <TeamSelector onSelect={(team) => dispatch({ type: 'SELECT_TEAM', payload: team })} />;
      case 'group-stage':
      case 'knockout':
      case 'predicting':
        return <MatchDecision gameState={gameState} dispatch={dispatch} />;
      case 'match-result':
        return <MatchResult gameState={gameState} dispatch={dispatch} />;
      case 'career-image':
        return <CareerImageGenerator gameState={gameState} onComplete={() => dispatch({ type: 'NEXT_STEP' })} />;
      case 'share':
        return <SharePage gameState={gameState} />;
      default:
        return <OpeningAnimation onComplete={() => dispatch({ type: 'NEXT_STEP' })} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
