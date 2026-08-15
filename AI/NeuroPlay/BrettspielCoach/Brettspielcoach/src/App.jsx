import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { UploadScreen } from './components/UploadScreen';
import { AnalysisScreen } from './components/AnalysisScreen';
import { GameOverview } from './components/GameOverview';
import { QuickStart } from './components/QuickStart';
import { RulesScreen } from './components/RulesScreen';
import { CoachScreen } from './components/CoachScreen';
import { GameModeScreen } from './components/GameModeScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { SetupScreen } from './components/SetupScreen';
import { StrategyScreen } from './components/StrategyScreen';
import { GameFlowScreen } from './components/GameFlowScreen';
import { analyzeGameDocument, EXAMPLE_GAME } from './lib/gameService';

function App() {
  const [screen, setScreen] = useState('start');
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(null);

  // Navigation
  const navigate = (screenName) => {
    setScreen(screenName);
  };

  // Upload Handler
  const handleFileSelected = async (file) => {
    setUploadingFile(file);
    setScreen('analysis');

    const result = await analyzeGameDocument(file);
    if (result.success) {
      const newGame = { ...result.game };
      setCurrentGame(newGame);
      setGames([...games, newGame]);
      setTimeout(() => setScreen('overview'), 500);
    }
  };

  // Example Game Handler
  const handleExampleGame = () => {
    setCurrentGame(EXAMPLE_GAME);
    setScreen('overview');
  };

  // Library Selection
  const handleSelectGameFromLibrary = (gameId) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      setCurrentGame(game);
      setScreen('overview');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Start */}
      {screen === 'start' && (
        <StartScreen
          onUpload={() => navigate('upload')}
          onExampleGame={handleExampleGame}
          onLibrary={() => navigate('library')}
        />
      )}

      {/* Upload */}
      {screen === 'upload' && (
        <UploadScreen
          onBack={() => navigate('start')}
          onFileSelected={handleFileSelected}
        />
      )}

      {/* Analysis */}
      {screen === 'analysis' && (
        <AnalysisScreen
          fileName={uploadingFile?.name}
          onAnalysisComplete={() => {/* handled by async flow */}}
        />
      )}

      {/* Game Overview */}
      {screen === 'overview' && currentGame && (
        <GameOverview
          game={currentGame}
          onNavigate={navigate}
        />
      )}

      {/* Quickstart */}
      {screen === 'quickstart' && currentGame && (
        <QuickStart
          game={currentGame}
          onBack={() => navigate('overview')}
        />
      )}

      {/* Setup */}
      {screen === 'setup' && currentGame && (
        <SetupScreen
          game={currentGame}
          onBack={() => navigate('overview')}
        />
      )}

      {/* Rules */}
      {screen === 'rules' && currentGame && (
        <RulesScreen
          game={currentGame}
          onBack={() => navigate('overview')}
        />
      )}

      {/* Game Flow */}
      {screen === 'gameflow' && currentGame && (
        <GameFlowScreen
          game={currentGame}
          onBack={() => navigate('overview')}
        />
      )}

      {/* Strategy */}
      {screen === 'strategy' && currentGame && (
        <StrategyScreen
          game={currentGame}
          onBack={() => navigate('overview')}
        />
      )}

      {/* Coach */}
      {screen === 'coach' && currentGame && (
        <CoachScreen
          game={currentGame}
          onBack={() => navigate('overview')}
        />
      )}

      {/* Game Mode */}
      {screen === 'gamemode' && currentGame && (
        <GameModeScreen
          game={currentGame}
          onBack={() => navigate('overview')}
          onCoachClick={() => navigate('coach')}
          onRulesClick={() => navigate('rules')}
        />
      )}

      {/* Library */}
      {screen === 'library' && (
        <LibraryScreen
          games={games}
          onSelectGame={handleSelectGameFromLibrary}
          onUpload={() => navigate('upload')}
          onBack={() => navigate('start')}
        />
      )}
    </div>
  );
}

export default App;
