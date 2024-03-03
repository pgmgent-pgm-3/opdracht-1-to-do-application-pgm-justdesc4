// import tasks from "../data/data.js";
import Task from "../models/Task.js";
import Category from "../models/Category.js";

// export const home = (request, response) => {
//   response.sendFile("index.html");
// };

export const home = async (req, res) => {
  const tasks = await Task.query();
  const categories = await Category.query();
  res.render("home", { tasks, categories });
};

export const page = async (req, res) => {
  const tasks = await Task.query();
  const categories = await Category.query();
  const pageData = await Category.query().findOne({ link: req.params.link });

  if (!pageData) {
    res.status(404).send("Page not found");
    return;
  }

  res.render("household", { tasks, categories });
};
