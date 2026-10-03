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

const authenticate = require("../middleware/authenticate");
const authorizeAdmin = require("../middleware/authorizeAdmin");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeAdmin,
  validate(userValidation.createUser),
  createUser,
);

router.get("/", authenticate, getUsers);

router.get(
  "/:id",
  authenticate,
  validate(userValidation.getUserById),
  getUserById,
);

router.patch(
  "/:id",
  authenticate,
  validate(userValidation.updateUser),
  updateUser,
);

router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  validate(userValidation.deleteUser),
  deleteUser,
);

module.exports = router;
