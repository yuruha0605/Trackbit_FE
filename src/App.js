import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/Common.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./context/AuthContext";

import SignUp from "./pages/user/SignUp";
import SignIn from "./pages/user/SignIn";
import UpdateUser from "./pages/mypage/UpdateUser";
import MyPage from "./pages/mypage/MyPage";
import HomePage from "./pages/home/HomePage";
import MyTrophy from "./pages/mypage/MyTrophy";
import UserRecord from "./pages/mypage/UserRecord";
import FindPassword from "./pages/user/FindPassword";
import ResetPassword from "./pages/user/ResetPassword";

import HabitAdd from "./pages/mission/AddHabit";
import Mission from "./pages/mission/mission";
import Report from "./pages/mission/Report";
import CalendarPage from "./pages/mission/CalendarPage";
import ReviewPage from "./pages/mission/ReviewPage";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/register" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/mypage" element={<MyPage />}>
                <Route index element={<UserRecord />} />
                <Route path="user" element={<UpdateUser />} />
                <Route path="trophy" element={<MyTrophy />} />
              </Route>

              <Route path="/habit" element={<HabitAdd />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/report" element={<Report />} />

              <Route path="/Calendar" element={<CalendarPage />} />

              <Route path="/review" element={<ReviewPage />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
