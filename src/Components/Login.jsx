import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../Components/Login.css'

const URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToggleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function postFetch(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        await setToggleLogin(true);
        navigate("/dashboard");
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "demo", password: "password" };
    postFetch(user);
  }

  return (
    <div className="login-container">
      <h1>TaskMate</h1>
      <button className="demo-button" onClick={handleDemoSignIn}>Demo User</button>
      <br/>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="Username"
            autoComplete="username"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <br/>
      <p>No Account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
