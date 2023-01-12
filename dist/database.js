"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, DB_NAME = _a.DB_NAME, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_HOST = _a.POSTGRES_HOST;
var db = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: DB_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports["default"] = db;
