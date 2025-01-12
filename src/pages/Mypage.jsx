import React, { useState, useEffect } from "react";
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
        <div className="profile-card">
            <div className="profile-image">
                <img src="../src/assets/images/profile.jpg" alt="Profile" />
            </div>
            <div className="profile-text">
                <p className="profile-id">ID: {userInfo.nickName}</p>
                <p className="profile-intro">Intro: {userInfo.intro}</p>
            </div>
        </div>
    );
};

export default Mypage;
