import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../../../styles/HealingService/AiService/ChatBot/ChattingResult.css";
const ChattingResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const letter = location.state?.letter || "결과가 없습니다.";
    //const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    // 오늘 날짜 가져오기 (한국 기준)
    const today = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="chatting-result-container">
            <h2> {today} 편지 </h2>  {/* 오늘 날짜 표시 */}
            <div className="chatting-result-box">
                {letter.split(".").map((sentence, index) =>
                    sentence.trim() && <p key={index}>{sentence}.</p>
                )}
            </div>
            <button className="back-button" onClick={() => navigate('/')}>
                메인으로 돌아가기
            </button>
        </div>
    );
};

export default ChattingResult;
