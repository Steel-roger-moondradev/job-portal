"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const payment_1 = require("../controllers/payment");
const router = express_1.default.Router();
router.post("/checkout", auth_1.isAuth, payment_1.checkout);
router.post("/verify", auth_1.isAuth, payment_1.paymentVerification);
exports.default = router;
