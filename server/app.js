const express = require('express');
const cors = require('cors');
const httpLogger = require("./utils/httpLogger");
const userRoutes = require("./user-management/user.route");


const app = express();
app.use(express.json());
app.use(httpLogger);
app.use(cors());

app.use("/api/users", userRoutes);

module.exports = app;