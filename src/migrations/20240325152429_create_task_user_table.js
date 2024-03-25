const tableName = "task_user";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.integer("task_id").unsigned().notNullable();
    table.foreign("task_id").references("tasks.id");

    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
