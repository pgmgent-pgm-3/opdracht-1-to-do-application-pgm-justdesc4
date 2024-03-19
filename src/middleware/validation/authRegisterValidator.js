import { body } from "express-validator";

export default [
  // firstname
  body("firstname").notEmpty().withMessage("First name is a required field."),
  // lastname
  body("lastname").notEmpty().withMessage("Last name is a required field."),
  // email
  body("email")
    .notEmpty()
    .withMessage("Email is a required field.")
    .bail()
    .isEmail()
    .withMessage("Invalid email address."),
  // password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least six characters long."),
];
