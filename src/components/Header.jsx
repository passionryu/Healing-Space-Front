import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/Header.css";

const Header = () => {
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
                                <li><Link to="/about-us">About us</Link></li>
                                <li><Link to="/team">Team member</Link></li>
                                
                            </ul>
                        </li>
                        <li>
                            Healing Service
                            <ul className="submenu">
                                <li>
                                    <Link to="/healing-program">
                                        Healing Program
                                    </Link>
                                </li>
                                <li>Healing Store</li>
                                <li>AI Recommend</li>
                            </ul>
                        </li>
                        <li>
                            Healing Space News
                            <ul className="submenu">
                                <Link to="/our-news-list">
                                <li>Our News</li>
                                </Link>
                                <li>News & Articles</li>
                                <li>Notice</li>
                            </ul>
                        </li>
                        {/* <li>
                            Customer Service
                            <ul className="submenu">
                                <li>AI ChatBot</li>
                                <li>Contact Us</li>
                            </ul>
                        </li> */}
                        
                        <Link to="/mypage">
                            <li>My Pages</li>
                        </Link>
                        
                        <Link to="/login">
                        <button>Login</button>
                        </Link>
                    </ul>
                </nav>

            </div>
        </header>
    );
};

export default Header;
