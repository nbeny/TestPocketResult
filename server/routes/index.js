const express = require('express');
const router = express.Router();

const index = require('../controllers/index');

// @route   GET api
// @desc    Index api
// @access  Public
router.get('/', index.get_index);
