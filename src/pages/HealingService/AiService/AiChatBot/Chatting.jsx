import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../../styles/HealingService/AiService/ChatBot/Chatting.css";

const Chatting = () => {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 사용자 메시지 전송
    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        const accessToken = localStorage.getItem('accessToken');

        setMessages([...messages, { sender: 'user', text: userMessage }]);
        setLoading(true);
        setUserMessage('');

        try {
            const response = await axios.post('http://localhost:8080/chatbot', userMessage, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'chatbot', text: response.data },
            ]);
        } catch (error) {
            console.error('Error while chatting with AI:', error);
        } finally {
            setLoading(false);
        }
    };

    // 대화 종료 및 결과 조회
    const endChat = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await axios.post('http://localhost:8080/chatbot/result', {},{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            const letter = response.data;
            navigate('/chatting-result', { state: { letter } });

        } catch (error) {
            console.error('Error fetching chat result:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`} style={{ textAlign: "left" }}>
                        <span>{msg.text}</span>
                    </div>
                ))}
                {loading && (
                    <div className="message chatbot">
                        <span>AI 상담사가 응답 중...</span>
                    </div>
                )}
            </div>
            <div className="chatting-input-container">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                />
                <button onClick={sendMessage} disabled={loading}>
                    전송
                </button>
            </div>

            <div className="chatting-result-button">
                <button onClick={endChat} disabled={loading}>
                    대화 종료
                </button>
            </div>
        </div>
    );
};

export default Chatting;
