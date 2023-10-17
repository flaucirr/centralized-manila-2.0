import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); // Move this line inside the function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(""); // New state to track successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/login", { mobile_no: username, user_pass: password });
      if (response.data.message === "Authentication successful") {
        setLoginSuccess("Authentication successful");
        navigate("/dashboard"); // Move this line inside the if block
      } else {
        setLoginError("Authentication failed"); // Set error message for unsuccessful login
      }
    } catch (error) {
      console.error(error);
      setLoginError(error.response.data.message); // Set error message from the server response
    }
  };

  return (
    <div className='bg-white'>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 items-center">
        <div className="md:w-1/3 max-w-sm mx-16">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
          />
        </div>

        <div className="md:w-1/3 max-w-sm">
          <form onSubmit={handleSubmit}>
            <h1 className='text-center mb-7 text-black'>Login</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {loginError ? (
              <p className="text-red-600">{loginError}</p>
            ) : null}
            {loginSuccess ? (
              <p className="text-green-600">{loginSuccess}</p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
