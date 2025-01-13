import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams로 URL 파라미터 받기
import "../styles/HealingMessageDetail.css"; // 스타일 파일

const HealingMessageDetail = () => {
    const { messageId } = useParams(); // URL에서 messageId 추출
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `http://localhost:8080/healingmessage/${messageId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessage(response.data);
                setLikeCount(response.data.likeCount); // 초기 좋아요 수 설정
                setLoading(false);
            } catch (err) {
                setError("Failed to load the post. Please try again.");
                setLoading(false);
            }
        };

        fetchMessage();
    }, [messageId]);

    const handleLike = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `http://localhost:8080/healingmessage/like/${messageId}`,
                {}, // 필요한 데이터가 있다면 여기 추가
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLikeCount(response.data); // 응답받은 좋아요 수로 업데이트
        } catch (err) {
            setError("Failed to update the like count. Please try again.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setComments((prev) => [...prev, comment]);
        setComment("");
        // API로 댓글 추가 로직 추가 가능
    };

    if (loading) {
        return <p>Loading post...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="healing-message-detail">
            <h1>{message.title}</h1>
            <div className="author-info">
                <img
                    src="../src/assets/images/profile.jpg"
                    alt="profile_image"
                    className="profile-image"
                />
                <span className="nickname">{message.nickname}</span>
                <span className="created-date">
                    {new Date(message.createdDate).toLocaleString()}
                </span>
            </div>
            <p className="content">{message.content}</p>

            <div className="like-section">
                <button className="like-button" onClick={handleLike}>
                    ❤️ {likeCount} 
                </button>
            </div>

            <div className="comment-section">
                <h3>Comments</h3>
                <ul>
                    {comments.map((cmt, index) => (
                        <li key={index}>{cmt}</li>
                    ))}
                </ul>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default HealingMessageDetail;
