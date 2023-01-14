"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
async function getProducts(_req, res) {
    const products = await product_1.default.index();
    res.json(products);
}
exports.getProducts = getProducts;
async function getProduct(req, res) {
    const productId = req.params.productId;
    console.log(productId);
    const product = await product_1.default.read(productId);
    res.json(product);
}
exports.getProduct = getProduct;
