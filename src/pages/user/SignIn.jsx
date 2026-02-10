import "./SignIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/api/auth/login", {
        id,
        password,
      });

      const userData = {
        id: data.userId,
        loginId: data.loginId ?? id,
        name: data.name,
      };

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      login(userData); // ⭐ Header 즉시 반영
      navigate("/mypage");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "아이디 또는 비밀번호가 올바르지 않습니다."
      );
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-field">
          <label>ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            required
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-btn">
          Sign In
        </button>
        <button
          type="button"
          className="forgot-btn"
          onClick={() => navigate("/findPassword")}>
          Forgot password? 
        </button>
      </form>
    </div>
  );
}

export default SignIn;
