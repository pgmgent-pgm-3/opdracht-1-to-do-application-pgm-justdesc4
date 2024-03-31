import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

export const SOURCE_PATH = path.resolve("src");
export const VIEWS_PATH = path.resolve(SOURCE_PATH, "views");
export const PORT = process.env.PORT || 3000;
