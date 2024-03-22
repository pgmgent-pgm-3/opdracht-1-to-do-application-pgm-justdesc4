// import tasks from "../data/data.js";
import Task from "../models/Task.js";
import Category from "../models/Category.js";

// export const home = (request, response) => {
//   response.sendFile("index.html");
// };

/**
 * ============================================
 * Render home page, category pages
 * ============================================
 */
export const page = async (req, res) => {
  const link = req.params.link || req.params.categoryId || "";
  const categories = await Category.query();
  const category =
    (await Category.query().findOne({ link })) ||
    (await Category.query().findById(link));

  if (!category) {
    res.status(404).send("Page not found");
    return;
  }

  const categoryId = category.id;

  let tasks = await Task.query().where({ category_id: categoryId });
  if (categoryId === 1) {
    tasks = await Task.query();
  }
  const message = req.query.msg;
  const flash = req.flash || "";

  res.render("default", {
    tasks,
    categories,
    category,
    categoryId,
    message,
    flash,
    loggedIn: req.loggedIn,
  });
};

/**
 * ============================================
 * Render edit task page
 * ============================================
 */
export const editPage = async (req, res) => {
  const taskId = req.params.taskId;
  const task = await Task.query().findById(taskId);
  if (!task) {
    return res.status(404).send("Task not found!");
  }

  const flash = req.flash || "";

  res.render("editTask", { task, flash });
};

/**
 * ============================================
 * Render register page
 * ============================================
 */
export const registerPage = (req, res) => {
  res.render("register");
};

/**
 * ============================================
 * Render login page
 * ============================================
 */
export const loginPage = (req, res) => {
  res.render("login");
};
