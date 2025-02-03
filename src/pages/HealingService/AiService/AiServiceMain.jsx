  import React from "react";
  import { useNavigate } from "react-router-dom"; // useNavigate를 사용하여 페이지 이동
  import "../../../styles/HealingService/AiService/AiServiceMain.css"; // 스타일링을 위한 CSS 파일을 추가

  const AiServiceMain = () => {

    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    return (
      <div className="ai-service-container">


        {/* AI 서비스 로고 */}
        <img src="../src/assets/images/Ai_Services/AiServices.png"></img>
        <p> We prepare AI Services for you. Let's try !😊 </p>

      

        <div className="card-container">

            {/* 첫 번째 카드: Diary */}
        <div className="service-card"
            onClick={() => navigate("/diary")} 
            style={{ cursor: "pointer" }} // 카드에 클릭 가능한 스타일 추가
          >
            <div className="left-point">
              <h2 style={{ textAlign: "left" }}>[ AI Diary ]</h2>
              <img
                src="../src/assets/images/Ai_Services/diary.jpg" // 적절한 이미지 경로로 변경
                alt="diary"
                className="service-image"
              />
            </div>

            <div className="healing-description">
            <p className="service-description" style={{ textAlign: "left" }}>
            "AI Diary" 서비스는 당신의 하루를 더욱 특별하게 기록할 수 있도록 돕는 스마트한 일기 분석 서비스입니다.<br/>
            이제, AI Diary와 함께 당신의 감정을 기록하고, 하루를 더욱 특별하게 만들어 보세요.
당신의 하루가 소중한 기억으로 남을 수 있도록, AI Diary가 항상 함께 하겠습니다.
            </p>

            <h5 style={{ textAlign: "left" }}> 📖 일기 작성 & 저장 📖</h5>

            <h5 style={{ textAlign: "left" }}> ☀️ 사용자 감정을 날씨로 매칭 ☀️</h5>

            <h5 style={{ textAlign: "left" }}> 💌 AI 응원과 격려의 편지 💌 </h5>

            <h5 style={{ textAlign: "left" }}> 🌿 힐링 메시지 & 힐링 뮤직 추천 🌿</h5>


            <p className="service-description" style={{ textAlign: "left" }}></p>

            </div>
          </div>

          {/* 첫 번째 카드: AI Letter */}
          <div className="service-card"
            onClick={() => navigate("/ai-letter")} // 클릭 시 AiLetter 페이지로 이동
            style={{ cursor: "pointer" }} // 카드에 클릭 가능한 스타일 추가
          >
            <div className="left-point">
              <h2 style={{ textAlign: "left" }} >[ AI Letter ]</h2>
              <img
                src="../src/assets/images/Ai_Services/letterimg.jpg" // 적절한 이미지 경로로 변경
                alt="AI Letter"
                className="service-image"
              />
            </div>

            <p className="service-description" style={{ textAlign: "left" }}>
              AI Letter는 당신의 고민을 들은 Healing Space AI가 당신의 감정과 생각을 분석하여, 응원과 격려의 편지를 전해주는 서비스입니다.<br/>
              단순한 응원이 아니라, 당신의 마음을 어루만지고 힘을 북돋아 줄 수 있는 맞춤형 편지를 제공합니다. 스스로를 돌아볼 기회를 만들고, 마음의 짐을 조금이나마 덜어줄 수 있도록 도와주는 AI Letter와 함께 따뜻한 위로를 받아보세요.
            

            <h5 style={{ textAlign: "left" }}> 🤔 현재의 고민을 작성 🤔</h5>

            <h5 style={{ textAlign: "left" }}> 🔒 남들은 볼 수 없는 나만의 기록 🔒</h5>

            <h5 style={{ textAlign: "left" }}> 💌 AI 위로와 조언의 편지 💌 </h5>

            </p>
          </div>

          {/* 두 번째 카드: Today's AI SnapShot */}
          <div className="service-card"
            onClick={() => navigate("/question1")} // 클릭 시 AiLetter 페이지로 이동
            style={{ cursor: "pointer" }} // 카드에 클릭 가능한 스타일 추가
          >
            <div className="left-point">
              <h2 style={{ textAlign: "left" }}>[ Today's AI SnapShot ]</h2>
              <img
                src="../src/assets/images/Ai_Services/snapshotimg.jpg" // 적절한 이미지 경로로 변경
                alt="Today's AI SnapShot"
                className="service-image"
              />
            </div>
            <p className="service-description" style={{ textAlign: "left" }}>
              Today's AI SnapShot은 오늘 하루에 대한 질문에 하나하나 답을 하며, 당신에게 평안과 위로의 메시지를 전해주는 서비스 입니다.<br/>
              하루를 차분히 마무리하며 스스로를 이해하고, 내일을 향해 나아갈 힘을 얻을 수 있도록 돕는 서비스입니다.

              
            <h5 style={{ textAlign: "left" }}> ❓ 나를 돌아보는 7가지의 정해진 질문 ❓ </h5>

            <h5 style={{ textAlign: "left" }}> ⏰ 나에 대해 조금씩 알아가는 시간...😊 ⏰ </h5>

            <h5 style={{ textAlign: "left" }}> 🔒 남들은 볼 수 없는 나만의 기록 🔒</h5>

            <h5 style={{ textAlign: "left" }}> 💌 AI 격려와 응원 편지 💌 </h5>

            </p>
          </div>
        </div>
      </div>
    );
  };

  export default AiServiceMain;
