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

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `http://localhost:8080/healingmusic/${musicId}`,
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

        fetchMusic();
    }, [musicId]);

    const handleLike = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `http://localhost:8080/healingmusic/like/${musicId}`,
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
                <img src={ "../src/assets/images/profile.jpg"} alt="profile" className="profile-image" />
                <span className="nickname">{music.nickName}</span>
                <span className="created-date">{new Date(music.dateTime).toLocaleString()}</span>
            </div>

            {music.image && <img src={music.image} alt="music" className="music-image" />}

            <p className="content">{music.content}</p>
            <p>
                <strong>Healing Music</strong> :
                <a
                    href={music.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#917f27", fontWeight: "bold" }}
                >
                    여기를 클릭하시오
                </a>
            </p>

            <div className="like-section">
                <button className="like-button" onClick={handleLike}>
                    ❤️ {likeCount}
                </button>
            </div>
        </div>
    );
};

export default HealingMusicDetail;
