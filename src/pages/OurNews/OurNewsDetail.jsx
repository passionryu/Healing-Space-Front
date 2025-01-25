import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/OurNews/OurNewsDetail.css";

const OurNewsDetail = () => {
    const { ourNewsNumber } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `http://localhost:8080/ournews/${ourNewsNumber}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setNews(response.data);
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
                    `http://localhost:8080/ournews/comment/${ourNewsNumber}`,
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

        fetchNews();
        fetchComments();
    }, [ourNewsNumber]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `http://localhost:8080/ournews/comment`,
                {
                    ourNewsNumber,
                    content: comment,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.reload(); // 페이지 새로 고침 -> 좋은 방법은 아님...
            setComments((prev) => [...prev, response.data]);
            setComment("");
            
        } catch (err) {
            setError("Failed to post the comment. Please try again.");
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(
                `http://localhost:8080/ournews/comment/${commentId}`,
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
        <div className="our-news-detail">
            <h1 style={{ textAlign: 'left' }}>{news.title}</h1>
            <div className="author-info">
                <img
                    src={"../../src/assets/images/profile.jpg"}
                    alt="profile"
                    className="profile-image"
                />
                <span className="nickname">{news.nickname}</span>
                <span className="created-date">
                    {new Date(news.createdDate).toLocaleString()}
                </span>
            </div>

            {news.img_path && (
                <img
                    src={`http://localhost:8080/images/OurNews/${news.img_path}`}
                    alt="post-image"
                    className="post-image"
                />
            )}

            <p className="content">{news.content}</p>

            <div className="comment-section">
                <h3 style={{ textAlign: 'left' }}>Comments</h3>
                <form onSubmit={handleCommentSubmit} style={{ textAlign: "right" }}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button type="submit">Submit</button>
                </form>

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

                            <div className="comment-content-container">
                                <p style={{ textAlign: "left" }}>{cmt.content}</p>
                                <button
                                    type="button"
                                    className="hover-button-comment"
                                    onClick={() => handleDelete(cmt.commentId)}
                                    style={{
                                        backgroundColor: "white",
                                        color: "black",
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                        transition: "transform 0.3s ease-in-out",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OurNewsDetail;
