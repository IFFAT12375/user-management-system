const mongoose = require('mongoose');
const logger = require("../utils/logger");

async function connectDB(url) {
    try {
        await mongoose.connect(url);
    logger.info("MongoDB connected successfully");
    } catch (error) {
    logger.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;