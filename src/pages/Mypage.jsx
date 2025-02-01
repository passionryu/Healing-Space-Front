import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import "../styles/Mypage.css";
import axios from 'axios';

const Mypage = () => {
    const [userInfo, setUserInfo] = useState({});
    const fileInputRef = useRef(null);  // 파일 입력 참조

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
                // alert("profileImage : " + userInfo.ProfileImagePath);
                // alert("nickname : " + userInfo.nickName);
                // alert("intro : " + userInfo.intro);
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
                const response = await axios.put('http://localhost:8080/mypage/profile/image', formData, {
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

    return (

    <>
        {/* 내 정보 카드 */}
        <div className="profile-card">
            <div className="profile-image">
                <img src="../src/assets/images/profile.jpg" alt="Profile" />
            </div>
             {/* <div className="profile-image" onClick={handleProfileImageClick}>
             <img src={userInfo.ProfileImagePath ? `http://localhost:8080/images/Profile/${userInfo.ProfileImagePath}` : "src/assets/images/profile.jpg"} alt="Profile" /> 
             
                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}  // 파일 입력 필드는 화면에 보이지 않도록 설정
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div> */}
            <div className="profile-text">
                <p className="profile-id">ID: {userInfo.nickName}</p>
                <p className="profile-intro">Name: {userInfo.username}</p>
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
            <Link to="/my-healing-music-list">
                <h3>내가 올린 힐링 뮤직 조회</h3>
            </Link>
        </div>

        <div className="mypage-option">
            <Link to="/my-liked-healing-music-list">
                <h3>내가 좋아요 누른 힐링 뮤직 조회</h3>
            </Link>
        </div>

        {/* <h2>AI Service</h2>
        <div className="mypage-option">
            <h3>내 AI Letter 조회</h3>
        </div>

        <div className="mypage-option">
            <h3>내 Today SnapShot 조회회</h3>
        </div> */}

        <h2> KaKao Service </h2>
        <div className="mypage-option">
            <h3>힐링 메시지 카카오톡 전송 서비스</h3>
        </div>
        

        <h2>Customer Service</h2>
        <div className="mypage-option">
            <h3>개발자에게 문의하기 </h3>
        </div>
        </div>
    </>
    );
};

export default Mypage;
