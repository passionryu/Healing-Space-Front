import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/DiaryResultPage.css";

const DiaryResultPage = () => {
  const location = useLocation();
  const { emotion, weather, healingMessage, healingMusic } = location.state || {};
  //const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const weatherImages = {
    맑음: "../src/assets/images/weather_img/sunny.png", // 맑은 날씨 이미지 URL
    봄비: "../src/assets/images/weather_img/spring.png", // 봄비 이미지 URL
    노을: "../src/assets/images/weather_img/sunset.png", // 노을 이미지 URL
    구름: "../src/assets/images/weather_img/cloudy.png", // 구름 이미지 URL
    비: "../src/assets/images/weather_img/rain.png", // 비 이미지 URL
    천둥: "../src/assets/images/weather_img/thunder.png", // 천둥 이미지 URL
  };

  if (!location.state) {
    return <div>상태 정보가 없습니다.</div>; // 상태가 없을 경우 안내 메시지
  }

  return (
    <div className="result-container" >
      <div className="result-page-card">
        <h1>✉️ AI Diary Service for you ✉️ </h1>

        {/* 날씨에 맞는 이미지 출력 */}
        <div className="weather-image-container">
          <img
            src={weatherImages[weather] || "path/to/default-image.jpg"} // 기본 이미지 설정
            alt={weather}
            className="weather-image"
          />
        </div>

        <div className="result">

          {/* <h3 style={{textAlign : "left"}}>Emotion: {emotion}</h3>
          <h3 style={{textAlign : "left"}}>Weather: {weather}</h3>
          <h3 style={{textAlign : "left"}}>Healing Message: {healingMessage}</h3>
          <h3 style={{textAlign : "left"}}>Healing Music: {healingMusic}</h3> */}

          {/* <p style={{ textAlign: "left" }}> 우리 Healing Space팀의 AI서비스가 당신의 일기를 분석한 후, <br />
            응원하는 마음과 격려하는 마음을 담아, 다음과 같이 당신에게 메시지를 전해드립니다.
          </p> */}

          <p style={{ textAlign: "left" }}>
            Healing Space의 AI감정 분류 서비스에 의하면, 현재 당신의 감정은 "{emotion}"({weather})으로 분석이 됩니다. <br />
            내일 당신은 어떤 날씨(감정)가운데 하루를 보내고 싶은가요?
          </p>

          <p style={{ textAlign: "left" }}>{healingMessage}</p>


          <h5 style={{ textAlign: "right" }} >
            - 발신자 : <br/>
            항상 이 자리에서 기다리며<br/>
            당신을 응원하는 Team Healing Space
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DiaryResultPage;
