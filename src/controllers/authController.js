import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

/**
 * ============================================
 * Register form
 * ============================================
 */
export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.query().where("email", email).first();
    const errors = validationResult(req);

    if (existingUser) {
      req.flash = {
        type: "danger",
        message: "User already exists!",
      };
      return res.render("register", { flash: req.flash });
    }

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      req.flash = {
        type: "danger",
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      };

      return res.render("register", { flash: req.flash });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.query().insert({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
