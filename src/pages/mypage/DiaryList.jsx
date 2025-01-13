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
                        <h3>{diary.title}</h3>
                        <p>{diary.weather}</p>
                        <p>{diary.date}</p>
                        {/* Link 컴포넌트를 사용하여 클릭 시 DiaryDetail 페이지로 이동 */}
                        <Link to={`/diary-detail/${diary.diaryNumber}`} key={diary.diaryNumber}>
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiaryList;
