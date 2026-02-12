import React, { createContext, useState, useContext } from 'react';

// 1. Context 생성
const AuthContext = createContext(null);

// 2. Provider 생성 (로그인 상태 관리)
export const AuthProvider = ({ children }) => {
  // ★ 로그인된 척하기 위해 초기값에 가짜 데이터 넣음
  const [user, setUser] = useState({
    userId: "1",      // 문자열 "1" (백엔드가 String으로 받음)
    username: "건호",
    role: "USER"
  });
  
  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. ★★★ 건호님 에러 원인: 이 함수(useAuth)가 없어서 에러 났던 것임! ★★★
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;