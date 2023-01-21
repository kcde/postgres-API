import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
} from "../../handlers/productHandler";
import verifyToken from "../../middlewares/verifyToken";
import {
  addToCart,
  createOrder,
  getUserOrders,
} from "../../handlers/orderHandler";
const orders = Router();

orders.get("/", verifyToken, getUserOrders);
orders.post("/:orderId", verifyToken, addToCart);

orders.post("/", verifyToken, createOrder);
// orders.get("/:productId", verifyToken, getProduct);

export default orders;
