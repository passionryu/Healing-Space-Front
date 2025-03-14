import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Mypage.css";
import axios from 'axios';

const Mypage = () => {
    const [userInfo, setUserInfo] = useState({});
    const fileInputRef = useRef(null);  // 파일 입력 참조
    const navigate = useNavigate();  // 페이지 이동을 위한 hook 추가
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(`${apiBaseUrl}/mypage/myinfo`, {
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

    const handleProfileImageClick = () => {
        fileInputRef.current.click();  // 파일 선택 창 열기
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.put(`${apiBaseUrl}/mypage/profile/image`, formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                });

                alert("Profile image updated successfully!");
                console.log(response.data);
                // 서버 응답에 따라 프로필 이미지 경로를 업데이트 할 수 있습니다.
            } catch (error) {
                alert("Failed to update profile image");
                console.error("Error updating profile image:", error);
            }
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            await axios.post(`${apiBaseUrl}/auth/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            // 로그아웃 후 로컬 스토리지 정리
            localStorage.removeItem("accessToken");

            alert("로그아웃 되었습니다.");
            navigate("/login"); // 로그인 페이지로 이동
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃 중 문제가 발생했습니다.");
        }
    };

    return (

        <div className="mypage-container">
            {/* 내 정보 카드 */}
            <Link to="/myinfo">
                <div className="profile-card">

                    <div className="profile-image">
                        <img src="../src/assets/images/profile.jpg" alt="Profile" />
                    </div>

                    <div className="profile-text">
                        <p className="profile-id">ID: {userInfo.nickName}</p>
                        <p className="profile-intro">Name: {userInfo.username}</p>
                    </div>
                </div>
            </Link>
            {/* 내 정보 카드 */}

            {/* 마이페이지 옵션 */}
            <div className="mypage">
                <h2>My AI Services History</h2>
                <div className="mypage-ai">

                    <div className="mypage-button">
                        <Link to="/diary-list">
                            <button>My AI Diary History</button>
                        </Link>
                    </div>

                    <div className="mypage-button">
                        <Link to="/my-ai-letter-history">
                            <button>My AI Letter History</button>
                        </Link>
                    </div>

                    <div className="mypage-button">
                        <Link to="/chatting-list">
                            <button>My AI ChatBot History </button>
                        </Link>
                    </div>
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
                    <Link to="/my-healing-music-list">
                        <h3>내가 올린 힐링 뮤직 조회</h3>
                    </Link>
                </div>

                <div className="mypage-option">
                    <Link to="/my-liked-healing-music-list">
                        <h3>내가 좋아요 누른 힐링 뮤직 조회</h3>
                    </Link>
                </div>

                <div className="profile-logout">
                    
                    {/* 로그아웃 버튼 */}
                    <div className="button-box logout">
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Mypage;
