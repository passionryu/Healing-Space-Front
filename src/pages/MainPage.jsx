import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import "../styles/MainPage.css";

function Main() {
  const [index, setIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);

  const slides = [
    "../src/assets/images/slide1.png",
    "../src/assets/images/slide2.png",
    "../src/assets/images/slide3.png",
  ];

  // 슬라이드 자동 변경 로직
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length); // 다음 슬라이드로 이동
    }, 4000); // 4초 간격

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제

  }, [slides.length]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get('http://localhost:8080/blog',{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
      .then((response) => {
        setBlogs(response.data); // 응답받은 데이터를 state에 저장 
      }
    )
      .catch((error) => {
        console.error("Failed to fetch blog data", error);
      });
  }, []);
  
  return (
    <>
      <div>
        {/* SLIDER 시작점 */}
        <section>
          <div className="slider">
            <div
              className="slide-track"
              style={{
                transform: `translateX(-${index * 100}%)`, // 슬라이드 위치 조정
                transition: "transform 0.9s ease", // 부드러운 이동 효과
              }}
            >
              {slides.map((slide, i) => (
                <div className="slide" key={i}>
                  <img src={slide} alt={`슬라이드 ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* SLIDER 종단점 */}

        {/* About US 시작점 */}
        <div className="about-us-container">
          {/* 왼쪽 이미지 영역 */}
          <Link to ="/about-us">
          <div className="about-us-image">
            <img src="../src/assets/images/Logo3.png" alt="Healing Space" />
          </div>
          </Link>

          {/* 오른쪽 텍스트 영역 */}
          <div className="about-us-text">
            <h1>About Us</h1>
            <h4>Healing Space는 마음의 평안과 삶의 치유를 추구하는 모든 사람들을 위한 공간입니다.</h4>
            <h4>우리는 현대인의 지친 마음을 돌보고, 스스로를 사랑하는 방법을 다시 발견할 수 있도록 돕는 데 초점을 맞추고 있습니다.</h4>
            <h4>저희 Healing Space는 여러 가지의 온라인 힐링 프로그램, 엄선된 힐링 용품 쇼핑몰, 유익한 힐링 투어 정보 공유 서비스를 통해 여러분의 삶에 작은 변화와 따뜻한 위로를 더하고자 합니다.</h4>
            <h4>Healing Space는 단순한 서비스 그 이상입니다. 여러분이 자신을 더 깊이 이해하고, 스스로를 소중히 여기는 여정을 함께 걸어가는 동반자가 되고 싶습니다.</h4>
            <h4>함께 회복과 평안이 넘치는 세상을 만들어갑시다.</h4>
            <br />
            <h4>*Team Healing-Space</h4>
          </div>
        </div>
        {/* About US 종단점 */}

        {/* 힐링 프로그램 로고 시작점 */}
        <div className="healing-service-logo">
          <img src="../src/assets/images/healingservice.png" alt="힐링 서비스 로고" />
        </div>
        {/* 힐링 프로그램 로고 종단점 */}

        {/* 힐링 프로그램 요소 시작점 */}
        <h4>우리 Healing Space 팀은 여러 가지의 Healing Service를 제공합니다.</h4>
        <p>원하는 서비스를 마음껏 사용하세요.💓 </p>

        <div className="healing-program-container">
          <div className="card">
            <div>
              <img src="../src/assets/images/dewcalendar.png" alt="이미지" />
            </div>
            <div className="card-text">
              <Link to="/healing-program">
                <h3>Healing Program</h3>
                <p>We prepare various healing program for you 😉</p>
              </Link>
            </div>
          </div>

          <div className="card">
            <div>
              <img src="../src/assets/images/healingmessagesharing.png" alt="이미지" />
            </div>
            <div className="card-text">
              <Link to="/healing-store-main">
              <h3>Healing Store</h3>
              <p>Why don't you buy some healing stuff for yourself? 😎</p>
              </Link>
            </div>
          </div>

          <div className="card">
            <div>
              <img src="../src/assets/images/healingmusicsharing.png" alt="이미지" />
            </div>
            <div className="card-text">
            <Link to={"/ai-service-main"}>
              <h3>AI Service</h3>
              <p>Healing Space's AI service will response for you.😉</p>
              </Link>
            </div>
          </div>
        </div>
        {/* 힐링 프로그램 요소 종단점 */}

        {/* 힐링 스페이스 뉴스 로고 시작점 */}
        <div className="healing-space-news">
          <img src="../src/assets/images/healingspacenews.png" alt="힐링 서비스 뉴스 로고" />
        </div>
        
        <p> 아래 블로그들은 실제 Naver 블로그를 크롤링 한 데이터입니다. </p>

         {/* 힐링 블로그 카드 나열 */}
         <div className="healing-blog-container">
          {blogs.length > 0 ? (
            <div className="blog-grid">

              {blogs.map((blog) => (
                <div className="blog-card" key={blog.id}>

                  <Link to={blog.link} target="_blank">

                    <div className="blog-content">
                      <h4 style={{ textAlign: "left" }}>{blog.title}</h4>
                      <p style={{ textAlign: "left" }}>{blog.author}</p>
                      {/* <img className="profile-img" src={blog.profile_img} alt="Profile" /> */}
                    </div>

                    <div className="blog-thumbnail">
                      <img src={blog.thumbnail} alt="Thumbnail" />
                    </div>

                  </Link>
                </div>
              ))}

            </div>
          ) : (
            <p>Loading blogs...</p>
          )}
        </div>

        {/* 힐링 스페이스 뉴스 로고 종단점 */}

      </div>
    </>
  );
}

export default Main;
