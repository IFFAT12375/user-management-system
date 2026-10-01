const express = require('express');
const cors = require('cors');
const connectDB = require('./mongodb/connection')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace with your database link)
connectDB(process.env.MONGO_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
