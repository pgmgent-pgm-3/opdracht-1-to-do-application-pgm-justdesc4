import User from "../models/User.js";
import bcrypt from "bcrypt";

/**
 * ============================================
 * Register form
 * ============================================
 */
export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.query().where("email", email).first();

    if (existingUser) {
      req.flash = {
        type: "danger",
        message: "User already exists!",
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
