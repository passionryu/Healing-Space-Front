import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/mypage/MyInfo.css"

const MyInfoPage = () => {
    // 상태 변수 정의
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    // 내 모든 정보 조회 API 호출
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // 로컬 스토리지에서 JWT 토큰 가져오기
                const token = localStorage.getItem("accessToken");

                // API 호출
                const response = await axios.get(`${apiBaseUrl}/mypage/myinfo/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                // 성공적으로 데이터를 가져온 경우
                setUserInfo(response.data);
            } catch (err) {
                // 에러 처리
                setError("정보를 불러오는 데 실패했습니다.");
                console.error("API 호출 실패", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    // 회원 탈퇴 처리
    const handleAccountDeletion = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.post(
                `${apiBaseUrl}/auth/delete`, 
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // 탈퇴 성공 시 처리
            alert(response.data); // "Member Delete Success" 메시지를 띄움
            localStorage.removeItem("accessToken"); // 토큰 삭제
            window.location.href = "/login"; // 로그인 페이지로 이동
        } catch (err) {
            // 에러 처리
            alert("회원 탈퇴 실패. 다시 시도해주세요.");
            console.error("탈퇴 API 호출 실패", err);
        }
    };

    // 로딩 중일 때 처리
    if (loading) {
        return <div>Loading...</div>;
    }

    // 에러가 발생한 경우 처리
    if (error) {
        return <div>{error}</div>;
    }

    // 사용자 정보 렌더링
    return (
        <div className="my-info-container">
            <div className="my-info-detail">
               
                    <img
                        src={"../src/assets/images/profile.jpg"}
                        alt="Profile"
                        className="profile-image"
                    />
               

                <div className="user-details">
                    <p><strong>ID:</strong> {userInfo.Id}</p>
                    <p><strong>이름:</strong> {userInfo.name}</p>
                    <p><strong>전화번호:</strong> {userInfo.phoneNumber}</p>
                    <p><strong>생년월일:</strong> {userInfo.birth}</p>
                    <p><strong>이메일:</strong> {userInfo.email}</p>
                    <p><strong>가입일:</strong> {new Date(userInfo.registerDate).toLocaleString()}</p>
                </div>
            </div>

            <div className="account-delete">
                <h3 style={{textAlign: "left"}}>Danger Zone</h3>
                <p style={{textAlign: "left"}}>**Please be cautious.** 
                    <br/>If you click the account deletion button below, your account will no longer be recoverable. 
                </p>

                <button onClick={handleAccountDeletion}>Account Deletion</button>
            </div>
        </div>
    );
};

export default MyInfoPage;
