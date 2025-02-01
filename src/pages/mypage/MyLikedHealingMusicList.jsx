import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/mypage/MyLikedHealingMusicList.css";

const MyLikedHealingMusicList = () => {
    const [musicList, setMusicList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLikedHealingMusic = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    "http://localhost:8080/healingmusic/like/list",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMusicList(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load liked healing music. Please try again.");
                setLoading(false);
            }
        };

        fetchLikedHealingMusic();
    }, []);

    if (loading) {
        return <p>Loading liked healing music...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="healing-music-list">
            <h2>My Liked Healing Music</h2>
            <div className="music-cards-container">
                {musicList.map((music) => (
                    <div key={music.musicId} className="music-card">
                        <Link to={`/liked-healing-music-detail/${music.musicId}`}>
                            <img
                                src={music.img || "../src/assets/images/default-music.jpg"}
                                alt={music.title}
                                className="music-image"
                            />
                            <h3 style={{ textAlign: 'left' }}>{music.title}</h3>
                            <p style={{ textAlign: 'left' }}>By: {music.nickName}</p>
                            <p style={{ textAlign: 'left' }}>
                                Posted on: {new Date(music.dateTime).toLocaleString()}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyLikedHealingMusicList;
