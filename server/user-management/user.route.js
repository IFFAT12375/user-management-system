const express = require("express");
const validate = require("./user.validation");

const router = express.Router();

router.post(
  "/",
  validate.createUser,
  createUser
);
