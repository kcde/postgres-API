"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
describe("test user model", () => {
    const expectedUser = {
        id: 1,
        username: "user1",
    };
    it("should return an Array of users when userStore.index is run", async () => {
        const response = await user_1.default.index();
        expect(response).toContain(expectedUser);
    });
    it("should return an object of a user", async () => {
        const response = await user_1.default.read("1");
        expect(response).toEqual(expectedUser);
    });
});
