"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const payment_1 = __importDefault(require("./routes/payment"));
const razorpay_1 = __importDefault(require("razorpay"));
dotenv_1.default.config();
exports.instance = new razorpay_1.default({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/payment", payment_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Payment service running on port ${process.env.PORT}`);
});
