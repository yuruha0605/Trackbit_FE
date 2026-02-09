import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindPassword.css";
import api from "../../api/axios.js";

const FORM_FIELDS = [
  { label: "ID", name: "loginId", type: "text", required: true },
  { label: "Name", name: "name", type: "text", required: true },
];

function FindPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    loginId: "",
    name: "",
  });

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPassword("");
    setSuccess(false);

    try {
      const { data } = await api.post("/users/findPassword", {
        loginId: form.loginId,
        name: form.name,
      });

      setPassword(data.password);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "사용자 정보를 확인할 수 없습니다."
      );
      console.error("find password error:", err);
    }
  };

  return (
    <div className="find-page">
      <form className="find-form" onSubmit={handleSubmit}>
        <h2 className="find-title">비밀번호 찾기</h2>

        <p className="required-info">
          <span className="required">*</span> 필수 입력 항목
        </p>

        <div className="form-grid">
          {FORM_FIELDS.map(({ label, name, type, required }) => (
            <div key={name} className="form-field full">
              <label htmlFor={name}>
                {label}
                {required && <span className="required">*</span>}
              </label>

              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                placeholder={label}
                required={required}
                disabled={success} 
              />
            </div>
          ))}
        </div>

        {error && <p className="form-error">{error}</p>}

        {success && (
          <div className="form-success">
            <p>비밀번호를 찾았습니다</p>
            <strong>비밀번호: {password}</strong>

            <button
              type="button"
              className="go-login-btn"
              onClick={() => navigate("/signin")}
            >
              로그인 하러 가기
            </button>
          </div>
        )}

        {!success && (
          <button type="submit" className="submit-btn">
            비밀번호 찾기
          </button>
        )}
      </form>
    </div>
  );
}

export default FindPassword;
