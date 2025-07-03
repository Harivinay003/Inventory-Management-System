import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "var(--bg-color)",
        transition: "all 0.3s ease",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "var(--card-bg)",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            background: "dodgerblue",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
            marginTop: "10px",
            transition: "0.3s",
          }}
        >
          Register
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "16px",
  backgroundColor: "var(--input-bg)",
  color: "var(--text-color)",
};

export default Register;
