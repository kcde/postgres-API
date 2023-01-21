import { response } from "express";
import supertest from "supertest";
import { Product } from "../models/product";

import app from "../server";

const request = supertest(app);

describe("Check api route", () => {
  it("should return a res of 200", async () => {
    let response = await request.get("/api");

    expect(response.status).toBe(200);
  });
});

//this token should be used for all requests
let token: string;
let orderId: number;
describe("Test /users route", () => {
  it("should create a user", async () => {
    const response = await request.post("/api/users").send({
      username: "user",
      password: "password",
      firstName: "first name",
      lastName: "last name",
    });

    expect(response.status).toBe(201);
  });

  it("should return a response of 200 when /api/users route is hit", async () => {
    //get token
    let user = await request.post("/api/users").send({
      username: "johndoe",
      password: "password",
      firstName: "john",
      lastName: "doe",
    });

    const response = await request
      .get("/api/users")
      .set("Authorization", "Bearer " + user.body.token);
    expect(response.status).toBe(200);
  });

  it("should return a response of 200 when api/users/:id route is hit", async () => {
    let user = await request.post("/api/users").send({
      username: "janedoe",
      password: "password",
      firstName: "jane",
      lastName: "doe",
    });

    const response = await request
      .get("/api/users/" + user.body.id)
      .set("Authorization", "Bearer " + user.body.token);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.body.id);
  });
});

describe("Test /products route", () => {
  it("should return all products", async () => {
    let user = await request.post("/api/users").send({
      username: "dondoe",
      password: "password",
      firstName: "don",
      lastName: "doe",
    });

    const product: Product = {
      name: "Nike shoe",
      price: "200000",
    };

    const createdProduct = await request
      .post("/api/products")
      .send(product)
      .set("Authorization", "Bearer " + user.body.token);

    const response = await request.get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body).toContain(createdProduct.body);
  });

  it("should return a product", async () => {
    const response = await request.get("/api/products/1");
    expect(response.status).toBe(200);
    //expect(response.body).toEqual(expectedProduct);
  });

  it("should create a new product", async () => {
    let user = await request.post("/api/users").send({
      username: "fundoe",
      password: "password",
      firstName: "fun",
      lastName: "doe",
    });

    const product: Product = {
      name: "adidas shoe",
      price: "300000",
    };

    const response = await request
      .post("/api/products")
      .set("Authorization", "Bearer " + user.body.token)
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual("adidas shoe");
  });
});

describe("Test /orders route", () => {
  it("should create a new order", async () => {
    let user = await request.post("/api/users").send({
      username: "billdoe",
      password: "password",
      firstName: "billdoe",
      lastName: "doe",
    });

    token = user.body.token;

    const response = await request
      .post("/api/orders")
      .set("Authorization", "Bearer " + token);

    orderId = response.body.id;

    expect(response.status).toBe(201);
  });

  it("should add product to order", async () => {
    const response = await request
      .post("/api/orders/ " + orderId)
      .set("Authorization", "Bearer " + token)
      .send({
        product_id: "1",
        quantity: "3",
      });

    expect(response.status).toBe(201);
  });

  it("should return a user's orders based on token payload", async () => {
    const orderCreate = await request
      .post("/api/orders")
      .set("Authorization", "Bearer " + token);

    const addToCart = await request
      .post("/api/orders/1")
      .set("Authorization", "Bearer " + token)
      .send({
        product_id: "1",
        quantity: "3",
      });

    //token payload has a user id
    const response = await request
      .get("/api/orders")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
  });

  // it("should add aproduct to cart based on order id", async () => {
  //   //token payload has a user id
  //   const order = await request
  //     .get("/api/orders")
  //     .set("Authorization", "Bearer " + token);

  //   const productAddedInCart = await request
  //     .post("/api/orders/" + order.body.id)
  //     .set("Authorization", "Bearer " + token)
  //     .send({
  //       product_id: "1",
  //       quantity: "3",
  //     });

  //   expect(productAddedInCart.status).toBe(201);
  // });
});
