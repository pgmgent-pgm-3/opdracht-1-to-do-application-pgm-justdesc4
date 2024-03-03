import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "id";
  }

  static get json() {
    return {
      type: "object",
      required: ["link", "category"],
      properties: {
        id: { type: "integer" },
        link: { type: "string", minLength: 1, maxLength: 255 },
        category: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default Category;
