import { Router } from "express";
import { createUser } from "../../handlers/userHandler";
const users = Router();

users.post("/", createUser);

export default users;
