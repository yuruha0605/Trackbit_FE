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
      await api.post(
        "/user/find",
        null,
        {
          params: {
            userId: form.loginId,
            userName: form.name,
          },
        }
      );

      navigate("/resetPassword", {
        state: { loginId: form.loginId },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "사용자 정보를 확인할 수 없습니다."
      );
    } finally {
      setLoading(false);
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
              />
            </div>
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? "확인 중..." : "비밀번호 재설정"}
        </button>
      </form>
    </div>
  );
}

export default FindPassword;
