const { StatusCodes } = require("http-status-codes");

const {
  sendError,
} = require("../utils/apiResponse");

const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return sendError(
      res,
      StatusCodes.UNAUTHORIZED,
      "Authentication required"
    );
  }

  if (req.user.role !== "Admin") {
    return sendError(
      res,
      StatusCodes.FORBIDDEN,
      "Admin access required"
    );
  }

  next();
};

module.exports = authorizeAdmin;