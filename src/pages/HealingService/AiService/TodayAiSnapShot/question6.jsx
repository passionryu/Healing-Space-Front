import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../../../styles/HealingService/AiService/TodayAiSnapShot/question.css"

const Question6 = () => {
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
          questionNumber: 6, // 질문 번호
          answer: answer
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // JWT를 Authorization 헤더에 포함시켜 요청
          }
        }
      );
      console.log(response.data);
      navigate('/question7'); // 답변 제출 후 question7 페이지로 이동
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="question-container">
      <h2 style={{textAlign: "left"}}>[ 6 / 7 ] 
        <br/>언제나 당신의 편이며,
        <br/>당신의 마음을 온전히 이해해주고, 공감해주는 좋은 친구가 있다고 가정정해봅시다.
        <br/>당신은 그 친구에게 어떠한 말을 듣고 싶나요?
</h2>
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

export default Question6;
