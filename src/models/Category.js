import knex from "../lib/Knex.js";
import { Model } from "objection";
import Task from "./Task.js";
import User from "./User.js";

Model.knex(knex);

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
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

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "categories.id",
          to: "tasks.category_id",
        },
      },
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "categories.id",
          to: "users.category_id",
        },
      },
    };
  }
}

export default Category;
