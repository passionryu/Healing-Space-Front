import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/OurNews/OurNewsList.css"; // 스타일링 파일
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 hook
import { Link ,} from "react-router-dom"; // Link 컴포넌트 import


const OurNewsList = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate 훅 호출
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchNewsList = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                
                const response = await axios.get(`${apiBaseUrl}/ournews/list`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setNewsList(response.data); // API에서 받은 데이터를 상태로 설정
                setLoading(false);
            } catch (err) {
                setError("Failed to load news list. Please try again.");
                setLoading(false);
            }
        };

        fetchNewsList(); // 컴포넌트 로드 시 API 호출
    }, []);

    if (loading) {
        return <p>Loading news...</p>; // 로딩 중 표시
    }

    if (error) {
        return <p>{error}</p>; // 에러 발생 시 메시지
    }

    // 글 작성 페이지로 이동하는 함수
    const handleCreatePost = () => {
        navigate("/ournews-create"); //
    };

    return (
        <div className="news-list-container">

            <div className="our-news-header">
                {/* 로고 */}
                <div className="healing-message-logo">
                    <img src="../src/assets/images/ournews.png" alt="Healing Messages Logo" />
                </div>

                {/* 글 작성하기 버튼 */}
                {/* <button className="create-post-button" onClick={handleCreatePost}>
                    글 작성하기
                </button> */}
            </div>
             
            <ul>
                {newsList.map((news) => (
                    <Link to={`/ournews/detail/${news.ourNewsNumber}`} key={news.ourNewsNumber}>
                        <li className="news-item">
                            <h3 style={{ textAlign: 'left' }}>{news.title}</h3>
                            <p style={{ textAlign: 'left' }}>By: {news.nickName}</p>
                            <p style={{ textAlign: 'left' }}>Posted on: {new Date(news.createdDate).toLocaleString()}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default OurNewsList;
