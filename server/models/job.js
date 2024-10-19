const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: {
    type: String,
    enum: ["Junior", "Mid", "Senior"],
    required: true,
  },
  candidates: [{ type: String }],
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
