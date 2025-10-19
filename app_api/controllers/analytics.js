const Trip = require('../models/trip');
const logger = require('../utils/logger');

// Get travel statistics
exports.getStats = async (req, res) => {
    try {
        const stats = await Trip.aggregate([
            {
                $group: {
                    _id: null,
                    totalTrips: { $sum: 1 },
                    avgPrice: { $avg: "$price" },
                    destinations: { $addToSet: "$destination" }
                }
            }
        ]);

        logger.info("Analytics data retrieved successfully.");
        res.status(200).json({
            message: "Analytics report generated",
            stats: stats[0] || { totalTrips: 0, avgPrice: 0, destinations: [] }
        });
    } catch (err) {
        logger.error(`Analytics generation failed: ${err.message}`);
        res.status(500).json({ message: "Error generating analytics", error: err.message });
    }
};
