import dotenv from "dotenv";

import { Pool } from "pg";

dotenv.config();

const {
  DB_NAME,
  DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  ENV,
} = process.env;

let db: Pool;
console.log(process.env.ENV);

if (ENV === "test") {
  db = new Pool({
    host: POSTGRES_HOST,
    database: DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else {
  db = new Pool({
    host: POSTGRES_HOST,
    database: DB_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default db;
