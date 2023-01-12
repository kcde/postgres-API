import { Application, Request, Response } from "express";
import productStore from "../models/product";

export async function getProducts(_req: Request, res: Response) {
  const products = await productStore.index();
  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const productId: number = req.params.productId as unknown as number;
  console.log(productId);

  const product = await productStore.read(productId);
  res.json(product);
}
