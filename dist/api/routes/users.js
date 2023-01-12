"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userHandler_1 = require("../../handlers/userHandler");
var users = (0, express_1.Router)();
users.post("/", userHandler_1.createUser);
exports["default"] = users;
