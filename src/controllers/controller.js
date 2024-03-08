// import tasks from "../data/data.js";
import Task from "../models/Task.js";
import Category from "../models/Category.js";

// export const home = (request, response) => {
//   response.sendFile("index.html");
// };

export const home = async (req, res) => {
  const tasks = await Task.query();
  const categories = await Category.query();

  const activeCategory = 1;

  res.render("default", { tasks, categories, activeCategory });
};

export const page = async (req, res) => {
  const { link } = req.params;
  const categories = await Category.query();
  const category = await Category.query().findOne({ link });

  const activeCategory = category.id;

  if (!category) {
    res.status(404).send("Page not found");
    return;
  }

  const tasks = await Task.query().where({ category_id: category.id });

  res.render("default", {
    tasks,
    categories,
    category,
    activeCategory,
  });
};
