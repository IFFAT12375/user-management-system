const express = require('express');
const cors = require('cors');
const connectDB = require('./mongodb/connection')
require('dotenv').config();
const httpLogger = require("./utils/httpLogger");
const logger = require("./utils/logger");

const app = express();
app.use(express.json());
app.use(httpLogger);
app.use(cors());

// Connect to MongoDB (replace with your database link)
connectDB(process.env.MONGO_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>   logger.info(`Server running on port ${PORT}`));
