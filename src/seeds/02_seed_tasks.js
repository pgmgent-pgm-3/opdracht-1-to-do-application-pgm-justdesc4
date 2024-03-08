const tableName = "tasks";

const seed = async function (knex) {
  await knex(tableName).truncate();

  await knex(tableName).insert([
    {
      id: 1,
      task: "Do the dishes",
      done: false,
      category_id: 2,
    },
    {
      id: 2,
      task: "Take out the trash",
      done: true,
      category_id: 2,
    },
    {
      id: 3,
      task: "Buy groceries",
      done: true,
      category_id: 3,
    },
    {
      id: 4,
      task: "Walk the dog",
      done: false,
      category_id: 3,
    },
    {
      id: 5,
      task: "Clean the bathroom",
      done: false,
      category_id: 2,
    },
    {
      id: 6,
      task: "Pay bills",
      done: true,
      category_id: 3,
    },
    {
      id: 7,
      task: "Call mom",
      done: false,
      category_id: 3,
    },
    {
      id: 8,
      task: "Finish coding assignment",
      done: false,
      category_id: 3,
    },
    {
      id: 9,
      task: "Go for a run",
      done: false,
      category_id: 3,
    },
    {
      id: 10,
      task: "Read a book",
      done: false,
      category_id: 3,
    },
  ]);
};

export { seed };
