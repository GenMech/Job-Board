import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useParams, useNavigate } from "react-router-dom";

const SendAlerts = () => {
  const { authToken } = useContext(AuthContext);
  const { jobId } = useParams();
  const history = useNavigate();

  const [candidateEmails, setCandidateEmails] = useState("");

  const onChange = (e) => setCandidateEmails(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    const emails = candidateEmails.split(",").map((email) => email.trim());

    try {
      const res = await axios.post(
        "/api/jobs/send-alerts",
        {
          jobId,
          candidateEmails: emails,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert(`Alerts sent to: ${res.data.emailsSent.join(", ")}`);
      history("/dashboard");
    } catch (error) {
      console.error(error.response?.data?.message || "Error sending alerts");
    }
  };

  return (
    <div>
      <h2>Send Job Alerts</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Candidate Emails (comma separated):</label>
          <input
            type="text"
            value={candidateEmails}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Send Alerts</button>
      </form>
    </div>
  );
};

export default SendAlerts;
