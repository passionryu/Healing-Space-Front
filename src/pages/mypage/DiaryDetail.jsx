import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // URL 파라미터를 가져오기 위한 useParams
import "../../styles/mypage/DiaryDetail.css"; // CSS 파일 추가

const DiaryDetail = () => {
    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { diaryNumber } = useParams();

    const weatherImages = {
        맑음: "../src/assets/images/weather_img/sunny.png", // 맑은 날씨 이미지 URL
        봄비: "../src/assets/images/weather_img/spring.png", // 봄비 이미지 URL
        노을: "../src/assets/images/weather_img/sunset.png", // 노을 이미지 URL
        구름: "../src/assets/images/weather_img/cloudy.png", // 구름 이미지 URL
        비: "../src/assets/images/weather_img/rain.png", // 비 이미지 URL
        천둥: "../src/assets/images/weather_img/thunder.png", // 천둥 이미지 URL
    };


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



            <div className="diary-content">
                <h1>당신이 기록한 일기 📓 </h1>

                <p style={{ textAlign: "left" }}><strong> 제목 : {diary.title}</strong></p>
                {/* <p><strong>Date: </strong>{diary.date}</p> */}
                <p style={{ textAlign: "right" }}><strong>Date: </strong>{diary.date}</p>

                <p style={{ textAlign: "left" }}><strong></strong>  {diary.diary}</p>
            </div>

            <div className="mypage-diary-result-card">
                <h1>당신에게 전하는 편지 ✉️ </h1>

                <div className="mypage-diary-result">

                    {/* <p style={{ textAlign: "left" }}> 우리 Healing Space팀의 AI서비스가 당신의 일기를 분석한 후, <br />
                        응원하는 마음과 격려하는 마음을 담아, 다음과 같이 당신에게 메시지를 전해드립니다.
                    </p> */}

                    <p style={{ textAlign: "left" }}>{diary.healingMessage}</p>

                    {/* <p style={{ textAlign: "left" }}>
                        우리 Healing Space의 AI감정 분류 서비스에 의하면, 현재 당신의 감정은 "{diary.emotion}"으로 분석이 됩니다. <br />

                        내일 당신은 어떤 날씨(감정)가운데 하루를 보내고 싶은가요?
                    </p>

                    <p style={{ textAlign: "left" }}>
                        당신이 일기를 작성하여 하루를 기록함과 동시에, <br />
                        당신의 오늘의 복잡한 생각과 감정을 명확히 정리할 수 있는 시간이였기를 바랍니다.
                    </p>

                    <p style={{ textAlign: "left" }}>
                        마지막으로 우리 Healing Space팀이 당신에게 추천해주는 음악은 다음과 같습니다.🎵 <br />
                        당신의 오늘의 감정과 어울리는 음악으로 준비해봤습니다.
                    </p> */}

                    <p style={{ textAlign: "left" }}>
                        AI가 분석한 이날 당신의 감정 : {diary.emotion}
                    </p>
                    <p style={{ textAlign: "left" }}>
                        이날 당신에게 어울렸던 음악 : <a href={diary.healingMusic} target="_blank" rel="noopener noreferrer">{diary.healingMusic}</a>
                    </p>

                    <h5 style={{ textAlign: "right" }} >
                        - 발신자 : <br />
                        항상 이 자리에서 기다리며<br />
                        당신을 응원하는 Team Healing Space
                    </h5>
                </div>
            </div>

        </div>
    );
};

export default DiaryDetail;
