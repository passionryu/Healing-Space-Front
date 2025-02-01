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
                                <li><Link to="/about-us">About Us</Link></li>
                                <li><Link to="/team">Team Member</Link></li>
                                <li>Service Details</li>
                                
                            </ul>
                        </li>
                        <li>
                            Healing Space Service
                            <ul className="submenu">
                                <li>
                                    <Link to="/healing-program">
                                        Healing Community
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/ai-service-main">
                                        Healing AI Service
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/healing-store-main">
                                        Healing Store
                                    </Link>
                                </li>
                                
                               
                            </ul>
                        </li>
                        <li>
                            Healing Space News
                            <ul className="submenu">
                                <Link to="/our-news-list">
                                <li>Our News</li>
                                </Link>
                                <li>Healing Blogs</li>
                                {/* <li>Notice</li> */}
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
