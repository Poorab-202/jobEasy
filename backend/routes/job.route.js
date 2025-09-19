import { postJob,getPostedJobs,getAllJobs,getJobById, searchJobs } from "../controllers/job.controller.js";
import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/getmyjobs").get(isAuthenticated,getPostedJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route('/search').get(isAuthenticated,searchJobs);

export default router;