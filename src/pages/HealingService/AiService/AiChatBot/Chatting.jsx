import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../../styles/HealingService/AiService/ChatBot/Chatting.css";

const Chatting = () => {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    // 사용자 메시지 전송
    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        const accessToken = localStorage.getItem('accessToken');

        setMessages([...messages, { sender: 'user', text: userMessage }]);
        setLoading(true);
        setUserMessage('');

        try {
            const response = await axios.post(`${apiBaseUrl}/chatbot`, userMessage, {
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
            const response = await axios.post(`${apiBaseUrl}/chatbot/result`, {}, {
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
        <div className='chatting-page'>

            {/* 좌측 메타 데이터 (텍스트 + 이미지) */}
            <div className='meta-data'>
                <div className='meta-content'>
                    {/* <img src='../src/assets/images/aichatbot.png' alt='Chatbot' className='meta-image' /> */}
                    <h2 style={{textAlign : "left"}}>Hello there! </h2>
                    <p style={{textAlign : "left"}}>Healing Space AI 상담사가 여러분과 함께합니다.</p>
                    <p style={{textAlign : "left"}}>Healing Space AI는... </p>
                    <p style={{textAlign : "left"}}>1. 언제나, 어디서나 이곳에 있습니다. 당신의 마음이 어려울때, 언제나 어디서나 저를 찾아주세요.😊</p>
                    <p style={{textAlign : "left"}}>2. 철저히 비밀을 보장합니다. <br/>  당신의 대화 내역은 상담이 마무리 된 후 데이터베이스에 저장되지 않고 즉시 삭제됩니다.🚮</p>
                    <p style={{textAlign : "left"}}>3. 마지막으로, Healing Space AI는 언제나 당신의 편입니다.</p>

                </div>
            </div>

            {/* 우측 채팅 박스 */}
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

        </div>
    );
};

export default Chatting;
