import { response } from "express";
import supertest from "supertest";

import app from "../server";

const request = supertest(app);

describe("Check api route", () => {
  it("should return a res of 200", async () => {
    let response = await request.get("/api");

    expect(response.status).toBe(200);
  });
});

//this token should be used for all requests
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imxhc2gifQ.oHo7cV8-fGQRem4lezaininoQuk0XyPTVzXQuAXqiXE";

describe("Test /users route", () => {
  it("should return a response of 200 when /api/users route is hit", async () => {
    const response = await request
      .get("/api/users")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("should return a response of 200 when api/users/:id route is hit", async () => {
    const response = await request
      .get("/api/users/1")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
  });
});

describe("Test /products route", () => {
  //this should already be in the database based on migrations as the first product
  const expectedProduct = {
    id: 1,
    name: "checkered shirt",
    price: "$200.00",
    category_id: 1,
  };

  it("should return all products", async () => {
    const response = await request.get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body).toContain(expectedProduct);
  });

  it("should return a product with id of 1", async () => {
    const response = await request.get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedProduct);
  });

  it("should create a new user", async () => {
    const createdProduct = {
      name: "new product",
      price: "30000",
    };

    const response = await request
      .post("/api/products")
      .set("Authorization", "Bearer " + token)
      .send(createdProduct);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdProduct);
  });
});
