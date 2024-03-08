import knex from "knex";

const tableName = "tasks";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("task").notNullable();
    table.boolean("done").notNullable();
    table.integer("category_id").unsigned().notNullable();
    table.foreign("category_id").references("categories.id");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
