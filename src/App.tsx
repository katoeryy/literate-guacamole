import { GameProvider } from './hooks/useGameSession';
import AppContent from './AppContent';

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
