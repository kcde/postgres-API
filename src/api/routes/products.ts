import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
} from "../../handlers/productHandler";
import verifyToken from "../../middlewares/verifyToken";

const products = Router();

products.get("/", getProducts);
products.get("/:productId", getProduct);
products.post("/", verifyToken, createProduct);

export default products;
