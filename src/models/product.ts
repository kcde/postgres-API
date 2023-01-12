import db from "../database";
import { dbQuery } from "../utils/dbquery";

type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
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
};

export default productStore;
