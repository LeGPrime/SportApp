import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

// Pages temporaires pour les routes (à remplacer par tes vraies pages)
const MatchesScreen = () => <div style={{ padding: '2rem' }}><h2>Liste des Matchs</h2><p>Cette page affichera la liste des matchs.</p></div>;
const LoginScreen = () => <div style={{ padding: '2rem' }}><h2>Connexion</h2><p>Formulaire de connexion ici.</p></div>;

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/matches" element={<MatchesScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;