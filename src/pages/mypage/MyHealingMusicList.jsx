import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/mypage/MyHealingMusicList.css";

const MyHealingMusicList = () => {
    const [musicList, setMusicList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchMyHealingMusic = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                const response = await axios.get(
                    `${apiBaseUrl}/healingmusic/list/my`,
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
                setError("Failed to load healing music. Please try again.");
                setLoading(false);
            }
        };

        fetchMyHealingMusic();
    }, []);

    if (loading) {
        return <p>Loading healing music...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="healing-music-list">
            <h2>My Healing Music</h2>
            <div className="music-cards-container">
                {musicList.map((music) => (
                    <div key={music.musicId} className="my-music-card">
                        <Link to={`/my-healing-music-detail/${music.musicId}`}>
                            {music.img && <img src={music.img} alt={music.title} className="music-image" />}
                            <h3>{music.title}</h3>
                            <p>By: {music.nickName}</p>
                            <p>Posted on: {new Date(music.dateTime).toLocaleString()}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHealingMusicList;
