const tableName = "categories";

const seed = async function (knex) {
  await knex(tableName).truncate();

  await knex(tableName).insert([
    { id: 1, link: "", category: "Default", user_id: 0 },
    { id: 2, link: "household", category: "Household", user_id: 1 },
    { id: 3, link: "easy-tasks", category: "Easy tasks", user_id: 1 },
  ]);
};

export { seed };
