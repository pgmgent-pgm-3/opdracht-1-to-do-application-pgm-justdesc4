import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// API Controllers
import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./controllers/api/tasks-controller.js";
import {
  getCategories,
  getCategory,
} from "./controllers/api/categories-controller.js";

// Default Controllers
import {
  page,
  editPage,
  registerPage,
  loginPage,
} from "./controllers/controller.js";
import { handlePostTasks } from "./controllers/tasksController.js";
import { createCategory } from "./controllers/categoriesController.js";
import { login, register, logout } from "./controllers/authController.js";

// Lib
import handlebarshelpers from "./lib/handlebarshelpers.js";

// Middleware
import tasksValidator from "./middleware/validation/tasksValidator.js";
import registerValidator from "./middleware/validation/authRegisterValidator.js";
import loginValidator from "./middleware/validation/authLoginValidator.js";
import jwtAuth from "./middleware/jwtAuth.js";

// Express
const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Handlebars
const hbs = create({
  helpers: handlebarshelpers,
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(path.resolve("src"), "views"));

// Static files
app.use(express.static("public"));

// Pages
app.get("/", jwtAuth, page);
app.get("/register", registerPage);
app.get("/login", loginPage);
app.get("/logout", logout);
app.get("/:link", jwtAuth, page);
app.get("/tasks/edit/:taskId", editPage);
app.get("/tasks/:categoryId/:taskId", page); // For the form handling as i can't redirect back

// Tasks API
app.get("/api/task/:id", getTask);
app.get("/api/tasks", getTasks);
app.post("/api/task", createTask);
app.put("/api/task/:id", updateTask);
app.delete("/api/task/:id", deleteTask);

// Handle tasks form
app.post("/tasks/:categoryId/:taskId", tasksValidator, handlePostTasks, page);
app.post("tasks/edit/:taskId", tasksValidator, handlePostTasks);

// Categories API
app.get("/api/categories", getCategories);
app.get("/api/category/:id", getCategory);

// Handle categories form
app.post("/categories", createCategory);

// Register form
app.post("/register", registerValidator, register, loginPage);

// Login form
app.post("/login", loginValidator, login, jwtAuth);

// Port
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}.`);
});
