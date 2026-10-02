const { StatusCodes } = require("http-status-codes");
const userService = require("./user.service");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const logger = require("../utils/logger");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return sendSuccess(
      res,
      StatusCodes.CREATED,
      "User created successfully",
      user,
    );
  } catch (error) {
        logger.error("Failed to create user", error);
    return sendError(res, StatusCodes.BAD_REQUEST, error.message);
  }
};

module.exports = {
  createUser,
};
