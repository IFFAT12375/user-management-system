const { StatusCodes } = require("http-status-codes");

const userService = require("./user.service");

const {
  sendSuccess,
  sendError,
} = require("../utils/apiResponse");

const logger = require("../utils/logger");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    logger.info(`User created: ${user.email}`);

    return sendSuccess(
      res,
      StatusCodes.CREATED,
      "User created successfully",
      user
    );
  } catch (error) {
    logger.error("Failed to create user", error);

    return sendError(
      res,
      error.statusCode || StatusCodes.BAD_REQUEST,
      error.message
    );
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    return sendSuccess(
      res,
      StatusCodes.OK,
      "Users fetched successfully",
      users
    );
  } catch (error) {
    logger.error("Failed to fetch users", error);

    return sendError(
      res,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    return sendSuccess(
      res,
      StatusCodes.OK,
      "User fetched successfully",
      user
    );
  } catch (error) {
    logger.error("Failed to fetch user", error);

    return sendError(
      res,
      error.statusCode || StatusCodes.NOT_FOUND,
      error.message
    );
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    logger.info(`User updated: ${user.email}`);

    return sendSuccess(
      res,
      StatusCodes.OK,
      "User updated successfully",
      user
    );
  } catch (error) {
    logger.error("Failed to update user", error);

    return sendError(
      res,
      error.statusCode || StatusCodes.BAD_REQUEST,
      error.message
    );
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    logger.info(`User deleted: ${user.email}`);

    return sendSuccess(
      res,
      StatusCodes.OK,
      "User deleted successfully",
      user
    );
  } catch (error) {
    logger.error("Failed to delete user", error);

    return sendError(
      res,
      error.statusCode || StatusCodes.NOT_FOUND,
      error.message
    );
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};