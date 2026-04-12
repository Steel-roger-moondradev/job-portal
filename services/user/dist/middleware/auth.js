import jwt from "jsonwebtoken";
import sql from "../utils/db.js";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Authorization header is messing or invalid"
            });
            return;
        }
        const token = authHeader?.split(" ")[1];
        const decodePayload = jwt.verify(token, process.env.JWT_SEC);
        if (!decodePayload) {
            res.status(401).json({
                message: "Invalid Token",
            });
            return;
        }
        const users = await sql `
        SELECT u.user_id,u.name,u.email,u.phone_number,u.role,u.bio,u.resume,
        u.profile_pic,u.subscription,ARRAY_AGG(s.name) FILTER(WHERE s.name IS NOT NULL) as skills FROM users u 
        LEFT JOIN users_skills us ON us.user_id=u.user_id LEFT JOIN skills s ON s.skill_id=us.skill_id
        WHERE u.user_id=${decodePayload.id}
        GROUP BY u.user_id
        `;
        if (users.length === 0) {
            res.status(400).json({
                message: "User does not exist",
            });
            return;
        }
        const user = users[0];
        user.skills = user.skills || [];
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
