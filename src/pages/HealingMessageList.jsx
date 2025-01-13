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

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:8080/healingmessage/list", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
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
                        <h3>{message.title}</h3>
                        <p>By: {message.nickname}</p>
                        <p>Posted on: {new Date(message.createdDate).toLocaleString()}</p>
                    </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default HealingMessageList;
