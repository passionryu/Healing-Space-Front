import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/mypage/MyHealingMessageList.css";

const MyHealingMessageList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealingMessages = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    "http://localhost:8080/healingmessage/list/my",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessages(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load healing messages. Please try again.");
                setLoading(false);
            }
        };

        fetchHealingMessages();
    }, []);

    if (loading) {
        return <p>Loading healing messages...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="healing-message-list">
            <h2>My Healing Messages</h2>
            <div className="message-cards-container">
                {messages.map((message) => (
                    <div key={message.messageId} className="message-card">
                        <Link to={`/my-healing-message-detail/${message.messageId}`}>
                            <h3 style={{ textAlign: 'left' }}>{message.title}</h3>
                            <p style={{ textAlign: 'left' }}>By: {message.nickname}</p>
                            <p style={{ textAlign: 'left' }}>Posted on: {new Date(message.createdDate).toLocaleString()}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHealingMessageList;
