import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/mypage/MyChatBot/MyChatBotDetail.css";

const MyChatbotDetail = () => {
    const { chatId } = useParams();
    const [chatDetail, setChatDetail] = useState(null);
    const navigate = useNavigate();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchChatDetail = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(`${apiBaseUrl}/chatbot/list/${chatId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setChatDetail(response.data);
            } catch (error) {
                console.error("Failed to fetch chat detail", error);
                alert("채팅 상세 정보를 불러오는 데 실패했습니다.");
            }
        };

        fetchChatDetail();
    }, [chatId]);

    return (
        <div className="chatbot-detail">
            <h2>Chat Detail</h2>
            {chatDetail ? (
                <div className="chatbot-content">
                    <p className="chatbot-date">Date: {new Date(chatDetail.writtenDate).toLocaleString()}</p>
                    <div className="chatbot-letter">
                        <p>{chatDetail.letter}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button className="back-button" onClick={() => navigate(-1)}>뒤로 가기</button>
        </div>
    );
};

export default MyChatbotDetail;
