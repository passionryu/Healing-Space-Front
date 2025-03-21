import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/HealingMessageDetail.css";

const HealingMessageDetail = () => {
    const { messageId } = useParams();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `${apiBaseUrl}/healingmessage/${messageId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessage(response.data);
                setLikeCount(response.data.likes);
                setLoading(false);
            } catch (err) {
                setError("Failed to load the post. Please try again.");
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

        fetchMessage();
        fetchComments();
    }, [messageId]);

    const handleLike = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `${apiBaseUrl}/healingmessage/like/${messageId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLikeCount(response.data);
            window.location.reload(); 
        } catch (err) {
            setError("Failed to update the like count. Please try again.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `${apiBaseUrl}/healingmessage/comment`,
                {
                    messageId,
                    comment,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setComments((prev) => [...prev, response.data]);
            setComment("");
            window.location.reload(); // 페이지 새로 고침 -> 좋은 방법은 아님...
        } catch (err) {
            setError("Failed to post the comment. Please try again.");
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(
                `${apiBaseUrl}/healingmessage/comment/${commentId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setComments((prev) => prev.filter((cmt) => cmt.id !== commentId));
            window.location.reload(); // 페이지 새로 고침 -> 좋은 방법은 아님...
        } catch (err) {
            setError("Failed to delete the comment. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading post...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="healing-message-detail">
            <h1 style={{textAlign:"left"}}>{message.title}</h1>
            <div className="author-info">
                <img
                    src={"../../src/assets/images/profile.jpg"}
                    alt="profile"
                    className="profile-image"
                />
                <span className="nickname">{message.nickname}</span>
                <span className="created-date">
                    {new Date(message.createdDate).toLocaleString()}
                </span>
            </div>
            <p className="content" style={{textAlign:"left"}} >{message.content}</p>

            {/* 좋아요 버튼을 누르면 재시작되어 새 데이터가 반영되게 임시 조치 */}
            {/* 좋아요 조회 부분 */}
            <div className="like-section">
            <button className="like-button" onClick={handleLike}>
            ❤️ {message.like} 
            </button>
            </div>
            {/* 좋아요 조회 부분 */}

            <div className="healing-message-comment-section">
                {/* 댓글 작성 부분 */}
                <h3 style={{textAlign:"left"}}>Comments</h3>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <div style={{ textAlign: "right" }}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                {/* 댓글 작성 부분 */}

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
                            <button
                            type="button"
                            className="hover-button-comment"
                            onClick={() => handleDelete(cmt.commentId)} // 나중에 API 연결 시 사용할 함수
                            style={{
                                
                                backgroundColor: "white", // 흰색 배경
                                color: "black", // 검은색 텍스트
                                border: "1px solid black", // 검은색 1px 테두리
                                borderRadius: "5px",
                                padding: "5px 10px",
                                cursor: "pointer",
                                transition: "transform 0.3s ease-in-out", // 부드럽게 크기 변화
            
                              }}                             
                            >
                            Delete
                            </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* 댓글 부분 */}
            </div>
        </div>
    );
};

export default HealingMessageDetail;
