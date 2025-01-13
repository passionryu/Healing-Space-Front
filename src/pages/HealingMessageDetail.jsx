import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams로 URL 파라미터 받기
import "../styles/HealingMessageDetail.css"; // 스타일 파일

const HealingMessageDetail = ({ match }) => {
    const {messageId} = useParams(); // URL에서 messageId 추출
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    //const messageId = match.params.messageId;

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(`http://localhost:8080/healingmessage/${messageId}`,{
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  
                setMessage(response.data);
                setLoading(false);
                // 좋아요 수와 댓글은 API 통신을 통해 가져오는 부분
                // setLikeCount(response.data.like);
                // setComments(response.data.comments || []);
            } catch (err) {
                setError("Failed to load the post. Please try again.");
                setLoading(false);
            }
        };

        fetchMessage();
    }, [messageId]);

    const handleLike = () => {
        setLikeCount((prev) => prev + 1);
        // API로 좋아요 수 업데이트 로직 추가 가능
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
            <img src="../src/assets/images/profile.jpg" alt="profile_image_pathr" className="profile-image" />
                {/* <img src={message.profile_image_path} alt="profile_image_pathr" className="profile-image" /> */}
                <span className="nickname">{message.nickname}</span>
                <span className="created-date">{new Date(message.createdDate).toLocaleString()}</span>
            </div>
            {/* <img src={message.imagePath} alt="Post" className="post-image" /> */}
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
