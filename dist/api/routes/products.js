"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productHandler_1 = require("../../handlers/productHandler");
const products = (0, express_1.Router)();
products.get("/", productHandler_1.getProducts);
products.get("/:productId", productHandler_1.getProduct);
exports.default = products;
