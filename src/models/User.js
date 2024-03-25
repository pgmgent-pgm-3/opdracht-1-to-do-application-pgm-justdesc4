import knex from "../lib/Knex.js";
import { Model } from "objection";
import Task from "./Task.js";

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
        relation: Model.ManyToManyRelation,
        modelClass: Task,
        join: {
          from: "users.id",
          through: {
            from: "task_user.user_id",
            to: "task_user.task_id",
          },
          to: "tasks.id",
        },
      },
    };
  }
}

export default User;
