import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/mypage/MyChatBot/MyChatBotList.css";

const MyChatbotList = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const navigate = useNavigate();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(`${apiBaseUrl}/chatbot/list`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setChatHistory(response.data);
            } catch (error) {
                console.error("Failed to fetch chatbot history", error);
                alert("챗봇 기록을 불러오는 데 실패했습니다.");
            }
        };

        fetchChatHistory();
    }, []);

    const handleChatClick = (chatId) => {
        navigate(`/chatbot/detail/${chatId}`);
    };

    return (
        <div className="my-chatbot-history">
            <h2>My AI ChatBot History</h2>
            {chatHistory.length > 0 ? (
                <ul className="chatbot-list">
                    {chatHistory.map((chat) => (
                        <li key={chat.chat_id} className="chatbot-item" onClick={() => handleChatClick(chat.chat_id)}>
                            <p>Chat ID: {chat.chat_id}</p>
                            <p className="chatbot-date">{new Date(chat.writtenDate).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-history">이용 기록이 없습니다.</p>
            )}
        </div>
    );
};

export default MyChatbotList;
