import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import axios from "axios";
import "../styles/HealingMessageCreate.css"; // 스타일링 파일

const HealingMessageCreate = () => {

  const navigate = useNavigate(); // navigate 선언

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // 파일 객체만 저장
  };

  // 내용 변경 핸들러
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    // FormData 객체로 데이터 전송 (이미지 포함)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image); // 이미지 파일 추가
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${apiBaseUrl}/healingmessage`,
        formData,
        {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("힐링 메시지가 성공적으로 공유되었습니다.");
      navigate("/healing-message-list"); // 성공 시 이동
    } catch (err) {
      setError("메시지 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="healing-message-create">
      <h1 style={{ textAlign: 'left' }}>힐링 메시지 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" style={{ textAlign: 'left' }}>제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="image">이미지</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div> */}

        <div className="form-group">
          <label htmlFor="content" style={{ textAlign: 'left' }}>내용</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            rows="5"
            required
          ></textarea>
        </div>
        
        <div className="healing-message-create-button">
        <button type="submit" className="message-submit-button" disabled={loading}>
          {loading ? "전송 중..." : "힐링 메시지 공유하기"}
        </button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default HealingMessageCreate;
