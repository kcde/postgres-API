import orderStore from "../../models/order";
import { Order } from "../../models/order";

describe("Test order model", () => {
  it("Should return an array of orders", async () => {
    const expectedOrder: Order = {
      id: 1,
      name: "white bluse",
      price: "$500.00",
      quantity: 3,
      order_status: "active",
    };
    const result = await orderStore.read("jacky");

    expect(result).toContain(expectedOrder);
  });
});
