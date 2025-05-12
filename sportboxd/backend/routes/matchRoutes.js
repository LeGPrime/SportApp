const express = require('express');
const { getMatches, getMatchById, getTopMatches } = require('../controllers/matchController');

const router = express.Router();

router.get('/', getMatches);
router.get('/top/:sport', getTopMatches);
router.get('/:id', getMatchById);

module.exports = router;