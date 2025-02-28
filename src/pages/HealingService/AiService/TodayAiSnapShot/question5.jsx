import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../../../styles/HealingService/AiService/TodayAiSnapShot/question.css"

const Question5 = () => {
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 JWT 가져오기
      const response = await axios.post(
        'http://localhost:8080/aisnapshot',
        {
          questionNumber: 5, // 질문 번호
          answer: answer
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // JWT를 Authorization 헤더에 포함시켜 요청
          }
        }
      );
      console.log(response.data);
      navigate('/question6'); // 답변 제출 후 question6 페이지로 이동
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="question-container">
      <h2 style={{textAlign: "left"}}>[ 5 / 7 ]
      <br/>오늘 하루 다사다난한 일이 있었네요 !
      <br/>오늘 하루도 고생한 나 자신에게 해주고 싶은 말이 있다면? 🤔</h2>
      <textarea
        value={answer}
        onChange={handleAnswerChange}
        placeholder="여기에 답변을 입력해주세요."
        className="answer-input"
      />
      <button onClick={handleSubmit} className="submit-btn">
        제출
      </button>
    </div>
  );
};

export default Question5;
