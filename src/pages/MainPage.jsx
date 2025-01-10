import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/MainPage.css"


function Main() {
  return (

    <>
        <div>

         {/* SLIDER  시작점점*/}
            <section>
                <div className="slider">
                    <div className="slide-track">
                            
                        <div className="slide">
                            <img
                            src='../src/assets/images/slide1.png'
                            alt="이미지 1"
                            />
                        </div>
                        <div className="slide">
                                <img 
                                src="../src/assets/images/slide2.png" 
                                alt="이미지 2"/>
                        </div> 
                        <div className="slide">
                                <img 
                                src="../src/assets/images/slide3.png" 
                                alt="이미지 3"/>
                        </div>
                    </div>
                </div>
            </section>
        {/* SLIDER  종단점점*/}

        {/* About US  시작점*/}

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

        {/* About US  종단점*/}        

        {/* 힐링 프로그램 로고 시작점*/}
        <div className='healing-service-logo'>
            <img src='../src/assets/images/healingservice.png' alt='힐링 서비스 로고'/>
        </div>
        {/* 힐링 프로그램 로고 종단점*/}

        {/* 힐링 프로그램 요소 시작점*/}
        <div className="healing-program-container">
        
        <div className="card">
  
          <div>
            <img src="../src/assets/images/dewcalendar.png" alt ="이미지"/>
          </div>
  
          <div className="card-text">
            <h3>Dew Calendar</h3>
            <p>Write your diary...I`ll be with you </p>
          </div>
  
        </div>
  
        <div className="card">
          <div>
              <img src="../src/assets/images/healingmessagesharing.png" alt ="이미지"/>
            </div>
  
            <div className="card-text">
              <h3>Healing Messge Sharing</h3>
              <p>Share your Messeage to others</p>
            </div>
        </div>
  
        <div className="card">
          <div>
              <img src="../src/assets/images/healingmusicsharing.png" alt ="이미지"/>
            </div>
  
            <div className="card-text">
              <h3>Healing Music Sharing</h3>
              <p>Share Your favorite Music with others</p>
            </div>
        </div>
  
      </div>
      {/* 힐링 프로그램 요소 종단점점*/}
            
        </div>
    </>
  );
}

export default Main;
