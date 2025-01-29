import React from 'react';
import { useLocation } from 'react-router-dom';
import "../../../../styles/HealingService/AiService/TodayAiSnapShot/AiResponsePage.css";

const AiResponsePage = () => {
  const location = useLocation();
  const { aiResponse } = location.state; // AI 응답을 props로 받아옴

  return (
    <div className="ai-snapshot-response-container">
      <div className="ai-snapshot-response-card">
        <h1 style={{textAlign : "center"}}>오늘 하루 고생한 당신을 위한 편지📬</h1>
        <div className="ai-snapshot-response-message">
          <p>{aiResponse}</p> 

          <h4 style={{textAlign : "right"}}> <strong> * 당신을 언제나 응원하는 Healing Space AI</strong></h4>
        </div>
        {/* 선택적으로 버튼 추가 */}
        {/* <a href="/" className="ai-response-btn">다시 시작하기</a> */}
      </div>
    </div>
  );
};

export default AiResponsePage;
