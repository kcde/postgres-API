"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = void 0;
/**
 * @param db pg pool database connection
 * @param sqlQuery sql query to use to query table in the database
 * @returns a promise of the result from the database
 */
async function dbQuery(db, sqlQuery, sqlArgs) {
    try {
        const connect = await db.connect();
        const result = await connect.query(sqlQuery, sqlArgs);
        connect.release();
        return result;
    }
    catch (err) {
        console.error(err);
        return { error: "Unable to query db" };
    }
}
exports.dbQuery = dbQuery;
