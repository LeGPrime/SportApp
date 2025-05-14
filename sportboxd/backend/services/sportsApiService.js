const axios = require('axios');
const Match = require('../models/matchModel');

// Configurer les API keys
const FOOTBALL_API_KEY = process.env.API_FOOTBALL_KEY;
const BASKETBALL_API_KEY = process.env.API_BASKETBALL_KEY;
const TENNIS_API_KEY = process.env.API_TENNIS_KEY;

// Base URLs pour les API
const FOOTBALL_API_URL = 'https://api-football-v1.p.rapidapi.com/v3';
const BASKETBALL_API_URL = 'https://api-basketball-v1.p.rapidapi.com/v1';
const TENNIS_API_URL = 'https://api-tennis-v1.p.rapidapi.com/v1';

// Fonction pour récupérer les matchs de football
const fetchFootballMatches = async (date) => {
  try {
    const response = await axios.get(`${FOOTBALL_API_URL}/fixtures`, {
      params: { date },
      headers: {
        'x-rapidapi-key': FOOTBALL_API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      },
    });

    const matches = response.data.response.map((fixture) => ({
      externalId: `football_${fixture.fixture.id}`,
      sport: 'football',
      homeTeam: {
        id: fixture.teams.home.id.toString(),
        name: fixture.teams.home.name,
        logo: fixture.teams.home.logo,
      },
      awayTeam: {
        id: fixture.teams.away.id.toString(),
        name: fixture.teams.away.name,
        logo: fixture.teams.away.logo,
      },
      date: new Date(fixture.fixture.date),
      score: {
        home: fixture.goals.home,
        away: fixture.goals.away,
      },
      venue: {
        name: fixture.fixture.venue.name,
        city: fixture.fixture.venue.city,
        country: '',
      },
      league: {
        id: fixture.league.id.toString(),
        name: fixture.league.name,
        logo: fixture.league.logo,
        country: fixture.league.country,
      },
      status: mapStatus(fixture.fixture.status.short),
      details: {
        referee: fixture.fixture.referee,
        halftime: fixture.score.halftime,
        fulltime: fixture.score.fulltime,
        events: [], // À remplir avec une autre requête API si nécessaire
      },
    }));

    return matches;
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs de football:', error);
    throw error;
  }
};

// Fonction pour récupérer les matchs de basketball
const fetchBasketballMatches = async (date) => {
  try {
    const response = await axios.get(`${BASKETBALL_API_URL}/games`, {
      params: { date },
      headers: {
        'x-rapidapi-key': BASKETBALL_API_KEY,
        'x-rapidapi-host': 'api-basketball-v1.p.rapidapi.com',
      },
    });

    const matches = response.data.response.map((game) => ({
      externalId: `basketball_${game.id}`,
      sport: 'basketball',
      homeTeam: {
        id: game.teams.home.id.toString(),
        name: game.teams.home.name,
        logo: game.teams.home.logo,
      },
      awayTeam: {
        id: game.teams.away.id.toString(),
        name: game.teams.away.name,
        logo: game.teams.away.logo,
      },
      date: new Date(game.date),
      score: {
        home: game.scores.home.total,
        away: game.scores.away.total,
      },
      venue: {
        name: '',
        city: '',
        country: '',
      },
      league: {
        id: game.league.id.toString(),
        name: game.league.name,
        logo: game.league.logo,
        country: game.country.name,
      },
      status: mapStatus(game.status.short),
      details: {
        quarters: game.scores,
        // Plus de détails selon l'API
      },
    }));

    return matches;
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs de basketball:', error);
    throw error;
  }
};

// Fonction pour récupérer les matchs de tennis
const fetchTennisMatches = async (date) => {
  try {
    const response = await axios.get(`${TENNIS_API_URL}/matches`, {
      params: { date },
      headers: {
        'x-rapidapi-key': TENNIS_API_KEY,
        'x-rapidapi-host': 'api-tennis-v1.p.rapidapi.com',
      },
    });

    const matches = response.data.response.map((match) => ({
      externalId: `tennis_${match.id}`,
      sport: 'tennis',
      homeTeam: {
        id: match.player1.id.toString(),
        name: match.player1.name,
        logo: match.player1.photo,
      },
      awayTeam: {
        id: match.player2.id.toString(),
        name: match.player2.name,
        logo: match.player2.photo,
      },
      date: new Date(match.date),
      score: {
        home: 0, // À adapter selon le format de l'API
        away: 0,
      },
      venue: {
        name: '',
        city: match.city || '',
        country: match.country || '',
      },
      league: {
        id: match.tournament.id.toString(),
        name: match.tournament.name,
        logo: match.tournament.logo,
        country: match.country.name,
      },
      status: mapStatus(match.status.short),
      details: {
        surface: match.tournament.surface,
        sets: match.sets,
        // Plus de détails selon l'API
      },
    }));

    return matches;
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs de tennis:', error);
    throw error;
  }
};

// Fonction pour mapper les statuts entre les API et notre modèle
const mapStatus = (apiStatus) => {
  // Exemple de mapping, à adapter selon les API
  switch (apiStatus) {
    case 'NS':
    case 'TBD':
      return 'scheduled';
    case 'LIVE':
    case '1H':
    case '2H':
    case 'ET':
      return 'live';
    case 'FT':
    case 'AET':
    case 'PEN':
      return 'finished';
    case 'PST':
    case 'SUSP':
      return 'postponed';
    case 'CANC':
    case 'ABD':
      return 'canceled';
    default:
      return 'scheduled';
  }
};

// Fonction pour sauvegarder les matchs dans la base de données
const saveMatchesToDatabase = async (matches) => {
  try {
    // Pour chaque match, on essaie de le trouver par externalId
    // S'il existe, on le met à jour, sinon on le crée
    for (const matchData of matches) {
      const existingMatch = await Match.findOne({
        externalId: matchData.externalId,
      });

      if (existingMatch) {
        //// Mettre à jour le match existant avec les nouvelles données
        Object.assign(existingMatch, matchData);
        await existingMatch.save();
      } else {
        // Créer un nouveau match
        const newMatch = new Match(matchData);
        await newMatch.save();
      }
    }
    
    console.log(`${matches.length} matchs sauvegardés dans la base de données.`);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des matchs:', error);
    throw error;
  }
};

// Fonction principale pour récupérer et sauvegarder les matchs
const updateMatches = async (date = new Date().toISOString().split('T')[0]) => {
  try {
    console.log(`Mise à jour des matchs pour la date: ${date}`);
    
    // Récupérer les matchs de différents sports
    const footballMatches = await fetchFootballMatches(date);
    console.log(`${footballMatches.length} matchs de football récupérés.`);
    
    // Sauvegarder les matchs dans la base de données
    await saveMatchesToDatabase(footballMatches);
    
    // Tu peux ajouter les autres sports quand tu auras les API keys
    // const basketballMatches = await fetchBasketballMatches(date);
    // await saveMatchesToDatabase(basketballMatches);
    
    // const tennisMatches = await fetchTennisMatches(date);
    // await saveMatchesToDatabase(tennisMatches);
    
    return {
      football: footballMatches.length,
      // basketball: basketballMatches.length,
      // tennis: tennisMatches.length
    };
  } catch (error) {
    console.error('Erreur lors de la mise à jour des matchs:', error);
    throw error;
  }
};

module.exports = {
  fetchFootballMatches,
  fetchBasketballMatches,
  fetchTennisMatches,
  saveMatchesToDatabase,
  updateMatches
};