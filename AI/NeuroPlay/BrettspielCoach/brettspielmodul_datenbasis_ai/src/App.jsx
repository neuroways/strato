import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import GameDetailPage from './pages/GameDetailPage';
import CoachPage from './pages/CoachPage';
import CollectionPage from './pages/CollectionPage';
import './App.css';
import './pages/pages.css';

function App() {
  return (
    <BrowserRouter basename={new URL(document.baseURI).pathname.replace(/\/$/, '')}>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<CatalogPage />} />
          <Route path="/games/:id" element={<GameDetailPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="logo-text">NeuroPlay</span>
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Startseite</Link></li>
          <li><Link to="/games">Katalog</Link></li>
          <li><Link to="/coach">Regelcoach</Link></li>
          <li><Link to="/collection">Mein Bestand</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default App;
