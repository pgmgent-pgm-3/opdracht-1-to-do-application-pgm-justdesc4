import data from "../data/data.js";

export const home = (request, response) => {
  response.sendFile("index.html");
};
