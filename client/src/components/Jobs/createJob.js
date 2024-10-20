import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const { authToken } = useContext(AuthContext);
  const history = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experienceLevel: "Junior",
    candidates: "",
    endDate: "",
  });

  const { title, description, experienceLevel, candidates, endDate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const candidateEmails = candidates.split(",").map((email) => email.trim());

    try {
      const res = await axios.post(
        "/api/jobs",
        {
          title,
          description,
          experienceLevel,
          candidates: candidateEmails,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Job posted successfully");
      history("/dashboard");
    } catch (error) {
      console.error(error.response?.data?.message || "Error posting job");
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create a New Job Listing</h2>
      <form onSubmit={onSubmit} className="create-job-form">
        <div className="input-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter Job Title"
            required
          />
        </div>
        <div className="input-group">
          <label>Job Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Enter Job Description"
            required
          />
        </div>
        <div className="input-group">
          <label>Experience Level</label>
          <select
            name="experienceLevel"
            value={experienceLevel}
            onChange={onChange}
            required
          >
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div className="input-group">
          <label>Candidate Emails</label>
          <input
            type="text"
            name="candidates"
            value={candidates}
            onChange={onChange}
            placeholder="Comma separated emails"
            required
          />
        </div>
        <div className="input-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
