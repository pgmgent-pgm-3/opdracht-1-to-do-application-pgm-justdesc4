// import tasks from "../data/data.js";
import Task from "../models/Task.js";
import Category from "../models/Category.js";

// export const home = (request, response) => {
//   response.sendFile("index.html");
// };

export const home = async (req, res) => {
  const tasks = await Task.query();
  const categories = await Category.query();

  const categoryId = 1;
  const message = req.query.msg;
  const flash = req.flash || "";

  res.render("default", { tasks, categories, categoryId, message, flash });
};

export const page = async (req, res) => {
  const link = req.params.link || req.params.categoryId || "";
  const categories = await Category.query();
  const category =
    (await Category.query().findOne({ link })) ||
    (await Category.query().findById(link));
  const categoryId = category.id;

  if (!category) {
    res.status(404).send("Page not found");
    return;
  }

  const tasks = await Task.query().where({ category_id: category.id });
  const message = req.query.msg;
  const flash = req.flash || "";

  res.render("default", {
    tasks,
    categories,
    category,
    categoryId,
    message,
    flash,
  });
};

export const editPage = async (req, res) => {
  const taskId = req.params.taskId;
  const task = await Task.query().findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found!" });
  }
  res.render("editTask", { task });
};
