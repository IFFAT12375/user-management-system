const { StatusCodes } = require("http-status-codes");

const authService = require("./auth.service");

const {
  sendSuccess,
  sendError,
} = require("../utils/apiResponse");

const logger = require("../utils/logger");

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshCookieOptions
    );

    logger.info(`User registered: ${result.user.email}`);

    return sendSuccess(
      res,
      StatusCodes.CREATED,
      "User registered successfully",
      {
        user: result.user,
        accessToken: result.accessToken,
      }
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

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshCookieOptions
    );

    logger.info(`User logged in: ${result.user.email}`);

    return sendSuccess(
      res,
      StatusCodes.OK,
      "Login successful",
      {
        user: result.user,
        accessToken: result.accessToken,
      }
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

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const result =
      await authService.refreshAccessToken(refreshToken);

    return sendSuccess(
      res,
      StatusCodes.OK,
      "Access token refreshed successfully",
      result
    );
  } catch (error) {
    logger.error("Token refresh failed", error);

    return sendError(
      res,
      error.statusCode || StatusCodes.UNAUTHORIZED,
      error.message
    );
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return sendSuccess(
      res,
      StatusCodes.OK,
      "Logout successful"
    );
  } catch (error) {
    logger.error("Logout failed", error);

    return sendError(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Logout failed"
    );
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};