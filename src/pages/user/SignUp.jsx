import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignUp.css";
import api from "../../api/axios.js";

const FORM_FIELDS = [
  { label: "ID", name: "loginId", type: "text", required: true },
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Password", name: "password", type: "password", required: true },
  { label: "Job", name: "job", type: "text", required: false },
  { label: "Interest", name: "interest", type: "text", required: false },
];

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    loginId: "",
    name: "",
    password: "",
    job: "",
    interest: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/users/signUp", form);
      navigate("/signin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "회원가입 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className="page-center">
      <form
        className="page-container container-md"
        onSubmit={handleSubmit}
      >
        <h2>회원가입</h2>
        <p className="required-info">
          <span className="required">*</span> 필수 입력 항목
        </p>

        <div className="form-grid">
          {FORM_FIELDS.map(({ label, name, type, required }) => (
            <div
              key={name}
              className={`form-field ${
                name === "interest" ? "full" : ""
              }`}
            >
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

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
