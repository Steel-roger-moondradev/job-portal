import { errorMonitor } from "events";
import { authenticatedRequest } from "../middleware/auth.js";
import getBuffer from "../utils/buffer.js";
import sql from "../utils/db.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import TryCatch from "../utils/TryCatch.js";
import axios from 'axios'

type UploadResponse={
    url:string,
    public_id:string,
};
export const createCompany=TryCatch(async(req:authenticatedRequest,res,next)=>{
    const user=req.user;
     if(!user){
        throw new ErrorHandler("Authentication is required",401);
    }
    const role=await sql`
    SELECT role FROM users WHERE user_id=${user.user_id}
    `;
    const userRole=role[0];

    if(userRole.role=='jobseeker'){
        throw new ErrorHandler("only recruiter is allowed",401);
    }
    const {name,website,description}=req.body;

    if(!name||!description||!website){
        throw new ErrorHandler("Data is not enough to list as a company",400);
    }
    const existing=await sql`
    SELECT company_id FROM companies WHERE name=${name}
    `;
    if((existing.length>0)){
        throw new ErrorHandler("Company name already exists",400);
    }
    const file=req.file;
    if(!file){
          throw new ErrorHandler("Unable to fetch logo",400);
    }
    const buffer=getBuffer(file);

    const {data}=await axios.post<UploadResponse>(`${process.env.UPLOAD_SERVICES}/api/utils/upload`,{buffer:buffer.content});
    if(!data){
          throw new ErrorHandler("Error in uploading",400);
    }

    const [insertCompany]=await sql`
    INSERT INTO companies(name,description,website,logo,logo_public_id,recruiter_id)
    VALUES (${name},${description},${website},${data.url},${data.public_id},${user.user_id})
    RETURNING *
    `;

    const company=insertCompany[0];
    res.json({
        message:"Company listied successfully",
        company
    });
})

export const companyDelete=TryCatch(async(req:authenticatedRequest,res,next)=>{
    const user=req.user;
    if(!user){
        throw new ErrorHandler("Authentication is required",401);
    }
     const [role]=await sql`
    SELECT role FROM users WHERE user_id=${user.user_id}
    `;
    const userRole=role[0];

    if(userRole=='jobseeker'){
        throw new ErrorHandler("only recruiter is allowed",401);
    }
    const {company}=req.params;
    const [deleteCompany]=await sql`
        DELETE FROM companies WHERE name=${company} AND recruiter_id=${user.user_id} RETURNING *;
    `;
     if(!deleteCompany){
        throw new ErrorHandler("Company does not exist or you are not authorized",400);
    }
    res.json({
        message:"Company is deleted successfully",
        deleteCompany
    });

})

export const createJob=TryCatch(async(req:authenticatedRequest,res,next)=>{
    const user=req.user;
    if(!user){
        throw new ErrorHandler("Authentication is required",401);
    }
     const Usersrole=await sql`
    SELECT role FROM users WHERE user_id=${user.user_id}
    `;
    const userRole=Usersrole[0];

    if(userRole.role=='jobseeker'){
        throw new ErrorHandler("only recruiter is allowed",401);
    }
    const {title,description,salary,location,openings,job_type,work_location,role,company_id}=req.body;

    if(!title||!description||!salary||!location||!openings||!job_type||!work_location||!role||!company_id){
        throw new ErrorHandler("Data is insufficient",401);
    }

    const [company]=await sql `
    SELECT name FROM companies WHERE company_id=${company_id}
    AND recruiter_id=${user.user_id}
    `;

    if(!company){
        throw new ErrorHandler("Company does not exist or you are not authorized",400);
    }

    const [newJob]=await sql `
    INSERT INTO jobs(title,description,salary,location,openings,job_type,work_location,role,company_id,posted_by_recruiter_id)
    VALUES(${title},${description},${salary},${location},${openings},${job_type},${work_location},${role},${company_id},${user.user_id})
    RETURNING *
    `;
    
    res.json({
        message:"Job is created",
        newJob
    })

})

export const updateJob=TryCatch(async(req:authenticatedRequest,res,next)=>{
    const user=req.user;
    if(!user){
        throw new ErrorHandler("Authentication is required",401);
    }
     const Usersrole=await sql`
    SELECT role FROM users WHERE user_id=${user.user_id}
    `;
    const userRole=Usersrole[0];

    if(userRole.role=='jobseeker'){
        throw new ErrorHandler("only recruiter is allowed",401);
    }
    const {title,description,salary,location,openings,job_type,work_location,role,company_id}=req.body;

    if(!title||!description||!salary||!location||!openings||!job_type||!work_location||!role||!company_id){
        throw new ErrorHandler("Data is insufficient",401);
    }

    const [company]=await sql `
    SELECT name FROM companies WHERE company_id=${company_id}
    AND recruiter_id=${user.user_id}
    `;

    if(!company){
        throw new ErrorHandler("Company does not exist or you are not authorized to Update",400);
    }

    const [updatedJob]=await sql `
    UPDATE  jobs
    SET title=${title},description=${description},salary=${salary},location=${location},openings=${openings},job_type=${job_type},work_location=${work_location},role=${role},company_id=${company_id},posted_by_recruiter_id=${user.user_id}
    WHERE job_id=${req.params.job_id}
    RETURNING *
    `;
    
    res.json({
        message:"Job is updated",
        updatedJob
    })
})

export const getAllCompanies=TryCatch(async(req:authenticatedRequest,res,next)=>{
    const user=req.user;
    if(!user){
        throw new ErrorHandler("Authentication is required",401);
    }
     const Usersrole=await sql`
    SELECT role FROM users WHERE user_id=${user.user_id}
    `;
    const userRole=Usersrole[0];

    if(userRole.role=='jobseeker'){
        throw new ErrorHandler("only recruiter is allowed",401);
    }
    const [company]=await sql `
    SELECT * FROM companies WHERE recruiter_id=${user.user_id}
    `;
    res.json({
        message:"All companies Listed by you",
        company
    })
})

export const getAllCompanyDetails=TryCatch(async(req:authenticatedRequest,res,next)=>{
    const [companyDetails]=await sql`
    SELECT c.*, COALESCE(
    (SELECT json_agg(j.*) FROM jobs j WHERE j.company_id=c.company_id),
    '[]'::json
    )AS jobs 
    FROM companies c WHERE c.company_id=${req.params.companyId}
    GROUP BY c.company_id
    `;
    if(!companyDetails){
        throw new ErrorHandler("No company of this id ",400);
    }
    res.json({
        companyDetails
    })
})

export const getAllActiveJobs =TryCatch(async(req,res)=>{
    const{title,location}=req.query;

    const jobs=await sql`
    SELECT j.job_id,j.title,j.description,j.salary,j.location,j.job_type,j.openings,j.role,j.work_location,j.company_id,c.name as company_name,c.logo as company_logo 
    FROM jobs j 
    JOIN companies c
    ON j.company_id=c.company_id
    WHERE j.is_active=true
    ${title ? sql`AND j.title ILIKE ${`%${title}%`}` : sql``}
    ${location ? sql`AND j.location ILIKE ${`%${location}%`}` : sql``}
    ORDER BY j.created_at DESC
    `;

    res.json({
        message:"All active jobs",
        jobs
    })
})
export const getSingleJob=TryCatch(async(req,res)=>{
    const [job]=await sql`
    SELECT * FROM jobs j WHERE j.job_id=${req.params.jobId};
    `;
    res.json({
        job
    })
})
