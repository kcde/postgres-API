import { Application, Request, Response } from "express";
import productStore from "../models/product";

export async function getProducts(req: Request, res: Response) {
  console.log(req.query);

  const products = await productStore.index();
  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const productId: number = req.params.productId as unknown as number;

  const product = await productStore.read(productId);

  if (product) {
    return res.json(product);
  }

  res.status(404).json({ error: "product not found" });
}

export async function createProduct(req: Request, res: Response) {
  const { name, price } = req.body;

  if (!(name && price)) {
    return res.status(400).json({ error: "name and price is not provided" });
  }

  const newProduct = await productStore.create(req.body);

  if (newProduct.error) {
    return res.status(400).json({ error: "Unable to create this user" });
  }

  res.status(201).json(req.body);
}
