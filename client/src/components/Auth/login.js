import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { login, authError } = useContext(AuthContext);
  const history = useHistory();

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
      history.push("/dashboard");
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div>
      <h2>Company Login</h2>
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
