import express from 'express';
import { isAuth } from '../middleware/auth.js';
import { addSkill, applyForJob, deleteSkill, getAllApllications, getProfile, myProfile, updatePic, updateProfile, updateResume } from '../controllers/user.js';
import uploadFile from '../middleware/multer.js';

const router=express.Router();
router.get("/me",isAuth,myProfile);
router.get("/:userId",isAuth,getProfile);
router.put("/update/profile",isAuth,updateProfile);
router.put("/update/pic",isAuth,uploadFile,updatePic);
router.put("/update/resume",isAuth,uploadFile,updateResume);
router.post("/add/skills",isAuth,addSkill);
router.delete("/delete/skills",isAuth,deleteSkill);
router.post("/apply",isAuth,applyForJob);
router.post("/seeall",isAuth,getAllApllications)

export default router;