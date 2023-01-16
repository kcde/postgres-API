import productStore from "../../models/product";
import { Product } from "../../models/product";

describe("test Product model", () => {
  const expectedProduct: Product = {
    id: 1,
    name: "checkered shirt",
    price: "$200.00",
    category_id: 1,
  };
  it("should return an array of products on productStore.index()", async () => {
    const result: Product[] = await productStore.index();
    console.log(result);

    expect(result).toBeInstanceOf(Array);
    expect(result).toContain(expectedProduct);
  });

  it("should return product on productStore.read()", async () => {
    const result = await productStore.read(1);

    expect(result.name).toEqual(expectedProduct.name);
  });

  it("should create a product on productStore.create()", async () => {
    const productToCreate = {
      name: "john",
      price: 100000,
    };
    const result = await productStore.create(productToCreate);

    expect(result).toBeDefined();
    expect(result.rowCount).toEqual(1);
  });
});
