import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Calendar", path: "/calendar" },
  { label: "Habit", path: "/habit" },
  { label: "Mission", path: "/mission" },
  { label: "Report", path: "/report" },
  { label: "Review", path: "/review" },
  { label: "My Page", path: "/mypage" },
];

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* 로고 */}
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        {/* 네비게이션 */}
        <nav className="header-nav">
          {NAV_ITEMS.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* 인증 영역 */}
        <div className="header-auth">
          {user ? (
            <>
              <span className="user-name">{user.name}</span>
              <button className="auth-btn neutral" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className="auth-btn neutral">
                Sign in
              </NavLink>
              <NavLink to="/register" className="auth-btn primary">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
