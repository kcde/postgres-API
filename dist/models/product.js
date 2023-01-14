"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const dbquery_1 = require("../utils/dbquery");
const productStore = {
    //All products
    index: async () => {
        const sql = "SELECT * FROM products";
        const result = await (0, dbquery_1.dbQuery)(database_1.default, sql);
        return result.rows;
    },
    read: async (id) => {
        const sql = "SELECT * FROM products WHERE id = $1";
        const sqlArgs = [id];
        const result = await (0, dbquery_1.dbQuery)(database_1.default, sql, sqlArgs);
        return result.rows[0];
    },
};
exports.default = productStore;
