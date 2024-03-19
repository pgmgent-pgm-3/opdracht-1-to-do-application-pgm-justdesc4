import knex from "../lib/Knex.js";
import { Model } from "objection";

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
}

export default User;
