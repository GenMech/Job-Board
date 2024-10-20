import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const JobList = () => {
  const { authToken, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setJobs(res.data);
      } catch (error) {
        console.error(error.response?.data?.message || "Error fetching jobs");
      }
    };

    fetchJobs();
  }, [authToken]);

  const handleLogout = () => {
    logout();
    history("/login");
  };

  return (
    <div>
      <h2>Your Job Postings</h2>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/create-job">Post a New Job</Link>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Experience Level: {job.experienceLevel}</p>
            <p>End Date: {new Date(job.endDate).toLocaleDateString()}</p>
            <Link to={`/send-alerts/${job._id}`}>Send Alerts</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
