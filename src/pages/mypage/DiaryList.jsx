import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import "../../styles/mypage/DiaryList.css";

const DiaryList = () => {
    const [diaries, setDiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDiaryList = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    "http://localhost:8080/mypage/diary/show/list",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setDiaries(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load the diary list. Please try again.");
                setLoading(false);
            }
        };

        fetchDiaryList();
    }, []);

    const weatherImages = {
        맑음: "../src/assets/images/weather_img/sunny.png", // 맑은 날씨 이미지 URL
        봄비: "../src/assets/images/weather_img/spring.png", // 봄비 이미지 URL
        노을: "../src/assets/images/weather_img/sunset.png", // 노을 이미지 URL
        구름: "../src/assets/images/weather_img/cloudy.png", // 구름 이미지 URL
        비: "../src/assets/images/weather_img/rain.png", // 비 이미지 URL
        천둥: "../src/assets/images/weather_img/thunder.png", // 천둥 이미지 URL
    };

    if (loading) {
        return <p>Loading diaries...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="diary-list">
            <h2>My Diaries</h2>
            <div className="diary-cards-container">
                {diaries.map((diary) => (
                    <div key={diary.diaryNumber} className="diary-card">
                        <Link to={`/diary-detail/${diary.diaryNumber}`} key={diary.diaryNumber}>
                            {/* 날씨에 맞는 이미지 출력 */}
                            <div className="mypage-weather-image-container">
                                <img
                                    src={weatherImages[diary.weather] || "path/to/default-image.jpg"} // 기본 이미지 설정
                                    alt={diary.weather}
                                    className="weather-image"
                                />
                            </div>
                            <h3>{diary.title}</h3>
                            <p>Written at: {diary.date}</p>
                        </Link>
                    </div>
                ))}
            </div>

            <br />
            <p style={{ textAlign: "left" }}>Calendar View will be continue...</p>
            <p style={{ textAlign: "left" }}>Monthly Emotion Statistics & Weekly Emotion Statistics Chart will be continue...</p>
            

        </div>
        
    );
};

export default DiaryList;
