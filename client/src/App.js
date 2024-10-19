import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./utils/PrivateRoute";
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
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={JobList} />
            <PrivateRoute path="/create-job" component={CreateJob} />
            <PrivateRoute path="/send-alerts/:jobId" component={SendAlerts} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
