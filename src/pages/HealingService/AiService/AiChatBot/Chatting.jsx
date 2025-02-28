import React, { useState } from 'react';
import axios from 'axios';
import "../../../../styles/HealingService/AiService/ChatBot/Chatting.css"

const Chatting = () => {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // 사용자 메시지 전송 함수
    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        // 로컬 스토리지에서 액세스 토큰 가져오기
        const accessToken = localStorage.getItem('accessToken');

        // 유저 메시지 추가
        setMessages([...messages, { sender: 'user', text: userMessage }]);
        setLoading(true);
        setUserMessage('');

        try {
            // API 호출하여 AI의 응답 받기
            const response = await axios.post('http://localhost:8080/chatbot', userMessage, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // 액세스 토큰 추가
                },
            });

            // AI 응답을 메시지 목록에 추가
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

    return (
        <div className="chat-container">
            <div className="chat-box">
                {/* 메시지 출력 */}
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`} style={{textAlign : "left"}} >
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
                {/* 사용자 메시지 입력 */}
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                />
                {/* 전송 버튼 */}
                <button onClick={sendMessage} disabled={loading}>
                    전송
                </button>
            </div>

            <div className="chatting-result-button">
            <button disabled={loading}>
                    대화 종료
                </button>

            </div>
        </div>
    );
};

export default Chatting;
