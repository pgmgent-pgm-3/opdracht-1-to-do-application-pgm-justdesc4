import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get idColumn() {
    return "id";
  }

  static get json() {
    return {
      type: "object",
      required: ["task", "category"],
      properties: {
        id: { type: "integer" },
        task: { type: "string", minLength: 1, maxLength: 255 },
        category: { type: "string", minLength: 1, maxLength: 255 },
        done: { type: "boolean" },
        deleted: { type: "boolean" },
      },
    };
  }
}

export default Task;
