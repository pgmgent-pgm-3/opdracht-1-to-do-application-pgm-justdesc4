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
export const home = async (req, res) => {
  const categories = await Category.query().where("user_id", req.user.id);
  const tasks = await Task.query().where("user_id", req.user.id);

  const message = req.query.msg;
  const flash = req.flash || "";
  const categoryId = 1;

  res.render("default", {
    tasks,
    categories,
    categoryId,
    message,
    flash,
    loggedIn: req.loggedIn,
  });
};

export const page = async (req, res) => {
  const link = req.params.link || parseInt(req.params.categoryId);

  const categories = await Category.query().where("user_id", req.user.id);

  let category =
    (await Category.query().where("user_id", req.user.id).findOne({ link })) ||
    (await Category.query().where("user_id", req.user.id).findById(link));

  if (link === 1) {
    category = await Category.query().findById(link);
  } else if (!category) {
    res.status(404).send("Page not found");
    return;
  }
  const categoryId = category.id;

  let tasks = await Task.query().where({
    user_id: req.user.id,
    category_id: categoryId,
  });
  if (categoryId === 1) {
    tasks = await Task.query().where({ user_id: req.user.id });
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
  if (req.path.includes("categories")) {
    const categoryId = req.params.categoryId;
    const category = await Category.query().findById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found!");
    }

    const flash = req.flash || "";

    res.render("editCategory", { category, flash, loggedIn: req.loggedIn });
    return;
  } else if (req.path.includes("tasks")) {
    const taskId = req.params.taskId;
    const task = await Task.query().findById(taskId);
    if (!task) {
      return res.status(404).send("Task not found!");
    }

    const flash = req.flash || "";

    res.render("editTask", { task, flash, loggedIn: req.loggedIn });
  }
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
