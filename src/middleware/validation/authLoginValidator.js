import { body } from "express-validator";

export default [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Email can have a maximum of 255 characters")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];
