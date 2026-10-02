const { body, param } = require("express-validator");

const userValidation = {
  createUser: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("role")
      .optional()
      .isString()
      .withMessage("Role must be a string"),
  ],

  getUserById: [
    param("id")
      .isMongoId()
      .withMessage("Invalid user ID"),
  ],

  updateUser: [
    param("id")
      .isMongoId()
      .withMessage("Invalid user ID"),

    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),

    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email"),

    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("role")
      .optional()
      .isString()
      .withMessage("Role must be a string"),
  ],

  deleteUser: [
    param("id")
      .isMongoId()
      .withMessage("Invalid user ID"),
  ],
};

module.exports = userValidation;