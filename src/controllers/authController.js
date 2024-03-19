// Import the models and the bcrypt library.
import User from "../models/User.js";
import bcrypt from "bcrypt";

/**
 * ============================================
 * Register form
 * ============================================
 */

// Register form and save password hashed to the database, then redirect to the login page.
export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await User.query().where("email", email).first();

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
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
