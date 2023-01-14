"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const api = (0, express_1.Router)();
api.get("/", (_req, res) => {
    res.send("WELCOME TO THE API ROUTE");
});
api.use("/products", products_1.default);
api.use("/users", users_1.default);
exports.default = api;
