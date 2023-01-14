"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userHandler_1 = require("../../handlers/userHandler");
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const users = (0, express_1.Router)();
users.get("/", verifyToken_1.default, userHandler_1.getUsers);
users.get("/:userId", verifyToken_1.default, userHandler_1.getUser);
users.post("/", userHandler_1.createUser);
exports.default = users;
