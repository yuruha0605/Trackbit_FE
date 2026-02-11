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

      login(userData);
      navigate("/mypage");
    } catch {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="login-page">
      <form
        className="login-card page-container container-sm"
        onSubmit={handleSubmit}
      >
        <h2>로그인</h2>
        <div className="form-field">
          <label>ID</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}
        
        <button type="submit" className="btn-primary">
          Sign In
        </button>

        <div className="forgot-wrapper">
          <button
            type="button"
            className="btn-link"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <br/>
          <button
            type="button"
            className="btn-link"
            onClick={() => navigate("/findPassword")}
          >
            Forgot password?
          </button>
        </div>

      </form>
    </div>
  );
}

export default SignIn;
