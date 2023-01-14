"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const dbquery_1 = require("../utils/dbquery");
const userStore = {
    index: async () => {
        const sql = "SELECT id,username FROM users";
        const result = await (0, dbquery_1.dbQuery)(database_1.default, sql);
        return result.rows;
    },
    create: async (details) => {
        const sql = "INSERT INTO users (first_name, last_name,username,password) VALUES ($1,$2,$3,$4);";
        const sqlArgs = [
            details.firstName,
            details.lastName,
            details.username,
            details.password,
        ];
        const result = await (0, dbquery_1.dbQuery)(database_1.default, sql, sqlArgs);
        return result;
    },
    read: async (id) => {
        const sql = "SELECT id,username FROM users WHERE id = $1";
        const sqlArgs = [id];
        const result = await (0, dbquery_1.dbQuery)(database_1.default, sql, sqlArgs);
        return result.rows[0];
    },
};
exports.default = userStore;
