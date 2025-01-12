import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DiaryPage.css"

const DiaryPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    diary: "",
  });

  const navigate = useNavigate(); // 페이지 이동

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8080/dew/diary",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 성공 후, 응답 받은 데이터를 가지고 결과 페이지로 이동
    //   navigate({
    //     pathname: "/diary/result",
    //     state: response.data,
    //   });
     // API 응답값을 location.state로 전달
     navigate("/diary/result", { state: response.data });
    } catch (error) {
      alert("An error occurred while saving your diary.");
    }
  };

  return (
    <div className="diary-container">
      <div className="diary-card">
        <h2>Write Your Diary</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter diary title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="diary">Diary</label>
            <textarea
              id="diary"
              name="diary"
              placeholder="Write your diary here"
              value={formData.diary}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Save Diary
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiaryPage;
