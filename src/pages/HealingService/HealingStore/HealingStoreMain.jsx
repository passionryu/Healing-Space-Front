import React from "react";
import "../../../styles/healingstore/HealingStoreMain.css";

const HelaingStoreMain = () => {
    return (
        <div className="healing-store-main">
            <div className="healing-store-text">
            <h1 style={{ textAlign: "left" }}>Healing <br />Farms</h1>
            <h6>* 힐링팜스 공식 온라인 스토어</h6>
            </div>
            <a 
                href="https://healingfarms.co.kr/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <img
                    src="../src/assets/images/healing_store_img/healingfarms.jpg"
                    alt="Healing Store Main"
                    className="main-image"
                />
            </a>
        </div>
    );
};

export default HelaingStoreMain;
