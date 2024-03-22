import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
  try {
    const userToken = req.cookies.user;

    if (!userToken) {
      req.flash = {
        type: "danger",
        message: "Please login!",
      };
      return res.render("login", { flash: req.flash });
    }
    const userData = jwt.verify(userToken, process.env.TOKEN_SALT);
    if (!userData) {
      req.flash = {
        type: "danger",
        message: "User data not found!",
      };
      return res.render("login", { flash: req.flash });
    }

    const user = await User.query().findById(userData.id);
    if (!user) {
      req.flash = {
        type: "danger",
        message: "User not found!",
      };
      return res.render("login", { flash: req.flash });
    }

    req.user = user;
    req.loggedIn = true;

    return next();
  } catch (e) {
    res.redirect("/login");
  }
};
