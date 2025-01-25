import React, { useState } from "react";
import "../../../../styles/HealingService/AiService/AiLetter/AiLetter.css";
import axios from "axios";  // axios import 추가
import { useNavigate } from "react-router-dom"; // useNavigate 사용

const AiLetter = () => {
  const [story, setStory] = useState(""); // 사용자 입력 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
  const [aiResponse, setAiResponse] = useState(null); // AI 응답 상태
  const navigate = useNavigate(); // navigate 객체 사용

  const handleInputChange = (e) => {
    setStory(e.target.value);
  };

  const handleSubmit = async () => {
    if (!story.trim()) {
      alert("고민을 입력해주세요!");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기

      // 서버로 데이터 전송
      const response = await axios.post(
        "http://localhost:8080/airecommend", 
        { content: story },  // 서버에 보낼 데이터
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // JWT 토큰 포함
          },
        }
      );

      if (response.status === 200) {
        setAiResponse(response.data); // AI 응답 상태 업데이트

        setStory(""); // 입력란 초기화

        // 페이지 이동
        navigate("/ai-letter-result", {
          state: { aiResponse: response.data }, // state로 응답 데이터 전달
        });
      } else {
        alert("전송 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("전송 오류:", error);
      alert("오류가 발생했습니다. 네트워크를 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ai-letter-container">
      <img src="../src/assets/images/Ai_Services/AiLetter.png" alt="AI Service" />

      <p className="description" style={{ textAlign: "left" }}>
        <span className="line line1">무슨 고민을 하고 있나요?</span>
        <br />
        <span className="line line2">무엇이든 좋습니다. 당신의 고민을 적어주세요.😊</span>
        <br />
        <span className="line line3">당신을 위한 Healing Space AI 상담사가 당신의 상황에 공감하며 성심껏 편지를 작성해드립니다.✉️</span>
      </p>

      <textarea
        className="story-input"
        placeholder="고민을 자유롭게 작성하세요..."
        value={story}
        onChange={handleInputChange}
        disabled={isSubmitting}
      ></textarea>

      <button
        className="ai-letter-submit-button"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "전송 중..." : "Send"}
      </button>
    </div>
  );
};

export default AiLetter;
