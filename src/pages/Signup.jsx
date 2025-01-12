import React, { useState } from "react";
import { signup } from "../services/api"; // api.js에서 signup 함수 임포트
import "../styles/Signup.css";

const Signup = () => {
  /* 기본 세팅 된 데이터 */
  const [formData, setFormData] = useState({
    username: "",
    nickName: "",
    phoneNumber: "",
    gender: "",
    password: "",
    email: "",
    birth: "",
  });

  /* 사용자가 특정 항목에 값을 넣으면 상태를 변화시키는 함수 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* 폼 제출시 호출 되는 함수 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signup(formData); // signup 함수 호출
      alert("Sign Up Successful");
      //window.location.href = "/login";
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* 서비스 로고 */}
        <div className="logo-container">
          <img src="../src/assets/images/main_logo.png" alt="Main Logo" className="main-logo" />
        </div>

        <form onSubmit={handleSubmit}>
          {/* 사용자명 입력 칸 */}
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* 아이디 입력 칸 */}
          <div className="input-container">
            <label htmlFor="nickName">ID</label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              placeholder="Enter your ID"
              value={formData.nickName}
              onChange={handleChange}
            />
          </div>

          {/* 전화번호 입력 칸 */}
          <div className="input-container">
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

          {/* 성별 선택 (라디오 버튼) */}
          <div className="input-container">
            <label>Gender</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />{" "}
                Female
              </label>
            </div>
          </div>

          {/* 비밀번호 입력 칸 */}
          <div className="input-container">
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

          {/* 이메일 입력 칸 */}
          <div className="input-container">
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

          {/* 생년월일 입력 칸 */}
          <div className="input-container">
            <label htmlFor="birth">Birth Date</label>
            <input
              type="date"
              id="birth"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
            />
          </div>

          {/* 회원가입 버튼 */}
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
