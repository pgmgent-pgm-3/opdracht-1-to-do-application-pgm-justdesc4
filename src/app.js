import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import { home } from "./controllers/controller.js";
import handlebarshelpers from "./lib/handlebarshelpers.js";

const app = express();

const hbs = create({
  helpers: handlebarshelpers,
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(path.resolve("src"), "views"));

app.use(express.static("public"));

app.get("/", home);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}.`);
});
