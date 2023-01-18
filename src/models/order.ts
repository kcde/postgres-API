import db from "../database";
import { dbQuery } from "../utils/dbquery";

export type Order = {
  id?: number;
  name: string;
  price: number | string;
  quantity: number;
  order_status?: string;
};

const orderStore = {
  read: async (name: string): Promise<Order[]> => {
    console.log(name);

    const sql =
      "SELECT orders.id , order_status, products.name, products.price,carts.quantity  FROM orders INNER JOIN carts ON orders.id = carts.order_id INNER JOIN products ON products.id = carts.product_id INNER JOIN users ON users.username = $1";
    const sqlArgs: Array<any> = [name];
    const result = await dbQuery(db, sql, sqlArgs);
    return result.rows;
  },
};

export default orderStore;
