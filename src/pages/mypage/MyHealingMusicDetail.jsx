import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/HealingCommunity/HealingMusic/MyHealingMusicDetail.css";

const MyHealingMusicDetail = () => {
    const { musicId } = useParams();
    const navigate = useNavigate();
    const [healingMusic, setHealingMusic] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchHealingMusic = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `${apiBaseUrl}/healingmusic/my/${musicId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setHealingMusic(response.data);
            } catch (err) {
                setError("Failed to load the healing music. Please try again.");
            } finally {
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
                console.error("Failed to load comments:", err);
            }
        };

        fetchHealingMusic();
        fetchComments();
    }, [musicId]);

    if (loading) {
        return <p>Loading music details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="my-healing-music-detail">
            <div className="header">
                <div className="meta">
                    <h2>{healingMusic.title}</h2>
                    <div className="sub-data">
                        <img
                            src={"../src/assets/images/profile.jpg"}
                            alt="Profile"
                            className="profile-image"
                        />
                        <p>
                            {healingMusic.nickName} on{" "}
                            {new Date(healingMusic.dateTime).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {healingMusic.image && <img src={healingMusic.image} alt="music" className="my-music-image" />}
            <p className="content">{healingMusic.content}</p>
            <p>
                <strong>Healing Music</strong> :
                <a
                    href={healingMusic.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#917f27", fontWeight: "bold" }}
                >
                    여기를 클릭하시오
                </a>
            </p>

            {/* 좋아요 조회 부분 */}
            <div className="footer">
                <p>❤️ {healingMusic.likes} </p>
            </div>
            {/* 좋아요 조회 부분 */}

            {/* 댓글 리스트 */}
            <div className="comments-section">
                <h3>댓글</h3>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.commentId} className="comment">
                            <img
                                src={"../src/assets/images/profile.jpg"}
                                alt="Profile"
                                className="comment-profile"
                            />
                            <div className="comment-content">
                                <p className="comment-author" style={{textAlign : "left"}}>{comment.nickName}</p>
                                <p className="comment-date" style={{textAlign : "left"}}>
                                    {new Date(comment.dateTime).toLocaleDateString()}
                                </p>
                                <p className="comment-text" style={{textAlign : "left"}}>{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">댓글이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MyHealingMusicDetail;
