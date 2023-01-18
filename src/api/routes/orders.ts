import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
} from "../../handlers/productHandler";
import verifyToken from "../../middlewares/verifyToken";
import { getUserOrders } from "../../handlers/orderHandler";
const orders = Router();

orders.get("/", verifyToken, getUserOrders);
//orders.post("/", verifyToken, createProduct);
//orders.get("/:productId", getProduct);

export default orders;
