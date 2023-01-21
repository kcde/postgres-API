import db from "../database";
import { dbQuery } from "../utils/dbquery";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
};

export type UserDetail = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userStore = {
  index: async (): Promise<User[]> => {
    const sql = "SELECT id,username, first_name,last_name FROM users";
    const result = await dbQuery(db, sql);
    return result.rows;
  },

  create: async (details: UserDetail): Promise<User> => {
    const sql =
      "INSERT INTO users (first_name, last_name,username,password) VALUES ($1,$2,$3,$4) RETURNING id, first_name, last_name, username;";
    const sqlArgs: Array<any> = [
      details.firstName,
      details.lastName,
      details.username,
      details.password,
    ];
    const result = await dbQuery(db, sql, sqlArgs);
    return result.rows[0];
  },

  read: async (id: string): Promise<User | undefined> => {
    const sql =
      "SELECT id,username, first_name,last_name FROM users WHERE id = $1";
    const sqlArgs = [id];
    const result = await dbQuery(db, sql, sqlArgs);
    return result.rows[0];
  },
};

export default userStore;
