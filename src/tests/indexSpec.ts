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

describe("Test /users route", () => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imxhc2gifQ.oHo7cV8-fGQRem4lezaininoQuk0XyPTVzXQuAXqiXE";

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
