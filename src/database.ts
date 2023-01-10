import dotenv from "dotenv";

import { Pool } from "pg";

dotenv.config();

const { DB_NAME, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } =
  process.env;

const db = new Pool({
  host: POSTGRES_HOST,
  database: DB_NAME,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default db;
