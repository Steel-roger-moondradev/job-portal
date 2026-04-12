import { instance } from "..";
import { authenticatedRequest } from "../middleware/auth";
import sql from "../utils/db";
import ErrorHandler from "../utils/ErrorHandler";
import TryCatch from "../utils/TryCatch";
import crypto from "crypto";

export const checkout=TryCatch(async(req:authenticatedRequest,res)=>{
    if(!req.user){
        throw new ErrorHandler("Authentication is required",401);
    }

    const user_id=req.user.user_id;
    
     const [returnUser]=await sql`SELECT subscription FROM users WHERE user_id=${user_id}`;
     if(!returnUser){
        throw new ErrorHandler("User not found",404);
     }

    const userSubscription=returnUser?.subscription ? returnUser.subscription : 0;
    const now=new Date();
    const subscriptionDate=new Date(userSubscription);
    if(subscriptionDate>now){
        throw new ErrorHandler("You already have an active subscription",400);
    }

    const options = {
    amount: Number(99 * 100),
    currency: "INR",
    notes: {
      user_id: user_id.toString(),
    },
  };

  const order = await instance.orders.create(options);

  res.status(201).json({
    order,
  });
})


export const paymentVerification = TryCatch(
  async (req: authenticatedRequest, res) => {
    const user = req.user;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.Razorpay_Secret as string)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const now = new Date();

      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      const expiryDate = new Date(now.getTime() + thirtyDays);

      const [updatedUser] =
        await sql`UPDATE users SET subscription = ${expiryDate} WHERE user_id = ${user?.user_id} RETURNING *`;

      res.json({
        message: "Subscription Purchased Successfully",
        updatedUser,
      });
    } else {
      return res.status(400).json({
        message: "Payment Failed",
      });
    }
  }
);
