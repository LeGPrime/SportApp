import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

// Composants
import Header from './components/Header';
import Footer from './components/Footer';

// Écrans
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import MatchScreen from './screens/MatchScreen';
import MatchListScreen from './screens/MatchListScreen';
import ReviewScreen from './screens/ReviewScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '80vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/match/:id" element={<MatchScreen />} />
            <Route path="/matches" element={<MatchListScreen />} />
            <Route path="/matches/:sport" element={<MatchListScreen />} />
            <Route path="/review/:id" element={<ReviewScreen />} />
            <Route path="/search/:keyword" element={<MatchListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;