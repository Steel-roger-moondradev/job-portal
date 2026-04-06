import express from 'express';
import { isAuth } from '../middleware/auth.js';
import uploadFile from '../middleware/multer.js';
import { companyDelete, createCompany, createJob, getAllActiveJobs, getAllApplicationsForJob, getAllCompanies, getAllCompanyDetails, getSingleJob, selectapplicants, updateJob } from '../controllers/job.js';

const router=express.Router();
router.post("/add/company",isAuth,uploadFile,createCompany);
router.put("/delete/:company",isAuth,companyDelete);
router.post("/add/job",isAuth,createJob);
router.put("/update/:job_id",isAuth,updateJob);
router.get("/company",isAuth,getAllCompanies);
router.get("/all/:companyId",isAuth,getAllCompanyDetails);
router.get("/all/",getAllActiveJobs);
router.get("/single/:jobId",getSingleJob);
router.get("/getalljobs/:jobId",isAuth,getAllApplicationsForJob);
router.put("/select/:id",isAuth,selectapplicants);


export default router;