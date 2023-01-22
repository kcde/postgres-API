import db from "../database";
import { dbQuery } from "../utils/dbquery";

export type Product = {
  id?: number;
  name: string;
  price: number | string;
  category_id?: number;
};

const productStore = {
  //All products
  index: async (): Promise<Product[]> => {
    const sql = "SELECT * FROM products";
    const result = await dbQuery(db, sql);
    return result.rows;
  },

  read: async (id: number): Promise<Product> => {
    const sql = "SELECT * FROM products WHERE id = $1";
    const sqlArgs: Array<string | number> = [id];
    const result = await dbQuery(db, sql, sqlArgs);
    return result.rows[0];
  },

  create: async (product: Product): Promise<Product> => {
    const sql =
      "INSERT INTO products (name,price,category_id) VALUES ($1,$2,$3 ) RETURNING *";
    const sqlArgs: Array<string | number | undefined> = [
      product.name,
      product.price,
      product.category_id,
    ];
    const result = await dbQuery(db, sql, sqlArgs);
    return result.rows[0];
  },
};

export default productStore;
