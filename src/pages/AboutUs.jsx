import React, { useState, useEffect } from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {

  const [index, setIndex] = useState(0);
  
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

  return (
    <div className="about-us-container">
  
      <div className="about-us-content">

        {/* 왼쪽 작은 이미지 */}
        <div className="about-us-small-image">
          <img src="../src/assets/images/aboutus.png" alt="Healing Space Logo" />
        </div>

        {/* 오른쪽 텍스트 */}
        <div className="about-us-text">
          
          <h4>
            Healing Space는 AI 기반 심리 상담과 힐링 프로그램을 제공하는 웹 서비스입니다.
            우리는 현대인의 정신적 건강을 위해 다양한 콘텐츠와 서비스를 제공합니다.
          </h4>
          <h4>
            바쁜 일상 속에서 잠시 쉬어갈 수 있는 공간을 마련하여, 
            여러분의 마음이 편안해지길 바랍니다. 🌿
          </h4>
          <p className="year">- Since 2025</p>
        </div>

      </div>

      {/* <div className="about-us-page-image">
        <img src="../src/assets/images/slide_2.png" alt="Healing Space" />
      </div> */}

      {/* SLIDER 시작 */}
      {/* <section>
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
        </section> */}

        {/* SLIDER 종단점 */}

    </div>
  );
};

export default AboutUs;
