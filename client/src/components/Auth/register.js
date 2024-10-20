import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, authError } = useContext(AuthContext);
  const history = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const { name, email, mobile, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration successful. Please verify your email.");
      history("/login");
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h2>Join Our Platform!</h2>
        <p>
          Create your company profile and list your job openings for top
          talents.
        </p>
      </div>
      <div className="register-right">
        <h2>Sign Up</h2>
        {authError && <p className="error">{authError}</p>}
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Company Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Company Name"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Company Email"
              required
            />
          </div>
          <div className="input-group">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={onChange}
              placeholder="Phone no."
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
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
