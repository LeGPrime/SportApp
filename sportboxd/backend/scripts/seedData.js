// backend/scripts/seedData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Match = require('../models/matchModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

// Charger les variables d'environnement
dotenv.config();

// Connecter à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error(err));

// Données de test pour les matchs
const matchData = [
  {
    externalId: 'football_123456',
    sport: 'football',
    homeTeam: {
      id: '1',
      name: 'Paris Saint-Germain',
      logo: 'https://media.api-sports.io/football/teams/85.png'
    },
    awayTeam: {
      id: '2',
      name: 'Olympique de Marseille',
      logo: 'https://media.api-sports.io/football/teams/81.png'
    },
    date: new Date('2025-05-10T20:00:00Z'),
    score: {
      home: 3,
      away: 1
    },
    venue: {
      name: 'Parc des Princes',
      city: 'Paris',
      country: 'France'
    },
    league: {
      id: '1',
      name: 'Ligue 1',
      logo: 'https://media.api-sports.io/football/leagues/61.png',
      country: 'France'
    },
    status: 'finished',
    details: {
      referee: 'John Doe',
      halftime: {
        home: 1,
        away: 1
      },
      fulltime: {
        home: 3,
        away: 1
      }
    },
    stats: {
      averageRating: 4.2,
      totalRatings: 15,
      reviewCount: 10
    }
  },
  // Ajoute plus de matchs ici
];

// Fonction pour ajouter les données
const seedDatabase = async () => {
  try {
    // Supprimer les données existantes
    await Match.deleteMany({});
    
    // Ajouter les nouvelles données
    const createdMatches = await Match.insertMany(matchData);
    
    console.log('Database seeded!');
    console.log(`${createdMatches.length} matches added`);
    
    // Déconnecter de MongoDB
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Exécuter la fonction de seeding
seedDatabase();