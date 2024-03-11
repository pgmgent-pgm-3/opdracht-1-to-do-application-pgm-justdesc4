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

  res.render("default", { tasks, categories, categoryId, message });
};

export const page = async (req, res) => {
  const { link } = req.params;
  const categories = await Category.query();
  const category = await Category.query().findOne({ link });

  if (!category) {
    res.status(404).send("Page not found");
    return;
  }

  const tasks = await Task.query().where({ category_id: category.id });
  const categoryId = category.id;
  const message = req.query.msg;

  res.render("default", {
    tasks,
    categories,
    category,
    categoryId,
    message,
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
