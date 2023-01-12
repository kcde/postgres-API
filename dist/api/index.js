"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var products_1 = __importDefault(require("./routes/products"));
var users_1 = __importDefault(require("./routes/users"));
var api = (0, express_1.Router)();
api.get("/", function (_req, res) {
    res.send("WELCOME TO THE API ROUTE");
});
api.use("/products", products_1["default"]);
api.use("/users", users_1["default"]);
exports["default"] = api;
