import knex from "../lib/Knex.js";
import { Model } from "objection";
import Task from "./Task.js";
import Category from "./Category.js";

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstname", "lastname", "email", "password"],
      properties: {
        id: { type: "integer" },
        firstname: { type: "string" },
        lastname: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "users.id",
          to: "tasks.user_id",
        },
      },
      categories: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: "users.id",
          to: "categories.user_id",
        },
      },
    };
  }
}

export default User;
