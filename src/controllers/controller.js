import tasks from "../data/data.js";

// export const home = (request, response) => {
//   response.sendFile("index.html");
// };

export const home = (req, res) => {
  res.render("home", { tasks });
};