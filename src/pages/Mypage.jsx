import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "../styles/Mypage.css";
import axios from 'axios';

const Mypage = () => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get('http://localhost:8080/mypage/myinfo', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setUserInfo(response.data);
            } catch (error) {
                alert("Failed to load your myinfo");
                console.error("Failed to fetch user info", error);
            }
        };

        fetchData();
    }, []);

    return (

    <>
        {/* 내 정보 카드 */}
        <div className="profile-card">
            <div className="profile-image">
                <img src="../src/assets/images/profile.jpg" alt="Profile" />
            </div>
            <div className="profile-text">
                <p className="profile-id">ID: {userInfo.nickName}</p>
                <p className="profile-intro">Intro: {userInfo.intro}</p>
            </div>
        </div>

        {/* 마이페이지 옵션 */}
        <div className="mypage">
        <h2>Diary</h2>
        <div className="mypage-option">
            <Link to="/diary-list">
                <h3>내 일기장 조회</h3>
            </Link>
        </div>

        <h2>Healing Message</h2>
        <div className="mypage-option">
            <Link to="/my-healing-message-list">
            <h3>내가 올린 힐링 메시지 조회</h3>
            </Link>
        </div>

        <div className="mypage-option">
            <Link to="/liked-healing-message-list">
                <h3>내가 좋아요 누른 힐링 메시지 조회</h3>
            </Link>
        </div>

        <h2>Healing Music</h2>
        <div className="mypage-option">
            <h3>내가 올린 힐링 뮤직 조회</h3>
        </div>

        <div className="mypage-option">
            <h3>내가 좋아요 누른 힐링 뮤직 조회</h3>
        </div>

        {/* <h2>Healing Tour</h2>
        <div className="mypage-option">
            <h3>내가 올린 힐링 투어 조회</h3>
        </div>

        <div className="mypage-option">
            <h3>내가 좋아요 누른 힐링 투어 조회</h3>
        </div> */}

        <h2> SMS Service </h2>
        <div className="mypage-option">
            <h3>SMS 힐링 문자 메시지 전송 서비스</h3>
        </div>
        

        <h2>Customer Service</h2>
        <div className="mypage-option">
            <h3>관리자에게 문의하기 </h3>
        </div>
        </div>
    </>
    );
};

export default Mypage;
