import { Router } from "express";
import { getProducts, getProduct } from "../../handlers/productHandler";

const products = Router();

products.get("/", getProducts);
products.get("/:productId", getProduct);

export default products;
