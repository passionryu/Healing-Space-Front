import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 임포트합니다
import "../../../../styles/HealingService/AiService/AiLetter/AiLetterResult.css";

const AiLetterResult = () => {
  const location = useLocation(); // 이전 화면에서 전달된 상태 가져오기
  const { aiResponse, userNumber } = location.state || {}; // 상태 값이 없으면 빈 객체
  const navigate = useNavigate(); // 페이지 전환을 위해 useNavigate 훅을 사용

  if (!aiResponse) {
    return <div>결과가 없습니다.</div>;
  }

  // 줄바꿈을 <br />로 변환하는 함수
  const formatTextWithLineBreaks = (text) => {
    if (!text) return text;

    return text.split(".").map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 ? "." : ""}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  // 추천 메시지 저장 API 호출 함수
  const saveRecommendation = async () => {
    try {
      // localStorage에서 엑세스 토큰을 가져옵니다
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("엑세스 토큰이 없습니다.");
        return;
      }

      // API 요청을 위한 데이터
      const payload = {
        userNumber: userNumber, // 전달받은 userNumber를 사용
        title: aiResponse.title,
        content: aiResponse.content,
      };



      // API 요청
      const response = await axios.post(
        "http://localhost:8080/airecommend/save", 
        payload, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 엑세스 토큰을 Authorization 헤더에 추가
          },
        }
      );

      // 응답이 성공적일 경우
      if (response.status === 200) {
        alert(response.data); // 저장 성공 메시지 표시
        navigate("/mypage"); // /mypage로 페이지 이동
      }
    } catch (error) {
      console.error("추천 메시지 저장 실패:", error);
      alert("추천 메시지 저장에 실패했습니다.");
    }
  };

  return (
    <div className="ai-letter-result-container">
      <img
        src="../src/assets/images/Ai_Services/AiLetter.png"
        alt="AI Letter Result"
        className="result-image"
      />

      <div className="ai-letter-string">
        <h3 className="result-title">{aiResponse.title}</h3>
        <p className="result-content">{formatTextWithLineBreaks(aiResponse.content)}</p>
        {/* <p className="result-content">{aiResponse.content}</p> */}

        <h4 className="result-footer" style={{ textAlign: "right" }}>
          -보내는 이 :<br/>  
          오늘 당신의 고민에 조그마한 위안이 되기를 바라며 <br/>  
          언제나 당신을 응원하는 Team Healing Space 
        </h4>
      </div>

      {/* <div className="button-container">
        <button className="save-button" onClick={saveRecommendation}>
          저장하기
        </button>
      </div> */}
    </div>
  );
};

export default AiLetterResult;
