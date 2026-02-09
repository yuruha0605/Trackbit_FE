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

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/mypage" element={<MyPage />}>
            <Route index element={<UserRecord />} />
            <Route path="user" element={<UpdateUser />} />
            <Route path="trophy" element={<MyTrophy />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
