const express = require('express');
const { toggleFavorite, getUserFavorites, checkFavorite, getFavoriteIds } = require('../controllers/favorite.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All favorites routes are protected
router.use(protect);

router.get('/', getUserFavorites);
router.get('/ids', getFavoriteIds);
router.get('/check/:templateId', checkFavorite);
router.post('/:templateId', toggleFavorite);

module.exports = router;
