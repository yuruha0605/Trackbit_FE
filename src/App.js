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

import CalendarPage from "./pages/mission/CalendarPage";
import ReviewPage from "./pages/mission/ReviewPage";
import RankingPage from "./pages/dashboard/RankingPage";
import RecommendPage from "./pages/mission/RecommendPage";

import { AlertProvider } from "./context/AlertContext";
import useSseAlert from "./hooks/useSseAlert";

function App() {
  return (
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

            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/mission" element={<CalendarPage />} /> 
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/recommend" element={<RecommendPage />} />

            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<UserRecord />} />
              <Route path="user" element={<UpdateUser />} />
              <Route path="trophy" element={<MyTrophy />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AlertProvider>
  );
}

function SseListener() {
  useSseAlert();
  return null;
}

export default App;
