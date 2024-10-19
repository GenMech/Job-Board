const Job = require("../models/job");
const Company = require("../models/company");
const EmailLog = require("../models/emailLog");
const sendEmail = require("../utils/sendEmail");

exports.createJob = async (req, res) => {
  const { title, description, experienceLevel, candidates, endDate } = req.body;

  try {
    const company = await Company.findById(req.company.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const job = new Job({
      company: company.id,
      title,
      description,
      experienceLevel,
      candidates,
      endDate,
    });

    await job.save();

    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.company.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.sendJobAlerts = async (req, res) => {
  const { jobId, candidateEmails } = req.body;

  try {
    const job = await Job.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.company.id !== req.company.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to send alerts for this job" });
    }

    const emailsSent = [];

    for (let email of candidateEmails) {
      const subject = `Job Alert: ${job.title}`;
      const message = `
        Hello,

        You have been selected for the following job opportunity:

        Job Title: ${job.title}
        Description: ${job.description}
        Experience Level: ${job.experienceLevel}
        End Date: ${new Date(job.endDate).toLocaleDateString()}

        Regards,
        ${job.company.name}
      `;

      await sendEmail({
        to: email,
        subject,
        text: message,
      });

      const emailLog = new EmailLog({
        company: job.company.id,
        job: job.id,
        recipient: email,
        subject,
        message,
      });

      await emailLog.save();
      emailsSent.push(email);
    }

    res.json({ message: "Job alerts sent successfully", emailsSent });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
