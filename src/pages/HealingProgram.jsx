import React from "react";
import { Link } from 'react-router-dom';
import "../styles/HealingProgram.css";

const HealingProgram = () => {
  return (

    <div className="healing-program-container">
        
      <div className="card">

        <div>
          <img src="../src/assets/images/dewcalendar.png" alt ="이미지"/>
          
        </div>

        <div className="card-text">
          <Link to="/diary">
          <h3>Dew Calendar</h3>
          <p>Write your diary...I`ll be with you </p>
          </Link>
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

  );
};

export default HealingProgram;
