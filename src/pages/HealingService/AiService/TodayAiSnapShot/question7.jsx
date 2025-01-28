import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../../../styles/HealingService/AiService/TodayAiSnapShot/question.css";

const Question7 = () => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태 추가
  const navigate = useNavigate();

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 JWT 가져오기

      // 답변 제출 후 AI 연산 API 호출
      const response = await axios.post(
        'http://localhost:8080/aisnapshot', // 답변을 저장하는 API
        {
          questionNumber: 7, // 질문 번호
          answer: answer
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // JWT를 Authorization 헤더에 포함시켜 요청
          }
        }
      );

      console.log('답변이 성공적으로 제출되었습니다:', response.data);

      // 모든 질문을 제출한 후 AI 연산 API 호출
      const aiResponse = await axios.post(
        'http://localhost:8080/aisnapshot/report', // AI 연산 API
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('AI 응답:', aiResponse.data);
      // AI 응답을 저장하여 다음 페이지로 이동
      navigate('/ai-response', { state: { aiResponse: aiResponse.data } }); // AI 응답을 전달하면서 페이지 이동
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="question-container">
      <h2 style={{ textAlign: "left" }}>[ 7 / 7 ] 
        <br/>그렇군요 😌
        <br/>이제 마지막 질문입니다!😎
        <br/>마지막으로 내일 당신에게는 어떠한 하루가 펼쳐지면 좋을지 간단하게 기록해볼까요?</h2>
      <textarea
        value={answer}
        onChange={handleAnswerChange}
        placeholder="여기에 답변을 입력해주세요."
        className="answer-input"
      />
      <button 
        onClick={handleSubmit} 
        className="submit-btn" 
        disabled={isLoading}  // 로딩 중에는 버튼 비활성화
      >
        {isLoading ? ' AI가 당신의 답변을 읽고 있습니다. 잠시만 기다려주세요...' : '제출'}  {/* 로딩 중일 때 버튼 텍스트 변경 */}
      </button>
    </div>
  );
};

export default Question7;
