import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, authError } = useContext(AuthContext);
  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      history("/dashboard");
    } catch (error) {
      // Error handled in context
    }
  };

  const handleRegisterRedirect = () => {
    history("/register");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Welcome Back!</h2>
        <p>Enter your details to login to your company account.</p>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        {authError && <p className="error">{authError}</p>}
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn">
              Login
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleRegisterRedirect}
            >
              New here? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
