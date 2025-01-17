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

        // const fetchComments = async () => {
        //     try {
        //         const token = localStorage.getItem("accessToken");
        //         const response = await axios.get(
        //             `http://localhost:8080/ournews/comment/${ourNewsNumber}`,
        //             {
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: `Bearer ${token}`,
        //                 },
        //             }
        //         );
        //         setComments(response.data);
        //     } catch (err) {
        //         setError("Failed to load comments. Please try again.");
        //     }
        // };

        fetchNews();
        // fetchComments();
    }, [ourNewsNumber]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `http://localhost:8080/ournews/comment`,
                {
                    ourNewsNumber,
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
        } catch (err) {
            setError("Failed to post the comment. Please try again.");
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

            {/* 이미지가 있는 경우에만 렌더링 */}
             {news.img_path && (
                <img
                    src={news.img_path}
                    // src={news.img_path}
                    alt="post-image"
                    className="post-image"
                />
            )} 

         
            <p className="content">{news.content}</p>

            {/* 좋아요 관련 부분 삭제 */}

            <div className="comment-section">
                <h3 style={{ textAlign: 'left' }}>Comments</h3>
                <form onSubmit={handleCommentSubmit} style={{ textAlign: "right" }}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button type="submit" >Submit</button>
                </form>
                <ul>
                    {comments.map((cmt, index) => (
                        <li key={index}>
                            <div className="comment-info">
                                <img
                                    src={cmt.profile_img_path}
                                    alt="comment-profile"
                                    className="comment-profile-image"
                                />
                                <span className="nickname">{cmt.nickname}</span>
                                <span className="created-date">
                                    {new Date(cmt.createdDate).toLocaleString()}
                                </span>
                            </div>
                            <p className="comment-content">{cmt.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OurNewsDetail;
