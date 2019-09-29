const express = require('express');
const router = express.Router();

const handwriting = require('../controllers/handwriting');

// @route   GET api/handwriting
// @desc     get handwritings possibility
// @access  Public
router.get('/', handwriting.get_handwriting);

// @route   GET api/handwriting/png
// @desc    get png with format
// @access  Public
router.get('/png', handwriting.get_render_png);

// @route   GET api/handwriting/pdf
// @desc    get pdf with format
// @access  Public
router.get('/pdf', handwriting.get_render_pdf);

// @route   GET api/handwriting/id
// @desc    get handwriting by id
router.get('/id', handwriting.get_handwriting_id);

module.exports = router;
