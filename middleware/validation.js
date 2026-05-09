const { body, query, validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

/**
 * Validation rules for adding a school
 */
const validateAddSchool = [
    body('name')
        .trim()
        .notEmpty().withMessage('School name is required')
        .isString().withMessage('Name must be a string'),
    body('address')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isString().withMessage('Address must be a string'),
    body('latitude')
        .notEmpty().withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid float between -90 and 90'),
    body('longitude')
        .notEmpty().withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid float between -180 and 180'),
    handleValidationErrors
];

/**
 * Validation rules for listing schools
 */
const validateListSchools = [
    query('latitude')
        .notEmpty().withMessage('User latitude is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid float'),
    query('longitude')
        .notEmpty().withMessage('User longitude is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid float'),
    handleValidationErrors
];

module.exports = {
    validateAddSchool,
    validateListSchools
};
