"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function verifyToken(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res
            .status(400)
            .json({ error: "please provide Bearer <token> in header" });
    }
    const token = authorization.split(" ")[1];
    //verify token
    jsonwebtoken_1.default.verify(token, process.env.JWT_PRIVATE_KEY, (err, _decoded) => {
        if (err) {
            return res.status(401).json({ error: err.message });
        }
        next();
    });
}
exports.default = verifyToken;
