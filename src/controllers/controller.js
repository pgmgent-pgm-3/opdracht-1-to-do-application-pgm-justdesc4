// import tasks from "../data/data.js";
import Task from "../models/Task.js";
import Category from "../models/Category.js";

// export const home = (request, response) => {
//   response.sendFile("index.html");
// };

export const home = async (req, res) => {
  const tasks = await Task.query();
  const categories = await Category.query();
  console.log(tasks);
  res.render("home", { tasks, categories });
};

export const household = async (req, res) => {
  const tasks = await Task.query();
  const categories = await Category.query();
  res.render("household", { tasks, categories });
};
