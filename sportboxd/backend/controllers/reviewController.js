const Review = require('../models/reviewModel');
const Match = require('../models/matchModel');

// @desc    Créer un nouvel avis
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { matchId, rating, title, text, detailedRatings, containsSpoilers } = req.body;

    // Vérifier si l'utilisateur a déjà laissé un avis pour ce match
    const existingReview = await Review.findOne({
      user: req.user._id,
      match: matchId,
    });

    if (existingReview) {
      res.status(400).json({ message: 'Vous avez déjà laissé un avis pour ce match' });
      return;
    }

    // Créer un nouvel avis
    const review = new Review({
      user: req.user._id,
      match: matchId,
      rating,
      title,
      text,
      detailedRatings: detailedRatings || {},
      containsSpoilers: containsSpoilers || false,
    });

    const createdReview = await review.save();

    // Mettre à jour les statistiques du match
    const match = await Match.findById(matchId);
    if (match) {
      // Calculer la nouvelle moyenne
      const totalRating = match.stats.averageRating * match.stats.totalRatings + rating;
      const newTotalRatings = match.stats.totalRatings + 1;
      const newAverageRating = totalRating / newTotalRatings;

      match.stats.averageRating = newAverageRating;
      match.stats.totalRatings = newTotalRatings;
      match.stats.reviewCount += 1;

      await match.save();
    }

    // Peupler les données utilisateur pour la réponse
    await createdReview.populate('user', 'username profilePicture');

    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtenir tous les avis pour un match
// @route   GET /api/reviews/match/:matchId
// @access  Public
const getReviewsByMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const count = await Review.countDocuments({ match: matchId });
    
    const reviews = await Review.find({ match: matchId })
      .populate('user', 'username profilePicture')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({
      reviews,
      page,
      pages: Math.ceil(count / pageSize),
      totalReviews: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtenir un avis par ID
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'username profilePicture')
      .populate('match');
    
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Avis non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mettre à jour un avis
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const { rating, title, text, detailedRatings, containsSpoilers } = req.body;
    
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      res.status(404).json({ message: 'Avis non trouvé' });
      return;
    }
    
    // Vérifier si l'utilisateur est le propriétaire de l'avis
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Non autorisé' });
      return;
    }
    
    // Mettre à jour les statistiques du match si la note a changé
    if (rating !== review.rating) {
      const match = await Match.findById(review.match);
      if (match) {
        // Soustraire l'ancienne note et ajouter la nouvelle
        const totalRating = match.stats.averageRating * match.stats.totalRatings;
        const newTotalRating = totalRating - review.rating + rating;
        const newAverageRating = newTotalRating / match.stats.totalRatings;
        
        match.stats.averageRating = newAverageRating;
        await match.save();
      }
    }
    
    // Mettre à jour l'avis
    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.text = text || review.text;
    
    if (detailedRatings) {
      review.detailedRatings = {
        ...review.detailedRatings,
        ...detailedRatings,
      };
    }
    
    if (containsSpoilers !== undefined) {
      review.containsSpoilers = containsSpoilers;
    }
    
    const updatedReview = await review.save();
    await updatedReview.populate('user', 'username profilePicture');
    
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Supprimer un avis
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      res.status(404).json({ message: 'Avis non trouvé' });
      return;
    }
    
    // Vérifier si l'utilisateur est le propriétaire de l'avis
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Non autorisé' });
      return;
    }
    
    // Mettre à jour les statistiques du match
    const match = await Match.findById(review.match);
    if (match) {
      if (match.stats.totalRatings > 1) {
        // Recalculer la moyenne sans cet avis
        const totalRating = match.stats.averageRating * match.stats.totalRatings;
        const newTotalRating = totalRating - review.rating;
        const newTotalRatings = match.stats.totalRatings - 1;
        const newAverageRating = newTotalRating / newTotalRatings;
        
        match.stats.averageRating = newAverageRating;
        match.stats.totalRatings = newTotalRatings;
      } else {
        // S'il n'y a plus d'avis, réinitialiser les statistiques
        match.stats.averageRating = 0;
        match.stats.totalRatings = 0;
      }
      
      match.stats.reviewCount -= 1;
      await match.save();
    }
    
    await review.deleteOne();
    
    res.json({ message: 'Avis supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByMatch,
  getReviewById,
  updateReview,
  deleteReview,
};