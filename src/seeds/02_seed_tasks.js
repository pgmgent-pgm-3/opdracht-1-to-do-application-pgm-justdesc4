const tableName = "tasks";

const seed = async function (knex) {
  await knex(tableName).truncate();

  await knex(tableName).insert([
    {
      id: 1,
      task: "Do the dishes",
      category: "Household",
      done: false,
      deleted: false,
    },
    {
      id: 2,
      task: "Take out the trash",
      category: "Household",
      done: true,
      deleted: false,
    },
    {
      id: 3,
      task: "Buy groceries",
      category: "Default",
      done: true,
      deleted: false,
    },
    {
      id: 4,
      task: "Walk the dog",
      category: "Default",
      done: false,
      deleted: false,
    },
    {
      id: 5,
      task: "Clean the bathroom",
      category: "Household",
      done: false,
      deleted: false,
    },
    {
      id: 6,
      task: "Pay bills",
      category: "Default",
      done: true,
      deleted: false,
    },
    {
      id: 7,
      task: "Call mom",
      category: "Default",
      done: false,
      deleted: false,
    },
    {
      id: 8,
      task: "Finish coding assignment",
      category: "Default",
      done: false,
      deleted: false,
    },
    {
      id: 9,
      task: "Go for a run",
      category: "Default",
      done: false,
      deleted: false,
    },
    {
      id: 10,
      task: "Read a book",
      category: "Default",
      done: false,
      deleted: false,
    },
  ]);
};

export { seed };
