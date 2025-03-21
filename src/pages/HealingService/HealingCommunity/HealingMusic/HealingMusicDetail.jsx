import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../../../styles/HealingCommunity/HealingMusic/HealingMusicDetail.css";

const HealingMusicDetail = () => {
    const { musicId } = useParams();
    const [music, setMusic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `${apiBaseUrl}/healingmusic/${musicId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMusic(response.data);
                setLikeCount(response.data.likes);
                setLoading(false);
            } catch (err) {
                setError("Failed to load the music details. Please try again.");
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `${apiBaseUrl}/healingmusic/comment/${musicId}`,
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

        fetchMusic();
        fetchComments();
    }, [musicId]);

    const handleLike = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `${apiBaseUrl}/healingmusic/like/${musicId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLikeCount(response.data);
        } catch (err) {
            setError("Failed to update the like count. Please try again.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");

            // DTO에 맞게 postCommentRequest를 준비
            const postCommentRequest = {
                musicId: musicId, // musicId
                content: comment,  // content
            };

            const response = await axios.post(
                `${apiBaseUrl}/healingmusic/comment`,
                postCommentRequest,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setComments((prev) => [...prev, response.data]);  // 서버에서 반환된 댓글을 추가
            setComment("");  // 댓글 입력란 초기화
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
                `${apiBaseUrl}/healingmusic/comment/${commentId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setComments((prev) => prev.filter((cmt) => cmt.commentId !== commentId));
        } catch (err) {
            setError("Failed to delete the comment. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading music details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="healing-music-detail">
            <h1>{music.title}</h1>
            <div className="author-info">
                <img src={"../src/assets/images/profile.jpg"} alt="profile" className="profile-image" />
                <span className="nickname">{music.nickName}</span>
                <span className="created-date">{new Date(music.dateTime).toLocaleString()}</span>
            </div>

            {/* {music.image && <img src={music.image} alt="music" className="healing-music-image" />} */}
            <p className="content" style={{textAlign : "left"}}>{music.content}</p>
            <p style={{textAlign : "left"}}>
                <strong>Music Link</strong> :
                <a
                    href={music.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#917f27", fontWeight: "bold" }}
                >
                    {music.videoLink}
                </a>
            </p>

            <div className="like-section">
                <button className="like-button" onClick={handleLike}>
                    ❤️ {likeCount}
                </button>
            </div>

            {/* 댓글 섹션 */}
            <div className="healing-music-comment-section">
                <h3 style={{ textAlign: "left" }}>Comments</h3>
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

                <ul>
                    {comments.map((cmt, index) => (
                        <li key={index}>
                            <div className="comment-info" style={{ textAlign: "left", display: "flex", alignItems: "center", gap: "10px" }}>
                                <img src={"../src/assets/images/profile.jpg"} alt="comment-profile" className="profile-image2" />
                                <span className="nickname2">{cmt.nickName}</span>
                                <span className="created-date">{new Date(cmt.dateTime).toLocaleString()}</span>
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

export default HealingMusicDetail;
