import db from "../database";
import { dbQuery } from "../utils/dbquery";

export type Order = {
  id?: number;
  name: string;
  price: number | string;
  quantity: number;
  order_status?: string;
};

export type CartProduct = {
  product_id: number;
  order_id: number;
  quantity: number;
};

const orderStore = {
  read: async (id: number): Promise<Order[]> => {
    const sql =
      "SELECT orders.id , order_status, products.name, products.price,carts.quantity  FROM orders INNER JOIN carts ON orders.id = carts.order_id INNER JOIN products ON products.id = carts.product_id INNER JOIN users ON user_id = $1";
    const sqlArgs: Array<string | number> = [id];
    const result = await dbQuery(db, sql, sqlArgs);
    return result.rows;
  },

  create: async (userId: number) => {
    const sql =
      "INSERT INTO orders (user_id, order_status) VALUES ($1, 'active') RETURNING *";
    const sqlArgs: Array<string | number> = [userId];
    const result = await dbQuery(db, sql, sqlArgs);
    return result.rows[0];
  },

  addToCart: async (cartProduct: CartProduct) => {
    console.log(cartProduct);

    const sql =
      "INSERT INTO carts (product_id,order_id,quantity) VALUES ($1, $2, $3) RETURNING *";
    const sqlArgs: Array<string | number> = [
      cartProduct.product_id,
      cartProduct.order_id,
      cartProduct.quantity,
    ];

    try {
      const result = await dbQuery(db, sql, sqlArgs);
      return result.rows[0];
    } catch {
      throw new Error(`Failed to add order to cart`);
    }
  },
};

export default orderStore;
