const express = require('express');
const { getAllTemplates, getTemplateById } = require('../controllers/template.controller');

const router = express.Router();

router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);

module.exports = router;
