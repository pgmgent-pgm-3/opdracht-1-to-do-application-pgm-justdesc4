import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

/**
 * ============================================
 * Login form
 * ============================================
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.query().where("email", email).first();
    const errors = validationResult(req);

    if (!user) {
      req.flash = {
        type: "danger",
        message: "User not found!",
      };
      return res.render("login", { flash: req.flash });
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

      return res.render("login", { flash: req.flash });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      req.flash = {
        type: "danger",
        message: "Invalid password!",
      };
      return res.render("login", { flash: req.flash });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.TOKEN_SALT,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("user", token, { httpOnly: true });
    res.redirect(`/?msg=Welcome, ${user.firstname} ${user.lastname}!`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
