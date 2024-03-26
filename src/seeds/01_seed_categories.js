const tableName = "categories";

const seed = async function (knex) {
  await knex(tableName).truncate();

  await knex(tableName).insert([
    { id: 1, link: "", category: "Default" },
    { id: 2, link: "household", category: "Household" },
    { id: 3, link: "easy-tasks", category: "Easy tasks" },
  ]);
};

export { seed };
