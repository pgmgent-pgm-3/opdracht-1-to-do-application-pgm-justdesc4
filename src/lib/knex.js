import dotenv from "dotenv";
dotenv.config();

import knex from "knex";
import knexConfig from "../../knexfile.js";

const environment = process.env.NODE_ENV || "development";

const config = knexConfig[environment];

const Knex = knex(config);

export default Knex;
