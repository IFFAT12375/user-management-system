const { body, param } = require("express-validator");

const userValidation = {
  createUser: [
    body().custom((value) => {
      const allowedFields = ["name", "email", "password"];
      const invalidFields = Object.keys(value || {}).filter(
        (field) => !allowedFields.includes(field)
      );

      if (invalidFields.length > 0) {
        throw new Error("Only name, email, and password can be provided");
      }

      return true;
    }),

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

  ],

  getUserById: [param("id").isMongoId().withMessage("Invalid user ID")],

  updateUser: [
    param("id").isMongoId().withMessage("Invalid user ID"),

    body().custom((value) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error("User details are required");
      }

      const allowedFields = ["name", "email"];
      const invalidFields = Object.keys(value).filter(
        (field) => !allowedFields.includes(field)
      );

      if (invalidFields.length > 0) {
        throw new Error("Only name and email can be updated");
      }

      if (Object.keys(value).length === 0) {
        throw new Error("At least one user detail must be provided");
      }

      return true;
    }),

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

  ],

  deleteUser: [param("id").isMongoId().withMessage("Invalid user ID")],
};

module.exports = userValidation;
