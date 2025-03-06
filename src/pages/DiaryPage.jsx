import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DiaryPage.css";

const DiaryPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    diary: "",
  });

  const [message, setMessage] = useState(""); // 메시지 상태 추가
  const messages = [
    "오늘 하루, 당신만의 이야기를 들려주세요. 이곳은 당신만을 위한 공간입니다.",
    "좋은 일, 힘든 일 모두 괜찮아요. 이 순간, 당신의 마음을 글로 표현해 보세요.",
    "누구도 당신을 함부로 판단하지 않습니다. 자유롭게 당신의 이야기를 적어보세요.",
    "마음속에 담아둔 이야기가 있다면 이곳에 풀어놓아주세요.",
    "행복했던 순간도, 힘들었던 순간도 모두 당신의 이야기이기 때문에 더욱 가치가 있어요.",
    "힘든 하루였다면, 그 마음을 이곳에서 덜어보는 건 어떨까요?",
    "이곳은 당신의 쉼터입니다. 편안한 마음으로 일기를 적어보세요.",
  ];

  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // 메시지를 5초마다 변경
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex]);
    }, 5000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

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
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${apiBaseUrl}/dew/diary`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/diary/result", { state: response.data });
    } catch (error) {
      alert("An error occurred while saving your diary.");
    }
  };

  return (
    <div className="diary-container">
      <div className="diary-meta-data">
        <h2>How was your day today? 😊</h2>
        <p style={{ textAlign: "left" }}>Healing Space AI 기상 캐스터와 함께 <br/>오늘의 일기를 작성해 보세요!</p>
        <p style={{ textAlign: "left" }}>Healing Space AI 기상 캐스터는... </p>
        <p style={{ textAlign: "left" }}>1. 당신의 일기에서 오늘 당신의 감정을 분석합니다.</p>
        <p style={{ textAlign: "left" }}>2. 당신의 감정을 날씨와 비유하여 기록해줍니다. <br /> 
        <br/> 기쁨 = 맑음 ☀️
        <br/> 설렘&사랑 = 봄비 🌦️
        <br/> 평온 = 노을 🌇
        <br/> 외로움 = 구름 ☁️
        <br/> 슬픔 = 비 🌧️
        <br/> 화남 = 천둥 ⛈️</p>
        <p style={{ textAlign: "left" }}>3. 마지막으로, Healing Space AI 기상 캐스터는 일기를 기반으로 당신에게 "따뜻한 편지"를 써줍니다.</p>

      </div>

      <div className="diary-card2">
        <div className="diary-header">
          {/* <h1 style={{ textAlign: "left" }}>Diary</h1> */}
          <img src='../src/assets/images/aidiary.png' alt='Chatbot' className='meta-image' />

          <div className="message-banner">
            <p>{message}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-container">

            <label htmlFor="title">Diary title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter diary title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="diary">Diary content</label>
            <textarea
              id="diary"
              name="diary"
              placeholder="Write your diary here"
              value={formData.diary}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="diary-submit-btn">
            Save Diary
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiaryPage;
