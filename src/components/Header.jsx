import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/Header.css";

const Header = () => {
    return (
        <header>

            {/* 네비게이션 영역 */}
            <nav>
                <ul>
                    <li>
                        Our Company
                        <ul className="submenu">
                            <li><Link to="/about-us">About Us</Link></li>
                            <li>Team</li>
                            
                        </ul>
                    </li>
                    <li>
                        Healing Program
                        <ul className="submenu">
                            <li>Healing Program</li>
                            <li>Healing Store</li>
                            <li>AI Recommendation</li>
                        </ul>
                    </li>
                    <li>
                        News
                        <ul className="submenu">
                            <li>Blog</li>
                            <li>Events</li>
                            <li>Press</li>
                        </ul>
                    </li>
                    <li>
                        Customer Service
                        <ul className="submenu">
                            <li>Contact Us</li>
                        </ul>
                    </li>
                    <li>My Pages</li>
                    <button>Login</button>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
