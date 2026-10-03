const { StatusCodes } = require("http-status-codes");

const {
  verifyAccessToken,
} = require("../utils/jwt");

const {
  sendError,
} = require("../utils/apiResponse");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return sendError(
        res,
        StatusCodes.UNAUTHORIZED,
        "Access token is required"
      );
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return sendError(
        res,
        StatusCodes.UNAUTHORIZED,
        "Invalid authorization format"
      );
    }

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return sendError(
      res,
      StatusCodes.UNAUTHORIZED,
      "Invalid or expired access token"
    );
  }
};

module.exports = authenticate;