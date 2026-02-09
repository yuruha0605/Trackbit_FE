import { createContext, useContext, useState } from "react";
import { getUser as getUserFromStorage, logout as logoutUtil } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());

  const login = (userData) => {
    setUser(userData); // Header 등 전역 상태 업데이트
  };

  const logout = () => {
    logoutUtil(); // localStorage 초기화
    setUser(null);  // 전역 상태 초기화
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);
