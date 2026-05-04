const Template = require('../models/Template.model');
const Favorite = require('../models/Favorite.model');

// @desc    Get all templates (with search & category filter)
// @route   GET /api/templates
// @access  Public
const getAllTemplates = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const total = await Template.countDocuments(query);
    const templates = await Template.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: templates.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      templates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single template
// @route   GET /api/templates/:id
// @access  Public
const getTemplateById = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found.',
      });
    }

    res.status(200).json({ success: true, template });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTemplates, getTemplateById };
