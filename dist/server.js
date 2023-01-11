"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.post("/", async (req, res) => {
    const conn = await database_1.default.connect();
    const sql = "INSERT INTO users (name) VALUES ($1) ";
    const result = await database_1.default.query(sql, ["keside"]);
    conn.release();
    res.json(result);
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
