import knex from "../lib/Knex.js";
import { Model } from "objection";
import Category from "./Category.js";
import User from "./User.js";

Model.knex(knex);

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["task"],
      properties: {
        id: { type: "integer" },
        task: { type: "string", minLength: 1, maxLength: 255 },
        category: { type: "string", minLength: 1, maxLength: 255 },
        done: { type: "boolean" },
        deleted: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "tasks.category_id",
          to: "categories.id",
        },
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "tasks.id",
          through: {
            from: "task_user.task_id",
            to: "task_user.user_id",
          },
          to: "users.id",
        },
      },
    };
  }
}

export default Task;
