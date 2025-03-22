import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../styles/HealingCommunity/HealingMusic/HealingMusicList.css"; // 스타일 파일 임포트
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HealingMusicList = () => {
    const [musicList, setMusicList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위한 hook
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(`${apiBaseUrl}/healingmusic/list`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setMusicList(response.data); // API에서 받은 데이터 설정
                setLoading(false);
            } catch (err) {
                setError("Failed to load music list. Please try again.");
                setLoading(false);
            }
        };

        fetchMusicList(); // API 호출
    }, []);

    if (loading) {
        return <p>Loading music list...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // 글 작성 페이지로 이동
    const handleCreateMusicPost = () => {
        navigate("/healing-music-create");
    };

    return (
        <div className="healing-music-list">
            <div className="healing-music-header">
               
                    <img src="../src/assets/images/healingmusicsharing.png" alt="Healing Music Logo" />
                

                {/* 음악 글 작성 버튼 */}
                <button className="create-music-button" onClick={handleCreateMusicPost}>
                    음악 등록하기
                </button>
            </div>

            <ul>
                {musicList.map((music) => (
                    <Link to={`/healing-music-detail/${music.musicId}`} key={music.musicId}>
                        <li className="music-item">
                            <img src={music.img} alt={music.title} className="music-thumbnail" />
                            <div className="music-info">
                                <h3 style={{textAlign : "left"}}>{music.title}</h3>
                                <p style={{textAlign : "left"}}>By: {music.nickName}</p>
                                <p>Posted on: {new Date(music.dateTime).toLocaleString()}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>

            {/* <br />
            <p>Liked Count will be continue...</p>
            <p>Sort by most likes will be continue...</p>
            <p>Sort by most latest will be continue...</p>
            <p>Sort by most oldest will be continue...</p> */}
        </div>
    );
};

export default HealingMusicList;
