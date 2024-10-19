const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createJob,
  getJobs,
  sendJobAlerts,
} = require("../controllers/jobController");

router.post("/", auth, createJob);
router.get("/", auth, getJobs);
router.post("/send-alerts", auth, sendJobAlerts);

module.exports = router;
