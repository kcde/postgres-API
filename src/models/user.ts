import db from "../database";
import { dbQuery } from "../utils/dbquery";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
};

type UserDetail = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userStore = {
  create: async (details: UserDetail) => {
    const sql =
      "INSERT INTO users (first_name, last_name,username,password) VALUES ($1,$2,$3,$4);";
    const sqlArgs: Array<any> = [
      details.firstName,
      details.lastName,
      details.username,
      details.password,
    ];
    const result = await dbQuery(db, sql, sqlArgs);
    return result;
  },
};

export default userStore;
