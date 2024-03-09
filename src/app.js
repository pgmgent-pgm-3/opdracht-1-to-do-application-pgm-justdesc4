import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { create } from "express-handlebars";
import { home, page } from "./controllers/controller.js";
import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  handlePostTasks,
} from "./controllers/api/tasks-controller.js";
import {
  getCategories,
  getCategory,
  createCategory,
} from "./controllers/api/categories-controller.js";
import handlebarshelpers from "./lib/handlebarshelpers.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = create({
  helpers: handlebarshelpers,
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(path.resolve("src"), "views"));

app.use(express.static("public"));

// Pages
app.get("/", home);
app.get("/:link", page);

// Tasks API
app.get("/api/task/:id", getTask);
app.get("/api/tasks", getTasks);
app.post("/api/task", createTask);
app.put("/api/task", updateTask);
app.delete("/api/task/:id", deleteTask);

// Handle tasks form
app.post("/tasks/:category/:id", handlePostTasks);

// Categories API
app.get("/api/categories", getCategories);
app.get("/api/category/:id", getCategory);

// Handle categories form
app.post("/categories", createCategory);

// Port
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}.`);
});
