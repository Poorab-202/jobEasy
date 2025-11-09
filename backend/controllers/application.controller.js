
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


export const applyJob = async (req, res) => {

    try {

        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required!",
                success: false
            });
        }

        // checking if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "Already applied to this job!",
                success: false
            });
        }

        //check if the job exist. although we can handle this and above in front-end by disabling the button but still we are writing here for understanding

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "job doesn't exist!",
                success: false
            });
        }

        //create a new application 
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        job.save();
        return res.status(201).json({
            message: "Job applied successfully!",
            success: true
        })

    } catch (error) {

        return res.status(400).json({
            message: "Error in apply job controller!",
            success: false
        });

    }

}

export const getAppliedJobs = async (req, res) => {

    try {

        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        });
        if (applications.length===0) {
            return res.status(200).json({
                message: "No applications found!",
                success: true
            });
        }

        return res.status(201).json({
            message: "Applications found!",
            applications,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error in getAppliedJobs controller!",
            success: false
        });
    }
}

export const getApplicants = async (req, res) => {

    try {

        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: { path: "applicant" }
        });
        const applications = job.applications;
        if (!applications) {
            return res.status(400).json({
                message: "No applications found!",
                success: false
            });
        }
        return res.status(201).json({
            message: "Applicants found!",
            applications,
            success: true
        })


    }

    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error in getApplicants controller!",
            success: false
        });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "Status is required!",
                success: false
            });
        }
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found!",
                success: false
            });
        }

        application.status = status.toLowerCase();
        application.save();

        return res.status(200).json({
            message: "Status updated successfully!",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error in updateStatus controller",
            success: false
        });

    }
}