import React from "react";
import { useLocation } from "react-router-dom";

const DiaryResultPage = () => {
  const location = useLocation();
  const { emotion, weather, healingMessage, healingMusic } = location.state || {};

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
      <div className="result-card">
        <h1>당신에게 전하는 편지 ✉️ </h1>

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

          <p style={{ textAlign: "left" }}> 우리 Healing Space팀의 AI서비스가 당신의 일기를 분석한 후, <br />
            응원하는 마음과 격려하는 마음을 담아, 다음과 같이 당신에게 메시지를 전해드립니다.
          </p>

          <h4 >{healingMessage}</h4>

          <p style={{ textAlign: "left" }}>
            우리 Healing Space의 AI감정 분류 서비스에 의하면, 현재 당신의 감정은 "{emotion}"으로 분석이 됩니다. <br />
            그리고 오늘의 당신의 감정과 어울리는 날씨는 "{weather}"입니다. <br />
            내일 당신은 어떤 날씨(감정)가운데 하루를 보내고 싶은가요?
          </p>

          <p style={{ textAlign: "left" }}>
            당신이 일기를 작성하여 하루를 기록함과 동시에, <br />
            당신의 오늘의 복잡한 생각과 감정을 명확히 정리할 수 있는 시간이였기를 바랍니다.
          </p>

          <p style={{ textAlign: "left" }}>
            마지막으로 우리 Healing Space팀이 당신에게 추천해주는 음악은 다음과 같습니다.🎵 <br />
            당신의 오늘의 감정과 어울리는 음악으로 준비해봤습니다.
          </p>

          <p style={{ textAlign: "left" }}>
            {/* <a href="{healingMusic}"> 👉 이곳을 클릭하세요! </a> */}
            <a href={healingMusic} target="_blank" rel="noopener noreferrer">👉 이곳을 클릭하세요!</a>
          </p>

          <p style={{ textAlign: "left" }}>
            이 음악을 들으며 오늘 하루를 평안함 가운데에 마무리 할 수 있는 당신이 되면 좋겠습니다.😊
          </p>

          <h5 style={{ textAlign: "right" }}>
            -당신을 응원하는 Team Healing Space
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DiaryResultPage;
