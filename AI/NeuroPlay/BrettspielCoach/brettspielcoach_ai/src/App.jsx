import { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';

import { AnalysisScreen } from './components/AnalysisScreen';
import { GameOverview } from './components/GameOverview';
import { QuickStart } from './components/QuickStart';
import { SetupScreen } from './components/SetupScreen';
import { RulesScreen } from './components/RulesScreen';
import { CoachScreen } from './components/CoachScreen';
import { GameModeScreen } from './components/GameModeScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { StrategyScreen } from './components/StrategyScreen';
import { GameFlowScreen } from './components/GameFlowScreen';
import { AdminPanel } from './components/AdminPanel';
import { GamesCatalog } from './components/GamesCatalog';
import { BoardGameCatalog } from './components/BoardGameCatalog';
import { MyGamesScreen } from './components/MyGamesScreen';
import { AuthScreen } from './components/AuthScreen';
import { AdminUserManagement } from './components/AdminUserManagement';
import { UserProfileScreen } from './components/UserProfileScreen';
import { Navigation } from './components/Navigation';
import { HouseholdSetupScreen } from './components/HouseholdSetupScreen';
import { logout } from './lib/userStorage';
import { analyzeGameDocument, EXAMPLE_GAME } from './lib/gameService';
import { loadGames, loadGameModel, initializeGameStorage, saveGame } from './lib/gameRepository';
import { checkCollectionsAvailable } from './lib/pbCollections';
import { pb } from './lib/pb';

function App() {
  const [screen, setScreen] = useState('start');
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(null);
  const [storageReady, setStorageReady] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize persistent storage on mount
  useEffect(() => {
    async function initStorage() {
      try {
        // Check if collections are available
        const check = await checkCollectionsAvailable();
        if (!check.all_available) {
          console.warn('Fehlende Collections:', check.missing_collections);
        }

        // Initialize game storage (migrate example game if needed)
        await initializeGameStorage();

        // Load all games from storage
        const loadedGames = await loadGames();
        setGames(loadedGames);
        setStorageReady(true);
      } catch (error) {
        console.error('Fehler beim Initialisieren des Speichers:', error);
        // Fall back to in-memory mode with example game
        setGames([EXAMPLE_GAME]);
        setStorageReady(false);
      }

      // Check if user is already logged in
      const userId = localStorage.getItem('neuroplay_user_id');
      const userEmail = localStorage.getItem('neuroplay_user_email');
      const authToken = localStorage.getItem('neuroplay_auth_token');
      if (userId && userEmail && authToken) {
        // Restore PocketBase auth state with stored token
        pb.authStore.save(authToken, { id: userId, email: userEmail });
        setCurrentUser({ id: userId, email: userEmail });
      }
    }

    initStorage();
  }, []);

  // Navigation
  const navigate = (screenName) => {
    setScreen(screenName);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('start');
  };

  // Check if current user is admin
  const checkIsAdmin = async () => {
    if (!currentUser?.id) return false;
    // Use verified status (superuser) for admin check
    return currentUser.verified === true;
  };

  // Listen for navigation events from components
  useEffect(() => {
    const handleAppNavigate = (e) => {
      navigate(e.detail);
    };
    window.addEventListener('appNavigate', handleAppNavigate);
    return () => window.removeEventListener('appNavigate', handleAppNavigate);
  }, []);



  // Example Game Handler
  const handleExampleGame = () => {
    setCurrentGame(EXAMPLE_GAME);
    setScreen('overview');
  };

  // Library Selection
  const handleSelectGameFromLibrary = (gameId) => {
    // Load full game model from storage or memory
    const game = games.find(g => g.id === gameId);
    if (game) {
      setCurrentGame(game);
      setScreen('overview');
    } else {
      // Try to load from storage
      loadGameModel(gameId).then(gameModel => {
        setCurrentGame(gameModel);
        setScreen('overview');
      }).catch(error => {
        console.error('Fehler beim Laden des Spiels:', error);
      });
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin status whenever currentUser changes
    const isCurrentUserAdmin = currentUser?.verified === true;
    setIsAdmin(isCurrentUserAdmin);
  }, [currentUser?.id, currentUser?.verified]);

  return (
    <div className="antialiased">
      <Navigation
        currentUser={currentUser}
        onNavigate={navigate}
        onLogout={handleLogout}
        isAdmin={isAdmin}
      />

      {/* Start Screen */}
      {screen === 'start' && <StartScreen currentUser={currentUser} />}



      {/* Game Overview */}
      {screen === 'overview' && currentGame && (
        <GameOverview
          game={currentGame}
          onLearn={() => navigate('quickstart')}
          onRules={() => navigate('rules')}
          onSetup={() => navigate('setup')}
          onCoach={() => navigate('coach')}
          onFlow={() => navigate('flow')}
          onStrategies={() => navigate('strategies')}
          onPlay={() => navigate('gamemode')}
          onBack={() => navigate('start')}
        />
      )}

      {/* Quick Start */}
      {screen === 'quickstart' && currentGame && (
        <QuickStart game={currentGame} onBack={() => navigate('overview')} />
      )}

      {/* Setup */}
      {screen === 'setup' && currentGame && (
        <SetupScreen game={currentGame} onBack={() => navigate('overview')} />
      )}

      {/* Rules */}
      {screen === 'rules' && currentGame && (
        <RulesScreen game={currentGame} onBack={() => navigate('overview')} />
      )}

      {/* Strategy */}
      {screen === 'strategies' && currentGame && (
        <StrategyScreen game={currentGame} onBack={() => navigate('overview')} />
      )}

      {/* Game Flow */}
      {screen === 'flow' && currentGame && (
        <GameFlowScreen game={currentGame} onBack={() => navigate('overview')} />
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

      {/* Admin */}
      {screen === 'admin' && isAdmin ? (
        <AdminPanel onBack={() => navigate('start')} currentUser={currentUser} />
      ) : screen === 'admin' ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Zugriff verweigert</h1>
            <p className="text-slate-400 mb-6">Der Admin-Bereich ist nur für Administratoren zugänglich.</p>
            <button
              onClick={() => navigate('start')}
              className="px-6 py-2 bg-nw-primary hover:bg-nw-primary-dark rounded-lg font-semibold transition-colors"
            >
              Zurück zur Startseite
            </button>
          </div>
        </div>
      ) : null}

      {/* Catalog */}
      {screen === 'catalog' && (
        <GamesCatalog onBack={() => navigate('start')} currentUser={currentUser} />
      )}

      {/* Board Game Catalog */}
      {screen === 'boardgames' && (
        <BoardGameCatalog />
      )}

      {/* My Games */}
      {screen === 'mygames' && (
        <MyGamesScreen onBack={() => navigate('start')} currentUser={currentUser} />
      )}

      {/* Auth */}
      {screen === 'auth' && (
        <AuthScreen
          onAuthSuccess={(user) => {
            // Token already saved in localStorage by AuthScreen
            setCurrentUser(user);
            navigate('start');
          }}
          onBack={() => navigate('start')}
        />
      )}

      {/* User Profile */}
      {screen === 'profile' && (
        <UserProfileScreen currentUser={currentUser} onBack={() => navigate('start')} />
      )}

      {/* Household Setup */}
      {screen === 'household' && currentUser && (
        <HouseholdSetupScreen
          currentUser={currentUser}
          onBack={() => navigate('start')}
          onHouseholdCreated={() => navigate('start')}
        />
      )}
    </div>
  );
}

export default App;
