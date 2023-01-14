"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
describe("Check api route", () => {
    it("should return a res of 200", async () => {
        let response = await request.get("/api");
        expect(response.status).toBe(200);
    });
});
describe("Test /users route", () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imxhc2gifQ.oHo7cV8-fGQRem4lezaininoQuk0XyPTVzXQuAXqiXE";
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
