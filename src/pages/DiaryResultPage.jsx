import React from "react";
import { useLocation } from "react-router-dom";

const DiaryResultPage = () => {
  const location = useLocation();
  const { emotion, weather, healingMessage, healingMusic } = location.state || {};
 
  if (!location.state) {
    return <div>상태 정보가 없습니다.</div>; // 상태가 없을 경우 안내 메시지
  }

  return (
    <div className="result-container">
      <div className="result-card">
        <h2>Your Diary Analysis</h2>

        <div className="result">
          <h3>Emotion: {emotion}</h3>
          <h3>Weather: {weather}</h3>
          <h3>Healing Message: {healingMessage}</h3>
          <h3>Healing Music: {healingMusic}</h3>
        </div>
      </div>
    </div>
  );
};

export default DiaryResultPage;
