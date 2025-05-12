const Match = require('../models/matchModel');

// @desc    Récupérer tous les matchs avec pagination et filtres
// @route   GET /api/matches
// @access  Public
const getMatches = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    // Construire la requête avec les filtres
    const query = {};
    
    // Filtre par sport
    if (req.query.sport) {
      query.sport = req.query.sport;
    }
    
    // Filtre par équipe
    if (req.query.team) {
      query.$or = [
        { 'homeTeam.name': { $regex: req.query.team, $options: 'i' } },
        { 'awayTeam.name': { $regex: req.query.team, $options: 'i' } }
      ];
    }
    
    // Filtre par date (matches après une certaine date)
    if (req.query.fromDate) {
      query.date = { $gte: new Date(req.query.fromDate) };
    }
    
    // Filtre par date (matches avant une certaine date)
    if (req.query.toDate) {
      if (query.date) {
        query.date.$lte = new Date(req.query.toDate);
      } else {
        query.date = { $lte: new Date(req.query.toDate) };
      }
    }

    // Tri
    let sortOption = {};
    if (req.query.sort === 'rating') {
      sortOption = { 'stats.averageRating': -1 };
    } else if (req.query.sort === 'newest') {
      sortOption = { date: -1 };
    } else if (req.query.sort === 'oldest') {
      sortOption = { date: 1 };
    } else {
      // Par défaut, tri par date décroissante
      sortOption = { date: -1 };
    }

    const count = await Match.countDocuments(query);
    const matches = await Match.find(query)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      matches,
      page,
      pages: Math.ceil(count / pageSize),
      totalMatches: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer un match par ID
// @route   GET /api/matches/:id
// @access  Public
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ message: 'Match non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer les meilleurs matchs
// @route   GET /api/matches/top/:sport
// @access  Public
const getTopMatches = async (req, res) => {
  try {
    const { sport } = req.params;
    const limit = Number(req.query.limit) || 10;
    const period = req.query.period || 'all'; // 'week', 'month', 'year', 'all'
    
    // Construire la requête avec les filtres
    const query = {};
    
    if (sport !== 'all') {
      query.sport = sport;
    }
    
    // Filtre par période
    if (period === 'week') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      query.date = { $gte: lastWeek };
    } else if (period === 'month') {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      query.date = { $gte: lastMonth };
    } else if (period === 'year') {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      query.date = { $gte: lastYear };
    }
    
    // Ajouter un filtre pour exclure les matchs avec trop peu d'avis
    query['stats.totalRatings'] = { $gte: 3 };

    const topMatches = await Match.find(query)
      .sort({ 'stats.averageRating': -1 })
      .limit(limit);

    res.json(topMatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMatches, getMatchById, getTopMatches };