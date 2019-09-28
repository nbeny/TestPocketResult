const express = require('express');
const router = express.Router();

const handwriting = require('../controllers/handwriting');

// @route   GET api/handwriting
// @desc     get handwritings possibility
// @access  Public
router.get('/', handwriting.get_handwriting);

// @route   GET api/render_png
// @desc    get image with format
// @access  Public
router.get('/png', handwriting.get_render_png);

module.exports = router;
