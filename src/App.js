import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import SignUp from "./pages/user/SignUp";
import SignIn from "./pages/user/SignIn";
import UpdateUser from "./pages/mypage/UpdateUser";
import MyPage from "./pages/mypage/MyPage";
import HomePage from "./pages/home/HomePage";
import MyTrophy from "./pages/mypage/MyTrophy";
import UserRecord from "./pages/mypage/UserRecord";
import FindPassword from "./pages/user/FindPassword";

import { AlertProvider } from "./context/AlertContext";
import useSseAlert from "./hooks/useSseAlert";

import HabitAdd from "./pages/mission/AddHabit";
import Mission from "./pages/mission/mission";
import Report from "./pages/mission/Report";
import RecommendPage from "./pages/mission/RecommendPage";
import CalendarPage from "./pages/mission/CalendarPage";
import ReviewPage from "./pages/mission/ReviewPage";
import RankingPage from "./pages/dashboard/RankingPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <AlertProvider>
      <SseListener/>
      <BrowserRouter>
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/register" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/findPassword" element={<FindPassword />}/>

            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<UserRecord />} />
              <Route path="user" element={<UpdateUser />} />
              <Route path="trophy" element={<MyTrophy />} />
            </Route>

            <Route path="/habit" element={<HabitAdd />}/>
            <Route path="/mission" element={<Mission />}/>
            <Route path="/report" element={<Report />}/>

            <Route path="/recommend" element={<RecommendPage/>}/>
            <Route path="/Calendar" element={<CalendarPage />}/>

            <Route path="/review" element={<ReviewPage />}/>
            <Route path="/rank" element={<RankingPage />}/>
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AlertProvider>
    </AuthProvider>
  );
}

function SseListener() {
  useSseAlert();
  return null;
}

export default App;
