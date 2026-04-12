"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerification = exports.checkout = void 0;
const __1 = require("..");
const db_1 = __importDefault(require("../utils/db"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const TryCatch_1 = __importDefault(require("../utils/TryCatch"));
const crypto_1 = __importDefault(require("crypto"));
exports.checkout = (0, TryCatch_1.default)(async (req, res) => {
    if (!req.user) {
        throw new ErrorHandler_1.default("Authentication is required", 401);
    }
    const user_id = req.user.user_id;
    const [returnUser] = await (0, db_1.default) `SELECT subscription FROM users WHERE user_id=${user_id}`;
    if (!returnUser) {
        throw new ErrorHandler_1.default("User not found", 404);
    }
    const userSubscription = returnUser?.subscription ? returnUser.subscription : 0;
    const now = new Date();
    const subscriptionDate = new Date(userSubscription);
    if (subscriptionDate > now) {
        throw new ErrorHandler_1.default("You already have an active subscription", 400);
    }
    const options = {
        amount: Number(99 * 100),
        currency: "INR",
        notes: {
            user_id: user_id.toString(),
        },
    };
    const order = await __1.instance.orders.create(options);
    res.status(201).json({
        order,
    });
});
exports.paymentVerification = (0, TryCatch_1.default)(async (req, res) => {
    const user = req.user;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto_1.default
        .createHmac("sha256", process.env.Razorpay_Secret)
        .update(body)
        .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        const now = new Date();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const expiryDate = new Date(now.getTime() + thirtyDays);
        const [updatedUser] = await (0, db_1.default) `UPDATE users SET subscription = ${expiryDate} WHERE user_id = ${user?.user_id} RETURNING *`;
        res.json({
            message: "Subscription Purchased Successfully",
            updatedUser,
        });
    }
    else {
        return res.status(400).json({
            message: "Payment Failed",
        });
    }
});
