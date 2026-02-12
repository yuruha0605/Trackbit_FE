import "./SignIn.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/mypage";

  const { login } = useAuth();

  const [userId, setId] = useState("");
  const [userPassword, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/user/signin", {
        userId,
        userPassword,
      }, 
      {
        headers: { "Content-Type": "application/json" }
      });

      const accessToken = response.headers.get("authorization");

      const userData = {
        loginId: response.data.userId ?? userId,
        name: response.data.userName,
      };

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      login(userData);
      navigate(from, { replace: true });

    } catch (err) {
      console.error("로그인 실패:", err);
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
            value={userId}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={userPassword}
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
          <br />
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
