import { Router } from "express";
import app from "../server";
import orders from "./routes/orders";
import products from "./routes/products";
import users from "./routes/users";

const api = Router();

api.get("/", (_req, res) => {
  res.send("WELCOME TO THE API ROUTE");
});

api.use("/products", products);
api.use("/users", users);
api.use("/orders", orders);

export default api;
