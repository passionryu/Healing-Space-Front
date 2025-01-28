import React from 'react';
import { useLocation } from 'react-router-dom';
import "../../../../styles/HealingService/AiService/TodayAiSnapShot/question.css"

const AiResponsePage = () => {
  const location = useLocation();
  const { aiResponse } = location.state; // AI 응답을 props로 받아옴

  return (
    <div className="ai-response-container">
      <h2 style={{ textAlign: "center" }}>AI 위로의 편지</h2>
      <div className="ai-response-message">
        <p>{aiResponse}</p>
      </div>
    </div>
  );
};

export default AiResponsePage;
