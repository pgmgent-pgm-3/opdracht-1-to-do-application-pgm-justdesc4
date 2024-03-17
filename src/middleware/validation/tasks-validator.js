import { body } from "express-validator";

export default [
  body("task")
    .notEmpty()
    .withMessage("Sorry, the task is required!")
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage("Sorry, the task must be at least 3 characters long."),
];
