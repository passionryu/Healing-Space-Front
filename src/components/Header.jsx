import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const audioRef = useRef(null); // audio 요소에 대한 참조

  // 페이지가 로드될 때 자동으로 음악 재생
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play(); // 음악 자동 재생
    }
  }, []);

  return (
    <header>
      <div className="header-container">
        {/* 왼쪽 이미지 영역 */}
        <div className="main-logo">
          <Link to="/">
            <img src="../src/assets/images/main_logo.png" alt="main-logo" />
          </Link>
        </div>

        {/* 네비게이션 영역 */}
        <nav>
          <ul>
            <li>
              Our Company
              <ul className="submenu">
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/team">Team Member</Link></li>
              </ul>
            </li>

            <li>
              Healing Space Service
              <ul className="submenu">
                <li><Link to="/ai-service-main">Healing AI Service</Link></li>
                <li><Link to="/healing-store-main">Healing Store</Link></li>
                <li><Link to="/healing-program">Healing Community</Link></li>
              </ul>
            </li>

            <li>
              Healing Space News
              <ul className="submenu">
                <Link to="/our-news-list"><li>Our News</li></Link>
              </ul>
            </li>

            <Link to="/mypage">
              <li>My Pages</li>
            </Link>

            <Link to="/login">
              <button>Login</button>
            </Link>
          </ul>
        </nav>

        {/* 음악 삽입 부분 */}
        <div className="audio-container">
          <audio ref={audioRef} controls>
            <source src="../src/assets/audio/YouTube.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>

      </div>
    </header>
  );
};

export default Header;
