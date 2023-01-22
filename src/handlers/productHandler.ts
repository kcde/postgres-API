import { Application, Request, Response } from "express";
import productStore from "../models/product";
import productServices from "../services/productServices";

export async function getProducts(req: Request, res: Response) {
  const category: string = req.query.category as unknown as string;
  if (category) {
    try {
      const products = await productServices.getProductsByCategory(category);
      if (products.length > 0) {
        return res.json(products);
      }
      return res.status(404).json({ error: "no product in this category" });
    } catch {
      throw new Error("Unable to find product");
    }
  }

  const products = await productStore.index();
  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const productId: number = req.params.productId as unknown as number;

  try {
    const product = await productStore.read(productId);
    if (product) {
      return res.json(product);
    }
    res.status(404).json({ error: "product not found" });
  } catch {
    throw new Error("Unable to find product");
  }
}

export async function createProduct(req: Request, res: Response) {
  const { name, price, category_id } = req.body;

  if (!(name && price)) {
    return res.status(400).json({ error: "name and price is not provided" });
  }

  if (!Number(price)) {
    return res.status(400).json({ error: "price should be a number" });
  }
  try {
    const createdProduct = await productStore.create({
      name,
      price,
      category_id,
    });
    res.status(201).json(createdProduct);
  } catch {
    return res.status(400).json({ error: "Unable to create this product" });
  }
}
