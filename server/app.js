const express = require('express');
const cors = require('cors');
const httpLogger = require("./utils/httpLogger");
const authRoutes = require("./authentication/auth.routes");
const userRoutes = require("./user-management/user.route");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(httpLogger);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;