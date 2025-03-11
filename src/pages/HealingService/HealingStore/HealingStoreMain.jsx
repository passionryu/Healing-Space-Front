import React from "react";
import "../../../styles/healingstore/HealingStoreMain.css";

const HelaingStoreMain = () => {
    return (

        <div className="healing-store-container">

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

            <div className="healing-store-main">
                <a
                    href="https://zenhealingshop.co.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="../src/assets/images/healing_store_img/zen.png"
                        alt="Healing Store Main"
                        className="main-image"
                    />
                </a>

                <div className="healing-store-text">
                    <h1 style={{ textAlign: "left" }}>Zen <br />Healing Shop</h1>
                    <h6>* 젠 힐링 샵 공식 온라인 스토어</h6>
                </div>

            </div>
        </div>
    );
};

export default HelaingStoreMain;
