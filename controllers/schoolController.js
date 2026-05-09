const pool = require('../config/db');
const calculateDistance = require('../utils/distanceCalculator');

/**
 * Add a new school
 */
exports.addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        const [result] = await pool.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        res.status(201).json({
            success: true,
            message: 'School added successfully',
            data: {
                id: result.insertId
            }
        });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

/**
 * List all schools sorted by distance from user location
 */
exports.listSchools = async (req, res) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);

        // Fetch all schools from the database
        const [schools] = await pool.execute('SELECT * FROM schools');

        // Calculate distance for each school and sort
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            );
            return { ...school, distance_km: distance };
        });

        // Sort by distance (ascending)
        schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

        res.status(200).json({
            success: true,
            count: schoolsWithDistance.length,
            data: schoolsWithDistance
        });
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
