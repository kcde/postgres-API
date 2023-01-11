import supertest from "supertest";

import app from "../server";

const request = supertest(app);

describe("Check api route", () => {
  it("should return a res of 200", async () => {
    let response = await request.get("/");

    expect(response.status).toBe(200);
  });
});
