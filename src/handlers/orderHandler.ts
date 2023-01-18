import { Application, Request, Response } from "express";
//import productStore from "../models/product";
//import productServices from "../services/productServices";

import orderStore from "../models/order";

export async function getUserOrders(_req: Request, res: Response) {
  console.log(res.locals);
  const { username } = res.locals.JWT_PAYLOAD;

  const result = await orderStore.read(username);
  console.log(result);

  if (result.length) {
    return res.json(result);
  }

  res.status(404).json({ error: "No orders for this user" });
}
