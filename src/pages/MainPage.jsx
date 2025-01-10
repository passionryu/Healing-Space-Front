import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/MainPage.css"

function Main() {
  return (

    <>
        <div>

         {/* SLIDER  */}
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
        {/* SLIDER  */}

        {/* 힐링 프로그램 로고 */}
        <div className='healing-service-logo'>
            <img src='../src/assets/images/healingservice.png' alt='힐링 서비스 로고'/>
        </div>

        {/* 힐링 프로그램 요소 */}
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
            
        </div>
    </>
  );
}

export default Main;
