const { StatusCodes } = require("http-status-codes");

const authService = require("./auth.service");

const {
  sendSuccess,
  sendError,
} = require("../../utils/apiResponse");

const logger = require("../../utils/logger");

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    logger.info(`User registered: ${result.user.email}`);

    return sendSuccess(
      res,
      StatusCodes.CREATED,
      "User registered successfully",
      result
    );
  } catch (error) {
    logger.error("Registration failed", error);

    return sendError(
      res,
      error.statusCode || StatusCodes.BAD_REQUEST,
      error.message
    );
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    logger.info(`User logged in: ${result.user.email}`);

    return sendSuccess(
      res,
      StatusCodes.OK,
      "Login successful",
      result
    );
  } catch (error) {
    logger.error("Login failed", error);

    return sendError(
      res,
      error.statusCode || StatusCodes.UNAUTHORIZED,
      error.message
    );
  }
};

module.exports = {
  register,
  login,
};