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
        </div>
    </>
  );
}

export default Main;
