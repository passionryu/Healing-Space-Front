import React from "react";
import { Link } from 'react-router-dom';
import "../styles/HealingProgram.css";

const HealingProgram = () => {
  return (

    <div className="healing-community-container">

      <div className="heal-card">
        <Link to="/healing-message-list">
          <div>
            <img src="../src/assets/images/healingmessagesharing.png" alt="이미지" />
          </div>

          <div className="card-text">

            <h3 style={{ textAlign: "left" }}>Healing Messge Sharing</h3>
            <p style={{ textAlign: "left" }}>"Healing Message Sharing" 서비스는 사용자들이 자신의 마음에 힐링이 되는 글귀, 시, 대화 등을 자유롭게 공유하며 서로 소통할 수 있는 공간입니다.</p>
            <p style={{ textAlign: "left" }}>우리는 모두 일상 속에서 다양한 감정을 겪으며 살아가고 있습니다. 때로는 어려운 순간에 위로와 격려의 말 한마디가 큰 힘이 되기도 하죠.</p>
            <p style={{ textAlign: "left" }}>이 서비스는 바로 그런 순간에 필요한 감동적인 메시지나 따뜻한 글들을 공유하고, 서로의 감정을 이해하며 위로를 전할 수 있는 공간을 제공합니다.</p>

            <h4> ✏️ 글 작성 기능 ✏️ </h4>
            <p>사용자는 자신이 좋아하는 시, 명언, 글귀 등을 자유롭게 게시할 수 있습니다. </p>

            <h4> 💬 댓글 달기 기능 💬 </h4>
            <p> 다른 사용자들이 남긴 글에 댓글을 남길 수 있습니다.</p>

            <h4> ❤️ 좋아요 기능 ❤️ </h4>
            <p>다른 사람의 글에 대한 공감이나 긍정적인 반응을 표현할 수 있습니다.</p>

          </div>
        </Link>
      </div>

      <div className="heal-card">
        <Link to="/healing-music-list">
          <div>
            <img src="../src/assets/images/healingmusicsharing.png" alt="이미지" />
          </div>

          <div className="card-text">

            <h3 style={{ textAlign: "left" }}>Healing Music Sharing</h3>
            <p style={{ textAlign: "left" }}>
              "Healing Music Sharing" 서비스는 음악을 통해 감정을 치유하고, 다른 사람들과 힐링의 순간을 나눌 수 있는 공간입니다.
            </p>
            <p style={{ textAlign: "left" }}>
              이 서비스는 다양한 장르와 분위기의 힐링 음악을 공유하며, 마음의 평온을 찾는 데 도움을 줄 것입니다.
            </p>
            <p style={{ textAlign: "left" }}>
              힐링 음악을 나눔과 동시에 서로의 감정을 나누세요. 음악을 통해 더 깊은 소통과 힐링을 경험할 수 있는 특별한 공간이 될 것입니다.
            </p>

            <h4> ✏️ 음악 공유 기능 ✏️ </h4>
            <p>사용자는 자신이 좋아하는 음악과 메시지를 자유롭게 게시할 수 있습니다. </p>

            <h4> 💬 댓글 달기 기능 💬 </h4>
            <p> 다른 사용자들이 남긴 글에 댓글을 남길 수 있습니다.</p>

            <h4> ❤️ 좋아요 기능 ❤️ </h4>
            <p>다른 사람의 글에 대한 공감이나 긍정적인 반응을 표현할 수 있습니다.</p>


          </div>
        </Link>
      </div>

    </div>

  );
};

export default HealingProgram;
