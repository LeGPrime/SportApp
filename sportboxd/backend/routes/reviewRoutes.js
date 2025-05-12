const express = require('express');
const { createReview, getReviewsByMatch, getReviewById, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createReview);
router.get('/match/:matchId', getReviewsByMatch);
router.route('/:id')
  .get(getReviewById)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;