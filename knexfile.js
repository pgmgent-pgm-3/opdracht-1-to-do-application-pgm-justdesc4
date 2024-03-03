const config = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
      stub: "./migration.stub",
    },
    seeds: {
      directory: "./src/seeds",
      stub: "./seed.stub",
    },
  },
};

export default config;
