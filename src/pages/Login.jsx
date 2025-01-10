import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        {/* 메인 로고 */}
        <div className="logo-container">
          <img src="../src/assets/images/main_logo.png" alt="Main Logo" className="main-logo" />
        </div>

        {/* 아이디 입력 칸 */}
        <div className="input-container">
          <label htmlFor="username">ID</label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>

        {/* 비밀번호 입력 칸 */}
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        {/* 로그인 버튼 */}
        <button className="login-btn">Login</button>

        {/* 회원가입 유도 링크 */}
        <div className="signup-link">
          <span>Don't have an Account?</span>
          <Link to="/signup" className="signup">Sign up!</Link>
        </div>

        {/* 아이디/비밀번호 찾기 링크 */}
        <div className="forgot-links">
          <Link to="/find-id" className="find-id">Find ID</Link>
          <Link to="/forgot-password" className="forgot-pw">Forgot PW?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
