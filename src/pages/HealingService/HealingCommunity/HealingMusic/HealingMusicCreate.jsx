import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import axios from "axios";
import "../../../../styles/HealingCommunity/HealingMusic/HealingMusicCreate.css"; // 스타일링 파일

const HealingMusicCreate = () => {
  const navigate = useNavigate(); // navigate 선언

  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 비디오 링크 변경 핸들러
  const handleVideoLinkChange = (e) => {
    setVideoLink(e.target.value);
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

    // API로 데이터 전송
    const postData = {
      title: title,
      videoLink: videoLink,
      content: content,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${apiBaseUrl}/healingmusic`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("힐링 뮤직이 성공적으로 공유되었습니다.");
      navigate("/healing-music-list"); // 성공 시 이동
    } catch (err) {
      setError("뮤직 포스팅에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="healing-music-create">
      <h1 style={{ textAlign: 'left' }}>힐링 뮤직 등록</h1>
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

        <div className="form-group">
          <label htmlFor="videoLink" style={{ textAlign: 'left' }}>비디오 링크</label>
          <input
            type="text"
            id="videoLink"
            value={videoLink}
            onChange={handleVideoLinkChange}
            required
          />
        </div>

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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "전송 중..." : "힐링 뮤직 공유하기"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default HealingMusicCreate;
