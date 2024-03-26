const tableName = "category_user";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.integer("category_id").unsigned().notNullable();
    table.foreign("category_id").references("categories.id");

    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
