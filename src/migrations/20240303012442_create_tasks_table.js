import knex from "knex";

const tableName = "tasks";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("task").notNullable();
    table.string("category").notNullable();
    table.boolean("done").notNullable();
    table.boolean("deleted").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
