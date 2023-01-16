import db from "../database";
import { dbQuery } from "../utils/dbquery";

const productServices = {
  async getProductsByCategory(category: string): Promise<any> {
    const sql =
      " SELECT products.name  , categories.name as category, price FROM products INNER JOIN categories on categories.id = category_id and categories.name = $1";
    const sqlArgs = [category];

    const result = await dbQuery(db, sql, sqlArgs);

    if (result.error) {
      throw new Error(result.error);
    }

    return result.rows;
  },
};

export default productServices;
