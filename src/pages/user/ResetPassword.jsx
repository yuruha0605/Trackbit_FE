import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ResetPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    loginId: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/user/resetPassword", {
        userId: form.loginId,
        newPassword: form.newPassword,
      });

      alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
      navigate("/signin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "비밀번호 변경에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <form
        className="page-container container-sm"
        onSubmit={handleSubmit}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "24px" }}>
          비밀번호 재설정
        </h2>

        <div className="form-grid">
          <div className="form-field full">
            <label>
              ID <span className="required">*</span>
            </label>
            <input
              name="loginId"
              value={form.loginId}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>

          <div className="form-field full">
            <label>
              새 비밀번호 <span className="required">*</span>
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="새 비밀번호"
              required
            />
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
