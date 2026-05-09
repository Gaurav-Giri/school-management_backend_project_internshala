const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const { validateAddSchool, validateListSchools } = require('../middleware/validation');

/**
 * @route   POST /addSchool
 * @desc    Add a new school
 * @access  Public
 */
router.post('/addSchool', validateAddSchool, schoolController.addSchool);

/**
 * @route   GET /listSchools
 * @desc    List all schools sorted by distance
 * @access  Public
 */
router.get('/listSchools', validateListSchools, schoolController.listSchools);

module.exports = router;
