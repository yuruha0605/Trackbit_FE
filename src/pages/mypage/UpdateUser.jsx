import { useEffect, useState } from "react";
import "./UpdateUser.css";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UpdateUser() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [form, setForm] = useState({
    loginId: "",
    name: "",
    password: "",
    job: "",
    interest: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setForm({
          loginId: res.data.loginId,
          name: res.data.name || "",
          password: "",
          job: res.data.job || "",
          interest: res.data.interest || "",
        });
      } catch {
        setError("사용자 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.put(
        "/users/me",
        {
          name: form.name,
          password: form.password || undefined,
          job: form.job,
          interest: form.interest,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("정보가 수정되었습니다.");
      navigate("/mypage");
    } catch {
      setError("정보 수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 회원 탈퇴하시겠습니까?")) return;

    try {
      await api.delete("/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      logout();
      navigate("/");
    } catch {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="update-user">
      <form
        className="page-container container-lg"
        onSubmit={handleSubmit}
      >
        {error && <p className="error-text">{error}</p>}

        <div className="form-grid">
          <div className="form-field">
            <label>ID</label>
            <input value={form.loginId} disabled />
          </div>

          <div className="form-field">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="변경 시에만 입력"
            />
          </div>

          <div className="form-field">
            <label>Job</label>
            <input
              name="job"
              value={form.job}
              onChange={handleChange}
            />
          </div>

          <div className="form-field full">
            <label>What are you interest about?</label>
            <input
              name="interest"
              value={form.interest}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="button-row">
          <button
            type="button"
            className="btn-danger"
            onClick={handleDelete}
          >
            회원 탈퇴
          </button>

          <button type="submit" className="btn-primary">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
