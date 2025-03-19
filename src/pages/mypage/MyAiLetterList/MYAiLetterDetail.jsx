import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams를 임포트
import axios from "axios";
import "../../../styles/mypage/MyAiLetterDetail/MyAiLetterDetail.css";

const MyAiLetterDetail = () => {
  const { AiRecommendMessageId } = useParams(); // useParams로 파라미터 받아오기
  const [aiResponseDetail, setAiResponseDetail] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (AiRecommendMessageId) {
      fetchAiRecommendDetail();
    }
  }, [AiRecommendMessageId]);

  const fetchAiRecommendDetail = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("엑세스 토큰이 없습니다.");
        return;
      }

      const response = await axios.get(
        `${apiBaseUrl}/airecommend/${AiRecommendMessageId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setAiResponseDetail(response.data);
    } catch (error) {
      console.error("추천 메시지 상세 조회 실패:", error);
    }
  };

  return (
    <div className="ai-recommend-detail-container">
      {aiResponseDetail ? (
        <>
          <h2 className="detail-title">{aiResponseDetail.title}</h2>
          <p className="detail-date" style={{textAlign : "right"}}>
            {new Date(aiResponseDetail.dateTime).toLocaleString()}
          </p>
          <p className="detail-content" style={{textAlign : "left"}}>{aiResponseDetail.content}</p>
          <h3 className="response-title">🌿 AI Letter for you 🌿</h3>
          <p className="response-content" style={{textAlign : "left"}}>{aiResponseDetail.response}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyAiLetterDetail;
