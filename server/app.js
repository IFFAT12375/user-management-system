const express = require('express');
const cors = require('cors');
const httpLogger = require("./utils/httpLogger");
const authRoutes = require("./authentication/auth.routes");
const userRoutes = require("./user-management/user.route");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const openapiSpec = require("./docs/openapi");

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

app.get("/api-docs.json", (req, res) => {
  res.json(openapiSpec);
});
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpec, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: false,
      tryItOutEnabled: true,
    },
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;