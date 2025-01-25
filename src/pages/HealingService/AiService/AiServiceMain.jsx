import React from "react";
import "../../../styles/HealingService/AiService/AiServiceMain.css"; // 스타일링을 위한 CSS 파일을 추가

const AiServiceMain = () => {
  return (
    <div className="ai-service-container">

      
      {/* AI 서비스 로고 */}
      <img src="../src/assets/images/Ai_Services/AiServices.png"></img>
      <p> We prepare AI Services for you. Let's try !😊 </p>

      <div className="card-container">
        {/* 첫 번째 카드: AI Letter */}
        <div className="service-card">
          <h2 style={{textAlign : "left"}} >AI Letter</h2>
          <img
            src="../src/assets/images/Ai_Services/letterimg.jpg" // 적절한 이미지 경로로 변경
            alt="AI Letter"
            className="service-image"
          />
          <p className="service-description" style={{textAlign : "left"}}>
            AI Letter는 당신의 감정과 생각을 분석하여, 응원과 격려의 편지를 전해주는 서비스입니다.
          </p>
        </div>

        {/* 두 번째 카드: Today's AI SnapShot */}
        <div className="service-card">
          <h2 style={{textAlign : "left"}}>Today's AI SnapShot</h2>
          <img
            src="../src/assets/images/Ai_Services/snapshotimg.jpg" // 적절한 이미지 경로로 변경
            alt="Today's AI SnapShot"
            className="service-image"
          />
          <p className="service-description" style={{textAlign : "left"}}>
            Today's AI SnapShot은 오늘의 감정과 날씨에 맞는 AI 분석을 제공하는 서비스입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiServiceMain;
