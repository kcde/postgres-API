import { Pool } from "pg";

/**
 * @param db pg pool database connection
 * @param sqlQuery sql query to use to query table in the database
 * @returns a promise of the result from the database
 */

export async function dbQuery(
  db: Pool,
  sqlQuery: string,
  sqlArgs?: Array<any>
): Promise<any> {
  try {
    const connect = await db.connect();

    const result = await connect.query(sqlQuery, sqlArgs);

    connect.release();

    return result;
  } catch (err) {
    console.error(err);
    return { error: "Unable to query db" };
  }
}
