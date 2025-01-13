import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // URL 파라미터를 가져오기 위한 useParams
import "../../styles/mypage/DiaryDetail.css"; // CSS 파일 추가

const DiaryDetail = () => {
    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { diaryNumber } = useParams(); 

    useEffect(() => {
        const fetchDiaryDetail = async () => {
            try {
            
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `http://localhost:8080/mypage/diary/show/${diaryNumber}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                
                setDiary(response.data); // 상세 일기 데이터 저장
                setLoading(false);
            } catch (err) {
                setError("Failed to load the diary details. Please try again.");
                setLoading(false);
            }
        };

        fetchDiaryDetail();
    }, [diaryNumber]); // date 변경 시마다 새로운 일기 데이터를 로드

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="diary-detail">
            <h1>{diary.title}</h1>
            <p><strong>Date: </strong>{diary.date}</p>
            <p><strong>Emotion: </strong>{diary.emotion}</p>
            <p><strong>Healing Message: </strong>{diary.healingMessage}</p>
            <p><strong>Healing Music: </strong>{diary.healingMusic}</p>
            <div className="diary-content">
                <p><strong>Diary Content: </strong>{diary.diary}</p>
            </div>
        </div>
    );
};

export default DiaryDetail;
