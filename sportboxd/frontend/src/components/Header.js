import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ background: '#333', color: 'white', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Sportboxd</h1>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
            <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link></li>
            <li><Link to="/matches" style={{ color: 'white', textDecoration: 'none' }}>Matchs</Link></li>
            <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Connexion</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;