import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HealingMessageList.css"; // 스타일링 파일
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 hook
import { Link } from "react-router-dom";

const HealingMessageList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위한 함수
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `${apiBaseUrl}/healingmessage/list`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,  // 쿠키 기반 인증을 위한 설정
                });
                setMessages(response.data); // API에서 받은 데이터를 상태로 설정
                setLoading(false);
            } catch (err) {
                setError("Failed to load messages. Please try again.");
                setLoading(false);
            }
        };
    
        fetchMessages(); // 컴포넌트 로드 시 API 호출
    }, []);
    

    if (loading) {
        return <p>Loading messages...</p>; // 로딩 중 표시
    }

    if (error) {
        return <p>{error}</p>; // 에러 발생 시 메시지
    }

    // 글 작성 페이지로 이동하는 함수
    const handleCreatePost = () => {
        navigate("/healing-message-create"); // "/healingmessage/create" 경로로 이동
    };

    return (
        <div className="healing-message-list">
            <div className="healing-message-header">
                {/* 로고 */}
                <div className="healing-message-logo">
                    <img src="../src/assets/images/healingmessagesharing.png" alt="Healing Messages Logo" />
                </div>

                {/* 글 작성하기 버튼 */}
                <button className="create-post-button" onClick={handleCreatePost}>
                    글 작성하기
                </button>
            </div>

            <ul>
                {messages.map((message) => (
                    <Link to={`/healing-message-detail/${message.messageId}`} key={message.messageId}>
                    <li className="message-item">
                        <h3 style={{ textAlign: 'left' }}>{message.title}</h3>
                        <p style={{ textAlign: 'left' }}>By: {message.nickname}</p>
                        <p style={{ textAlign: 'left' }}>Posted on: {new Date(message.createdDate).toLocaleString()}</p>
                    </li>
                    </Link>
                ))}
            </ul>

            <br />
            <p style={{ textAlign: "left" }}>Liked Count will be continue...</p> 
            <p style={{ textAlign: "left" }}>Sort by most likes will be continue...</p>   
            <p style={{ textAlign: "left" }}>Sort by most latest will be continue...</p>   
            <p style={{ textAlign: "left" }}>Sort by most oldest will be continue...</p>            

        </div>
    );
};

export default HealingMessageList;
