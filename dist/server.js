"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var api_1 = __importDefault(require("./api"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.get("/", function (req, res) {
    res.send("WELCOME TO THE STOREFRONT API");
});
app.use("/api", api_1["default"]);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
