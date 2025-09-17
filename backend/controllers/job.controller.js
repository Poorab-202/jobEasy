import { query } from "express";
import { Job } from "../models/job.model.js";

//postJob for recruiter
export const postJob = async (req, res) => {

    try {

        const { title, description, requirements, salary, location, jobType, position, experience, numberOfPositions, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !numberOfPositions || !companyId) {
            return res.status(400).json({
                message: "something is missing!",
                success: false
            });
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            position,
            experienceLevel: Number(experience),
            numberOfPositions: Number(numberOfPositions),
            company: companyId,
            created_by: userId

        })

        return res.status(201).json({
            message: "New job created successfully!",
            job,
            success: true
        })

    } catch (error) {
        return res.status(400).json({
            message: "error occured in job creation process!",
            success: false
        });
    }
}

//list of jobs posted by recruiter
export const getPostedJobs = async (req, res) => {
    try {

        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({ path: "company" });// The populate function in Mongoose is used to automatically replace references (stored as ObjectIds) in a document with the actual data from the referenced document.

        if (!jobs) {
            return res.status(404).json({
                message: "No job posted by user!",
                success: false
            });
        }

        return res.status(201).json({
            message: "Jobs found!",
            jobs,
            success: true
        })


    } catch (error) {
        return res.status(400).json({
            message: "error in getting the jobs posted by recruiter",
            error,
            success: false
        });
    }
}

//getAlljobs for user
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("company");

    return res.status(200).json({
      message: "All jobs fetched successfully!",
      jobs,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching jobs",
      success: false
    });
  }
};

export const searchJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const jobs = await Job.find(query).populate("company");

    return res.status(200).json({
      message: "Searched jobs fetched successfully!",
      jobs,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in search job process",
      success: false
    });
  }
};


//getJobById for user
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ path: "company", path: "applications" });
        if (!job) {
            return res.status(404).json({
                message: "No job found!",
                success: false
            });
        }
        return res.status(201).json({
            message: "Job found!",
            job,
            success: true
        })
    } catch (error) {

    }
}