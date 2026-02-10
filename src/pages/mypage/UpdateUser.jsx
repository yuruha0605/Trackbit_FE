import { useEffect, useState } from "react";
import "./UpdateUser.css";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UpdateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    loginId: "",
    name: "",
    password: "",
    job: "",
    interest: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  /** 내 정보 조회 */
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
      } catch (err) {
        console.error(err);
        setError("사용자 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /** input 변경 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** 정보 수정 */
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
    } catch (err) {
      console.error(err);
      setError("정보 수정에 실패했습니다.");
    }
  };

  /** 회원 탈퇴 */
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
    } catch (err) {
      console.error(err);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="update-user">
      <form className="update-user__form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <div className="form-row">
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              value={form.loginId}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="변경 시에만 입력"
            />
          </div>

          <div className="form-group">
            <label>Job</label>
            <input
              type="text"
              name="job"
              value={form.job}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group full">
          <label>What are you interest about?</label>
          <input
            type="text"
            name="interest"
            value={form.interest}
            onChange={handleChange}
          />
        </div>

        <div className="button-row">
          <button
            type="button"
            className="btn danger"
            onClick={handleDelete}
          >
            회원 탈퇴
          </button>

          <button type="submit" className="btn primary">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
