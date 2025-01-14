import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/mypage/MyHealingMessageDetail.css";

const HealingMessageDetail = () => {
    const { messageId } = useParams(); // URL에서 messageId를 가져옴
    const navigate = useNavigate();
    const [healingMessage, setHealingMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealingMessage = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `http://localhost:8080/healingmessage/my/${messageId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setHealingMessage(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load the healing message. Please try again.");
                setLoading(false);
            }
        };

        fetchHealingMessage();
    }, [messageId]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this message?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`http://localhost:8080/healingmessage/${messageId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Message deleted successfully!");
            navigate("/my-healing-message-list"); // 삭제 후 마이페이지로 이동
        } catch (err) {
            alert("Failed to delete the message. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading message details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="healing-message-detail">
            <div className="header">
                <div className="meta">
                    <h2>{healingMessage.title}</h2>
                    <div className="sub-data">
                        <img
                            src={"../src/assets/images/profile.jpg"}
                            alt="Profile"
                            className="profile-image"
                        />
                        <p>
                            {healingMessage.nickname} on{" "}
                            {new Date(healingMessage.createdDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="content">
                <p>{healingMessage.content}</p>
            </div>
            <div className="footer">
                <p>❤️ {healingMessage.like} likes</p>
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
            </div>

           
          
        </div>
    );
};

export default HealingMessageDetail;
