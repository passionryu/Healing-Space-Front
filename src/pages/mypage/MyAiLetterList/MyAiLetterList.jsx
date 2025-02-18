import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // React Router Link import
import "../../../styles/mypage/MyAiLetterList/MyAiLetterList.css";

const MyAiLetterList = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchAiRecommendations();
  }, []);

  const fetchAiRecommendations = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("엑세스 토큰이 없습니다.");
        return;
      }

      const response = await axios.get("http://localhost:8080/airecommend/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // JWT 인증 추가
        },
        withCredentials: true, // 쿠키가 필요하면 추가
      });

      setRecommendations(response.data);
    } catch (error) {
      console.error("AI 추천 메시지 리스트 조회 실패:", error);
    }
  };

  return (
    <div className="ai-recommend-container">
      <h1 className="title">My AI Letter History</h1>

      {recommendations.length === 0 ? ( 
        <p className="empty-message">아직 저장된 추천 메시지가 없습니다.</p>
      ) : (
        <ul className="recommend-list">
          {recommendations.map((item, index) => (
            <li key={index} className="recommend-item">
              <Link to={`/my-ai-letter-detail/${item.AiRecommendMessageId}`} className="recommend-link">
                <p className="recommend-title">{item.title}</p>
                <p className="recommend-date">
                  {new Date(item.dateTime).toLocaleString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAiLetterList;
