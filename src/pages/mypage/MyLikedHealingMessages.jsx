import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/mypage/MyHealingMessageList.css";

const MyLikedHealingMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchLikedHealingMessages = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `${apiBaseUrl}/healingmessage/like/list`,
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
                setError("Failed to load liked healing messages. Please try again.");
                setLoading(false);
            }
        };

        fetchLikedHealingMessages();
    }, []);

    if (loading) {
        return <p>Loading liked messages...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="healing-message-list">
            <h2>My Liked Healing Messages</h2>
            <div className="message-cards-container">
                {messages.map((message) => (
                    <div key={message.messageId} className="message-card">
                        <Link to={`/liked-healing-message-detail/${message.messageId}`}>
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

export default MyLikedHealingMessages;
