import React, { useState, useEffect } from 'react';
import { pb } from './lib/pb';
import GamesList from './components/GamesList';
import PublisherList from './components/PublisherList';
import AdminDatabase from './components/AdminDatabase';
import ExcelImportUI from './components/ExcelImportUI';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('games');
  const [games, setGames] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ games: 0, publishers: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const gamesResult = await pb.collection('games').getList(1, 50);
      const publishersResult = await pb.collection('publishers').getList(1, 50);
      
      setGames(gamesResult.items);
      setPublishers(publishersResult.items);
      setStats({
        games: gamesResult.totalItems,
        publishers: publishersResult.totalItems
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">NeuroPlay Katalog</h1>
            <p className="app-subtitle">Brettspielanleitungen Quellenkatalog</p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-label">Spiele</span>
              <span className="stat-value">{stats.games.toLocaleString('de-DE')}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Verlage</span>
              <span className="stat-value">{stats.publishers}</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-button ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          <span className="nav-icon">🎲</span> Spiele
        </button>
        <button 
          className={`nav-button ${activeTab === 'publishers' ? 'active' : ''}`}
          onClick={() => setActiveTab('publishers')}
        >
          <span className="nav-icon">🏢</span> Verlage
        </button>
        <div className="nav-divider"></div>
        <button 
          className={`nav-button ${activeTab === 'admin-db' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin-db')}
        >
          <span className="nav-icon">⚙️</span> Admin → Datenbank
        </button>
        <button 
          className={`nav-button ${activeTab === 'excel-import' ? 'active' : ''}`}
          onClick={() => setActiveTab('excel-import')}
        >
          <span className="nav-icon">📊</span> Excel-Import
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'games' && (
          <GamesList games={games} loading={loading} />
        )}
        {activeTab === 'publishers' && (
          <PublisherList publishers={publishers} loading={loading} />
        )}
        {activeTab === 'admin-db' && (
          <AdminDatabase />
        )}
        {activeTab === 'excel-import' && (
          <ExcelImportUI />
        )}
      </main>
    </div>
  );
}
