import getBuffer from "../utils/buffer.js";
import sql from "../utils/db.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import TryCatch from "../utils/TryCatch.js";
import axios from 'axios';
export const createCompany = TryCatch(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new ErrorHandler("Authentication is required", 401);
    }
    const [role] = await sql `
    SELECT role FROM users WHERE user_id=${user.user_id}
    `;
    const userRole = role[0];
    if (userRole == 'jobseeker') {
        throw new ErrorHandler("only recruiter is allowed", 401);
    }
    const { name, website, description } = req.body;
    if (!name || !description || !website) {
        throw new ErrorHandler("Data is not enough to list as a company", 400);
    }
    const existing = await sql `
    SELECT company_id FROM companies WHERE name=${name}
    `;
    if ((existing.length > 0)) {
        throw new ErrorHandler("Company name already exists", 400);
    }
    const file = req.file;
    if (!file) {
        throw new ErrorHandler("Unable to fetch logo", 400);
    }
    const buffer = getBuffer(file);
    const { data } = await axios.post(`${process.env.UPLOAD_SERVICES}/api/utils/upload`, { buffer: buffer.content });
    if (!data) {
        throw new ErrorHandler("Error in uploading", 400);
    }
    const [insertCompany] = await sql `
    INSERT INTO companies(name,description,website,logo,logo_public_id,recruiter_id)
    VALUES (${name},${description},${website},${data.url},${data.public_id},${user.user_id})
    RETURNING *
    `;
    const company = insertCompany[0];
    res.json({
        message: "Company listied successfully",
        company
    });
});
