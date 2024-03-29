const tableName = "category_user";

const seed = async function (knex) {
  await knex(tableName).truncate();

  await knex(tableName).insert([
    { category_id: 2, user_id: 1 },
    { category_id: 3, user_id: 1 },
  ]);
};

export { seed };
