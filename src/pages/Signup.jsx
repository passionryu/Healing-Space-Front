import React, { useState } from "react";
import axios from "axios"; // axios 임포트 추가
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// 회원가입 요청 함수
const signup = async (formData) => {
  try {
    const response = await axios.post("${apiBaseUrl}/member/register", formData);
    return response.data; // API에서 보내주는 성공 메시지나 데이터를 반환
  } catch (error) {
    throw error; // 에러 발생 시 throw
  }
};

const Signup = () => {
  const navigate = useNavigate(); // 네비게이션 훅 사용
  const [formData, setFormData] = useState({
    username: "",
    nickName: "",
    phoneNumber: "",
    gender: "",
    password: "",
    email: "",
    birth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    

    e.preventDefault();

    try {
      const result = await signup(formData); // signup 함수 호출
      alert("Sign Up Successful");
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          {/* 서비스 로고 */}
          <div className="logo-container">
            <img src="../src/assets/images/main_logo.png" alt="Main Logo" className="main-logo" />
          </div>
          <p className="description" style={{ textAlign: "left" }}>
            <span className="line line1"> 🌿Welcome to "Healing Space"🌿</span>
            <br />
            <span className="line line2">We develop IT services for your peace of mind.</span>
            <br />
            <span className="line line3">We hope that you find peace & happiness when you visit here.😊</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-input-form-container">
            <div className="login-left">
              <div className="signup-input-container">
                <label htmlFor="username">Username (실제 이름)</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-input-container">
                <label htmlFor="nickName">ID (활동명)</label>
                <input
                  type="text"
                  id="nickName"
                  name="nickName"
                  placeholder="Enter your ID"
                  value={formData.nickName}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-input-container">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="login-right">
              <div className="signup-input-container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-input-container">
                <label htmlFor="birth">Birth Date</label>
                <input
                  type="date"
                  id="birth"
                  name="birth"
                  value={formData.birth}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <br />
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
