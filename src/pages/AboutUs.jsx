import React from 'react';
import "../styles/AboutUs.css";

const AboutUs = () => {
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

      <div className="about-us-page-image">
        <img src="../src/assets/images/slide_2.png" alt="Healing Space" />
      </div>

    </div>
  );
};

export default AboutUs;
