// src/pages/AboutUs.jsx
import React from 'react';
import "../styles/AboutUs.css"

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* 왼쪽 이미지 영역 */}
      <div className="about-us-image">
        <img src="../src/assets/images/Logo3.png" alt="Healing Space" />
      </div>

      {/* 오른쪽 텍스트 영역 */}
      <div className="about-us-text">
        <h1>About Us</h1>
        <h4>Healing Space는 마음의 평안과 삶의 치유를 추구하는 모든 사람들을 위한 공간입니다.</h4>
        <h4>우리는 현대인의 지친 마음을 돌보고, 스스로를 사랑하는 방법을 다시 발견할 수 있도록 돕는 데 초점을 맞추고 있습니다.</h4>

        <h4>저희 Healing Space는 여러가지의 온라인 힐링 프로그램, 엄선된 힐링 용품 쇼핑몰, 유익한 힐링 투어 정보 공유 서비스를 통해 여러분의 삶에 작은 변화와 따뜻한 위로를 더하고자 합니다.</h4>
        <h4>Healing Space는 단순한 서비스 그 이상입니다. 여러분이 자신을 더 깊이 이해하고, 스스로를 소중히 여기는 여정을 함께 걸어가는 동반자가 되고 싶습니다.</h4>
        <h4>함께 회복과 평안이 넘치는 세상을 만들어갑시다.</h4>
        
        <br></br>
        <h4>*Team Healing-Space</h4>
      </div>
    </div>
  );
};

export default AboutUs;
