import { Application, Request, Response } from "express";
//import productStore from "../models/product";
//import productServices from "../services/productServices";

import orderStore from "../models/order";

export async function createOrder(_req: Request, res: Response) {
  const { userid } = res.locals.JWT_PAYLOAD;

  try {
    const result = await orderStore.create(userid);
    res.status(201).json(result);
  } catch {
    res.status(400).json({ error: "unable to create order" });
  }
}
export async function addToCart(req: Request, res: Response) {
  const order_id = req.params.orderId as unknown as number;
  const { product_id, quantity } = req.body;

  if (!(product_id && quantity)) {
    return res
      .status(400)
      .json({ error: "please provide product_id and quantity" });
  }

  try {
    const result = await orderStore.addToCart({
      product_id,
      quantity,
      order_id,
    });

    res.status(201).json(result);
  } catch {
    res.status(400).json({ error: "Product not created" });
  }
}

export async function getUserOrders(_req: Request, res: Response) {
  const { userid } = res.locals.JWT_PAYLOAD;
  console.log(userid);

  const result = await orderStore.read(userid);
  if (result.length) {
    return res.json(result);
  }

  res.status(404).json({ error: "No orders for this user" });
}
