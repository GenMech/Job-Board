import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./utils/privateRoute";
import Register from "./components/Auth/register";
import Login from "./components/Auth/login";
import JobList from "./components/Jobs/jobList";
import CreateJob from "./components/Jobs/createJob";
import SendAlerts from "./components/Jobs/sendAlerts";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <h1>Job Posting Platform</h1>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <JobList />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-job"
              element={
                <PrivateRoute>
                  <CreateJob />
                </PrivateRoute>
              }
            />
            <Route
              path="/send-alerts/:jobId"
              element={
                <PrivateRoute>
                  <SendAlerts />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
