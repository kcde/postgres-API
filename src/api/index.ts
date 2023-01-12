import { Router } from "express";
import app from "../server";
import products from "./routes/products";
import users from "./routes/users";

const api = Router();

api.get("/", (_req, res) => {
  res.send("WELCOME TO THE API ROUTE");
});

api.use("/products", products);
api.use("/users", users);

export default api;
