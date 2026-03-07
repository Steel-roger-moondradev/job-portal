import express from 'express';
import { isAuth } from '../middleware/auth.js';
import uploadFile from '../middleware/multer.js';
import { companyDelete, createCompany, createJob, getAllActiveJobs, getAllCompanies, getAllCompanyDetails, getSingleJob, updateJob } from '../controllers/job.js';
const router=express.Router();
router.post("/add/company",isAuth,uploadFile,createCompany);
router.delete("/delete/:company",isAuth,companyDelete);
router.post("/add/job",isAuth,createJob);
router.put("/update/:job_id",isAuth,updateJob);
router.get("/company",isAuth,getAllCompanies);
router.get("/all/:companyId",isAuth,getAllCompanyDetails);
router.get("/all/",getAllActiveJobs);
router.get("/single/:jobId",getSingleJob);

export default router;