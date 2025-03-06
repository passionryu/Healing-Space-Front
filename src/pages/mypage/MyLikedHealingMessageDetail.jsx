import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/mypage/MyLikedHealingMessageDetail.css";

const MyLikedHealingMessageDetail = () => {
    const { messageId } = useParams(); // URL에서 messageId를 가져옴
    const navigate = useNavigate();
    const [healingMessage, setHealingMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchHealingMessage = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `${apiBaseUrl}/healingmessage/like/${messageId}`,
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

        const fetchComments = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `${apiBaseUrl}/healingmessage/comment/${messageId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setComments(response.data);
            } catch (err) {
                setError("Failed to load comments. Please try again.");
            }
        };

        fetchHealingMessage();
        fetchComments();
    }, [messageId]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this message?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${apiBaseUrl}/healingmessage/like/${messageId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Message deleted successfully!");
            navigate("/my-like-message-list"); // 삭제 후 좋아요 목록으로 이동
        } catch (err) {
            alert("Failed to delete the message. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading healing message...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="my-liked-healing-message-detail">
            <div className="header">
                <div className="meta">
                    <h2>{healingMessage.title}</h2>
                    <div className="sub-data">
                        <img
                            src={healingMessage.profile_image_path || "../src/assets/images/profile.jpg"}
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
                {/* <img
                    className="post-image"
                    src={healingMessage.imagePath || ""}
                    alt="Post"
                /> */}
                <p>{healingMessage.content}</p>
            </div>
            <div className="footer">
                <p>❤️ {healingMessage.like} likes</p>
                {/* <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button> */}
            </div>

            {/* 댓글 부분 */}
            <ul>
                    {comments.map((cmt, index) => (
                        <li key={index}>
                            <div className="comment-info"
                            style={{ textAlign: "left", display: "flex", alignItems: "center", gap: "10px" }}>
                                <img
                                    src={"../../src/assets/images/profile.jpg"}
                                    alt="comment-profile"
                                    className="profile-image2"
                                />
                                <span className="nickname2">{cmt.nickname}</span>
                                <span className="created-date">
                                    {new Date(cmt.createdDate).toLocaleString()}
                                </span>
                            </div>

                            <div className="comment-content-container" >
                            <p style={{ textAlign: "left" }} >{cmt.content}</p>
                           
                            </div>
                        </li>
                    ))}
                </ul>
                {/* 댓글 부분 */}
            
            

        </div>
    );
};

export default MyLikedHealingMessageDetail;
