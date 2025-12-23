import React from 'react'
import { Link } from 'react-router'
import './Footer.css'

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="logo-icon">🥗</div>
                        <span className="brand-text">Mathe's EATERY</span>
                    </div>
                    <p className="footer-description">
                        Experience authentic flavors and fresh ingredients crafted with love.
                        Where every meal tells a story of tradition and quality.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="footer-links">
                    <div className="footer-section">
                        <h3 className="footer-title">Navigation</h3>
                        <ul className="footer-list">
                            <li><Link to="/" className="footer-link">Home</Link></li>
                            <li><Link to="/meals" className="footer-link">Meals</Link></li>
                            <li><Link to="/about" className="footer-link">About</Link></li>
                            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="footer-list">
                            <li><Link to="/menu" className="footer-link">Our Menu</Link></li>
                            <li><Link to="/specialties" className="footer-link">Daily Specials</Link></li>
                            <li><Link to="/catering" className="footer-link">Catering</Link></li>
                            <li><Link to="/reservations" className="footer-link">Reservations</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Connect</h3>
                        <ul className="footer-list">
                            <li><a href="#" className="footer-link">Newsletter</a></li>
                            <li><a href="#" className="footer-link">Contact Us</a></li>
                            <li><a href="#" className="footer-link">Support</a></li>
                            <li><a href="#" className="footer-link">FAQ</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p className="footer-copyright">
                        © 2025 Mathe's EATERY. All rights reserved.
                    </p>
                    <div className="footer-social">
                        <a href="#" className="social-link">Privacy</a>
                        <a href="#" className="social-link">Terms</a>
                        <a href="#" className="social-link">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer