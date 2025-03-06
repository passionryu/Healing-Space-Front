import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState(""); // 사용자명
  const [password, setPassword] = useState(""); // 비밀번호
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
  const navigate = useNavigate(); // 로그인 성공 후 페이지 이동
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // 아이디 변경 시 호출
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // 비밀번호 변경 시 호출
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 로그인 폼 제출 시 호출
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // 요청을 보낼 때 JSON 형식으로 데이터 전송
      // ${apiBaseUrl}
      // http://localhost:8080
      const response = await axios.post(
        `${apiBaseUrl}/auth/login/id`, // 로그인 API 경로
        { nickName: username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // JWT 토큰을 성공적으로 받았을 때
      const { accessToken, refreshToken } = response.data;

      // 받은 토큰을 로컬스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 로그인 성공 시 홈 화면으로 이동
      //alert("Login Successful");
      alert(apiBaseUrl);
      navigate("/");
    } catch (error) {
      // 오류 발생 시 오류 메시지 처리
      console.error("Login failed:", error);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* 서비스 로고 */}
        <div className="login-logo-container">
          <img src="../src/assets/images/main_logo.png" alt="Main Logo" className="main-logo" />
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin}>
          {/* 아이디 입력 칸 */}
          <div className="input-container">
            <label htmlFor="username">ID</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your ID"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          {/* 비밀번호 입력 칸 */}
          <div className="pw-input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          {/* 오류 메시지 표시 */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* 로그인 버튼 */}
          <button className="login-btn" type="submit">Login</button>
        </form>

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
