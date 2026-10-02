const express = require("express");
const { createUser } = require("./user.controller");
const validate = require("./user.validation");

const router = express.Router();

router.post(
  "/",
  validate.createUser,
  createUser
);
