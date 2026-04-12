import express from "express";
import { isAuth } from "../middleware/auth";
import { checkout, paymentVerification } from "../controllers/payment";

const router = express.Router();

router.post("/checkout",isAuth,checkout);
router.post("/verify",isAuth,paymentVerification);

export default router;