const express = require("express");

const {
  register,
  login,
} = require("./auth.controller");

const authValidation = require("./auth.validation");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/register",
  authValidation.register,
  validate,
  register
);

router.post(
  "/login",
  authValidation.login,
  validate,
  login
);

module.exports = router;