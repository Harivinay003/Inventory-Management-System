import React, { useState } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    }
  };
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const firebaseToken = await result.user.getIdToken();

    const res = await axios.post("http://localhost:5000/api/auth/firebase-login", {
      token: firebaseToken,
    });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    console.error("Firebase login failed:", err);
    alert("Google login failed");
  }
};

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        <div className="login-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      <button
      type="button"
      className="oauth-btn"
      onClick={handleGoogleLogin}
      >
      Continue with Google
    </button>
      </form>
    </div>
  );
};

export default Login;
