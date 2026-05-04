const Favorite = require('../models/Favorite.model');
const Template = require('../models/Template.model');

// @desc    Toggle favorite (add/remove)
// @route   POST /api/favorites/:templateId
// @access  Private
const toggleFavorite = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    const userId = req.user._id;

    // Check if template exists
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found.',
      });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({ user: userId, template: templateId });

    if (existingFavorite) {
      // Remove from favorites
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({
        success: true,
        message: 'Template removed from favorites.',
        isFavorited: false,
      });
    } else {
      // Add to favorites
      await Favorite.create({ user: userId, template: templateId });
      return res.status(201).json({
        success: true,
        message: 'Template added to favorites!',
        isFavorited: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all favorites for logged-in user
// @route   GET /api/favorites
// @access  Private
const getUserFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('template')
      .sort({ createdAt: -1 });

    const templates = favorites.map((fav) => fav.template).filter(Boolean);

    res.status(200).json({
      success: true,
      count: templates.length,
      templates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if template is favorited by current user
// @route   GET /api/favorites/check/:templateId
// @access  Private
const checkFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOne({
      user: req.user._id,
      template: req.params.templateId,
    });

    res.status(200).json({
      success: true,
      isFavorited: !!favorite,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all favorited template IDs for current user
// @route   GET /api/favorites/ids
// @access  Private
const getFavoriteIds = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).select('template');
    const ids = favorites.map((f) => f.template.toString());

    res.status(200).json({ success: true, favoriteIds: ids });
  } catch (error) {
    next(error);
  }
};

module.exports = { toggleFavorite, getUserFavorites, checkFavorite, getFavoriteIds };
