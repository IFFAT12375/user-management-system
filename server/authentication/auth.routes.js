const express = require("express");

const { register, login, refresh, logout, getMe } = require("./auth.controller");

const authValidation = require("./auth.validation");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", validate(authValidation.register), register);

router.post("/login", validate(authValidation.login), login);

router.post("/refresh", refresh);

router.post("/logout", logout);

router.get("/me", authenticate, getMe);

module.exports = router;
