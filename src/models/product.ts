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
    const sqlArgs: Array<any> = [id];
    const result = await dbQuery(db, sql, sqlArgs);
    return result.rows[0];
  },

  create: async (product: Product): Promise<any> => {
    const sql =
      "INSERT INTO products (name,price,category_id) VALUES ($1,$2,$3)";
    const sqlArgs = [product.name, product.price, product.category_id];
    const result = dbQuery(db, sql, sqlArgs);
    return result;
  },
};

export default productStore;
