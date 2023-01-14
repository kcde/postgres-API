import { Router } from "express";
import { createUser, getUser, getUsers } from "../../handlers/userHandler";
import verifyToken from "../../middlewares/verifyToken";
const users = Router();

users.get("/", verifyToken, getUsers);
users.get("/:userId", verifyToken, getUser);
users.post("/", createUser);

export default users;
