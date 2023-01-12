"use strict";
exports.__esModule = true;
var express_1 = require("express");
var productHandler_1 = require("../../handlers/productHandler");
var products = (0, express_1.Router)();
products.get("/", productHandler_1.getProducts);
products.get("/:productId", productHandler_1.getProduct);
exports["default"] = products;
