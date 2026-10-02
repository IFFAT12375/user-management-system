const express = require("express");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./user.controller");

const userValidation = require("./user.validation");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/",
  userValidation.createUser,
  validate,
  createUser
);

router.get(
  "/",
  getUsers
);

router.get(
  "/:id",
  userValidation.getUserById,
  validate,
  getUserById
);

router.patch(
  "/:id",
  userValidation.updateUser,
  validate,
  updateUser
);

router.delete(
  "/:id",
  userValidation.deleteUser,
  validate,
  deleteUser
);

module.exports = router;