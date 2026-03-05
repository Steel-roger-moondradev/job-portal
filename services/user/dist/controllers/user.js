import TryCatch from '../utils/./TryCatch.js';
import getBuffer from '../utils/buffer.js';
import sql from '../utils/db.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import axios from 'axios';
export const myProfile = TryCatch(async (req, res, next) => {
    const user = req.user;
    res.json({
        user,
    });
});
export const getProfile = TryCatch(async (req, res, next) => {
    const { userId } = req.params;
    const users = await sql `
        SELECT u.user_id,u.name,u.email,u.phone_number,u.role,u.bio,u.resume,
        u.profile_pic,u.subscription,ARRAY_AGG(s.name) FILTER(WHERE s.name IS NOT NULL) as skills FROM users u 
        LEFT JOIN users_skills us ON us.user_id=u.user_id LEFT JOIN skills s ON s.skill_id=us.skill_id
        WHERE u.user_id=${userId}
        GROUP BY u.user_id
        `;
    if (users.length === 0) {
        res.status(400).json({
            message: "User does not exist",
        });
        return;
    }
    const user = users[0];
    user.skill = user.skills || [];
    res.json({
        user,
    });
});
export const updateProfile = TryCatch(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new ErrorHandler("Token does not exist", 401);
    }
    const { name, phone_number, bio } = req.body;
    const newname = name || user.name;
    const new_phone_number = phone_number || user.phone_number;
    const newbio = bio || user.bio;
    const [updatedprofile] = await sql `
    UPDATE users SET name=${newname},phone_number=${new_phone_number},bio=${newbio}
    WHERE user_id=${user.user_id}
    RETURNING user_id,name,bio,phone_number;
    `;
    res.json({
        message: "Profile is updated successfully",
        updatedprofile,
    });
});
export const updatePic = TryCatch(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new ErrorHandler("Authentication is required", 401);
    }
    const file = req.file;
    if (!file) {
        throw new ErrorHandler("Image is required", 400);
    }
    const old_file_id = user.profile_pic_public_key;
    const buffer = getBuffer(file);
    if (!buffer || !buffer.content) {
        throw new ErrorHandler("failed to generate Image", 400);
    }
    const { data } = await axios.post(`${process.env.UPLOAD_SERVICES}/api/utils/upload`, { buffer: buffer.content, public_id: old_file_id });
    const [updateUser] = await sql `
        UPDATE users 
        SET profile_pic = ${data.url},
            profile_pic_public_key = ${data.public_id}
        WHERE user_id = ${user.user_id}
        RETURNING user_id,name,profile_pic
`;
    res.json({
        message: "Profile pic is Updated",
        updateUser
    });
});
export const updateResume = TryCatch(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new ErrorHandler("Authentication is required", 401);
    }
    const file = req.file;
    if (!file) {
        throw new ErrorHandler("Resume is required", 400);
    }
    const old_file_id = user.resume_public_id;
    const buffer = getBuffer(file);
    if (!buffer || !buffer.content) {
        throw new ErrorHandler("failed to generate Resume", 400);
    }
    const { data } = await axios.post(`${process.env.UPLOAD_SERVICES}/api/utils/upload`, { buffer: buffer.content, public_id: old_file_id });
    const [updateUser] = await sql `
        UPDATE users 
        SET resume = ${data.url},
            resume_public_id = ${data.public_id}
        WHERE user_id = ${user.user_id}
        RETURNING user_id,name,resume_public_id
`;
    res.json({
        message: "Resume is Updated",
        updateUser
    });
});
