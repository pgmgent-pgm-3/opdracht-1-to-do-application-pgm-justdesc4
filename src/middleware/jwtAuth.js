import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
  try {
    const userToken = req.cookies.user || req.headers.user;

    if (!userToken) {
      const message = "Sorry, you need to be logged in to use the app.";
      if (req.path.startsWith("/api/")) {
        return res.status(401).json({ message });
      } else {
        req.flash = {
          type: "danger",
          message,
        };
        return res.render("login", { flash: req.flash });
      }
    }

    const userData = jwt.verify(userToken, process.env.TOKEN_SALT);
    if (!userData) {
      const message = "User data not found!";
      if (req.path.startsWith("/api/")) {
        return res.status(401).json({ message });
      } else {
        req.flash = {
          type: "danger",
          message,
        };
        return res.render("login", { flash: req.flash });
      }
    }

    const user = await User.query().findById(userData.id);
    if (!user) {
      const message = "User not found!";
      if (req.path.startsWith("/api/")) {
        return res.status(401).json({ message });
      } else {
        req.flash = {
          type: "danger",
          message,
        };
        return res.render("login", { flash: req.flash });
      }
    }

    req.user = user;
    req.loggedIn = true;

    return next();
  } catch (e) {
    if (req.path.startsWith("/api/")) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      return res.redirect("/login");
    }
  }
};
