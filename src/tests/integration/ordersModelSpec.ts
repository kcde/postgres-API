import orderStore from "../../models/order";
import { Order } from "../../models/order";

describe("Test order model", () => {
  it("Should return an array of orders", async () => {
    const result = await orderStore.read(1);

    expect(result).toBeDefined;
  });

  it("should create an order", async () => {
    const result = await orderStore.create(1);

    expect(result).toBeDefined;
    expect(result.order_status).toEqual("active");
  });

  it("should add product to cart", async () => {
    const result = await orderStore.addToCart({
      product_id: 1,
      order_id: 1,
      quantity: 2,
    });

    expect(result.order_id).toBeDefined;
  });
});
