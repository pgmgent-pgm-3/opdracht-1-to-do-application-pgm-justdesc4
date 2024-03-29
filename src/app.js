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
} from "./controllers/api/tasksController.js";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./controllers/api/categoriesController.js";
import { getUsers, getUser } from "./controllers/api/userController.js";

// Default Controllers
import {
  home,
  page,
  editPage,
  registerPage,
  loginPage,
} from "./controllers/controller.js";
import { handlePostTasks } from "./controllers/tasksController.js";
import { handlePostCategories } from "./controllers/categoriesController.js";
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
app.get("/register", registerPage);
app.get("/login", loginPage);
app.get("/logout", logout);
app.get("/", jwtAuth, home);
app.get("/:link", jwtAuth, page);
app.get("/tasks/edit/:taskId", jwtAuth, editPage);
app.get("/categories/edit/:categoryId", jwtAuth, editPage);

// Tasks API
app.get("/api/task/:id", jwtAuth, getTask);
app.get("/api/tasks", jwtAuth, getTasks);
app.post("/api/task", jwtAuth, createTask);
app.put("/api/task/:id", jwtAuth, updateTask);
app.delete("/api/task/:id", jwtAuth, deleteTask);

// Handle tasks form
app.post(
  "/tasks/:categoryId/:taskId",
  tasksValidator,
  jwtAuth,
  handlePostTasks,
  page
);
app.post("tasks/edit/:taskId", tasksValidator, handlePostTasks);

// Categories API
app.get("/api/categories", jwtAuth, getCategories);
app.get("/api/category/:id", jwtAuth, getCategory);
app.post("/api/category", jwtAuth, createCategory);
app.put("/api/category/:id", jwtAuth, updateCategory);
app.delete("/api/category/:id", jwtAuth, deleteCategory);

// Handle categories form
app.post("/categories/:id", jwtAuth, handlePostCategories);

// Register form
app.post("/register", registerValidator, register, loginPage);

// Login form
app.post("/login", loginValidator, login);

// Users API
app.get("/api/users", getUsers);
app.get("/api/user/:id", getUser);

// Port
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}.`);
});
