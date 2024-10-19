import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const { register, authError } = useContext(AuthContext);
  const history = useHistory();

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
      history.push("/login");
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div>
      <h2>Company Registration</h2>
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Company Email"
            required
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={onChange}
            placeholder="Phone no."
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
