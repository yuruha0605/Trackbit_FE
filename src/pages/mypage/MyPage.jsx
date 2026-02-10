import { NavLink, Outlet } from "react-router-dom";
import "./MyPage.css";

const SIDEBAR_ITEMS = [
  { label: "내 리포트 확인", path: "/mypage" },
  { label: "내 정보 확인", path: "/mypage/user" },
  { label: "내 트로피 확인", path: "/mypage/trophy" },
];

const MyPage = () => {
  return (
    <div className="mypage-layout">
      {/* Sidebar */}
      <aside className="mypage-sidebar">
        {SIDEBAR_ITEMS.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
            end>
            {label}
          </NavLink>
        ))}
      </aside>

      {/* Content */}
      <main className="mypage-content">
        <div className="mypage-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MyPage;