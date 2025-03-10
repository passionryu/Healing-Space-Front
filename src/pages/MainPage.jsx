  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import axios from "axios"
  import "../styles/MainPage.css";

  function Main() {
    const [index, setIndex] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const slides = [
      "../src/assets/images/slide_2.png",
      "../src/assets/images/slide_3.png",
      "../src/assets/images/slide_1.png",
    ];

    // 슬라이드 자동 변경 로직
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length); // 다음 슬라이드로 이동
      }, 10000); // 초 간격

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제

    }, [slides.length]);

    // 수동 슬라이드 이동
    const handlePrev = () => {
      setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    useEffect(() => {
      axios
        .get(`${apiBaseUrl}/blog`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setBlogs(response.data); // 응답받은 데이터를 state에 저장
        })
        .catch((error) => {
          console.error("Failed to fetch blog data", error);
        });
    }, []);

    return (
      <>
        <div>

          {/* SLIDER 시작 */}
          <section>
            <div className="slider-container">
              <button className="prev-button" onClick={handlePrev}>
                ◀
              </button>
              <div className="slider">
                <div
                  className="slide-track"
                  style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: "transform 1.2s ease",
                  }}
                >
                  {slides.map((slide, i) => (
                    <div className="slide" key={i}>
                      <img src={slide} alt={`슬라이드 ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
              <button className="next-button" onClick={handleNext}>
                ▶
              </button>
            </div>
          </section>
        
          {/* SLIDER 종단점 */}

          {/* About US 시작점 */}
          <div className="main-about-us-container">
            {/* 왼쪽 이미지 영역 */}
            {/* <Link to="/about-us"> */}
              <div className="main-about-us-image">
                <img src="../src/assets/images/Logo3.png" alt="Healing Space" />
              </div>
            {/* </Link> */}

            {/* 오른쪽 텍스트 영역 */}
            <div className="about-us-text">
              <h1 style={{ textAlign: "left" }}>  Introduce </h1>
              <h4>Healing Space Web Service는 AI를 활용한 힐링 프로그램 및 다양한 서비스를 제공하는 웹 서비스입니다. <br />
                눈이 부시도록 고도로 발전한 대한민국을 돌아보면, 그간 얼마나 많은 이들이 땀을 흘리며 이 사회를 일궈 왔는지를 모르겠습니다. </h4>
              <h4>제 주변의 사람들만 보아도, 참 많은 이들이 본인의 자리에서 열정을 다하여 자신의 본분에 최선을 다합니다.<br />
                하지만 그들이 꿈을 가지고 열심히 달려감에도 불구하고, 가끔은 본인 스스로가 얼마나 지쳐있는 상태인지 돌아보지 못하곤 하는 것 같습니다.</h4>

              <h4>그들을 향해 제가 학교에서 배운 지식으로 조그마한 위로와 격려의 편지를 써줄 수 있으면 좋지 않을까 하는 마음에, <br />
              대학교 2~3학년 시절에 지금 보시는 것과 같은 작은 꿈을 꾸어 봤습니다.</h4>
              <h4>비록 지금은 이렇게 미약하게 시작하나, 언젠가는 사람들에게 유익하게 쓰일 수 있는 훌륭한 응용 소프트웨어를 개발하는 첫걸음이 되지 않을까 기대합니다.</h4>
              <h4>마지막으로 제가 가장 좋아하는 인사말로 간단한 소개를 마무리하며, <br/>
              이제 지난 겨울 방학 6주간 혼자서 매일 아침 카페에 출근하며 개발한 저만의 웹 서비스를 배포합니다.</h4>

              <h4>평안하세요! 🌿</h4>
              <p style={{ textAlign: "right", fontStyle: "italic", color: "gray"  }}>
                - Healing Space 개발자. 류성열
              </p>

            </div>
          </div>
          {/* About US 종단점 */}

          {/* 힐링 프로그램 로고 시작점 */}
          <div className="healing-service-logo">
            <img src="../src/assets/images/healingservice.png" alt="힐링 서비스 로고" />
          </div>
          {/* 힐링 프로그램 로고 종단점 */}

          {/* 힐링 프로그램 요소 시작점 */}
          <h4>Healing Space 팀이 준비한 다양한 힐링 서비스를 만나보세요.</h4>
<p>Explore the diverse healing services prepared by the Healing Space team.</p>


          <div className="healing-program-container">

            <div className="main-card">
              <div>
                <img src="../src/assets/images/aihealingservices.png" alt="이미지" />
              </div>
              <div className="card-text">
                <Link to={"/ai-service-main"}>
                  <h3>AI Healing Service</h3>
                  <p>Healing Space's AI service will response for you.😉</p>
                </Link>
              </div>
            </div>

            <div className="main-card">
              <div>
                <img src="../src/assets/images/healingstore.png" alt="이미지" />
              </div>
              <div className="card-text">
                <Link to="/healing-store-main">
                  <h3>Healing Store</h3>
                  <p>Why don't you buy some healing stuff for yourself? 😎</p>
                </Link>
              </div>
            </div>

            <div className="main-card">
              <div>
                <img src="../src/assets/images/healingcommunity.png" alt="이미지" />
              </div>
              <div className="card-text">
                <Link to="/healing-program">
                  <h3>Healing Community</h3>
                  <p>Healing Community for you 😉</p>
                </Link>
              </div>
            </div>

          </div>
          {/* 힐링 프로그램 요소 종단점 */}

          {/* 힐링 스페이스 뉴스 로고 시작점 */}
          <div className="healing-space-news">
            <img src="../src/assets/images/healingspacenews.png" alt="힐링 서비스 뉴스 로고" />
          </div>

          <p> 아래 블로그들은 실제 Naver의 힐링 블로그들을 자동 크롤링 한 데이터이며, 이는 매일 자정마다 지동으로 업데이트 됩니다.</p>

          {/* 힐링 블로그 카드 나열 */}
          <div className="healing-blog-container">
            {blogs.length > 0 ? (
              <div className="blog-grid">

                {blogs.map((blog) => (
                  <div className="blog-card" key={blog.id}>

                    <Link to={blog.thumbnail} target="_blank">

                      <div className="blog-content">
                        <h4 style={{ textAlign: "left" }}>{blog.title}</h4>
                        <p style={{ textAlign: "left" }}> 블로그 작성자 : {blog.author}</p>
                        
                      </div>

                      <div className="blog-thumbnail">
                        <img src={blog.profile_img} alt="Thumbnail" />
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
