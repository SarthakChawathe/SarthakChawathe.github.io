import React from 'react';
import "./footer.css";
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__container container">
            <h1 className="footer__title">Sarthak Chawathe</h1>

            <ul className="footer__list">
                <li>
                    <a href="#about" className="footer__link">About</a>
                </li>
                <li>
                    <a href="#portfolio" className="footer__link">Projects</a>
                </li>
                <li>
                    <a href="#testimonials" className="footer__link">Testimonials</a>
                </li>
            </ul>
            <div className="footer__social">

            <a href="https://www.linkedin.com/in/sarthak-chawathe/" className="home__social-icon" target="_blank" rel="noreferrer" >
                    <FiLinkedin />
                </a>

                <a href="https://github.com/SarthakChawathe" className="home__social-icon" target="_blank" rel="noreferrer">
                    <FiGithub />
                </a>

                <a href="https://twitter.com/Sarthak_C97" className="home__social-icon" target="_blank" rel="noreferrer">
                    <FiTwitter />
                </a>


                <a href="https://www.instagram.com/sarthakchawathe/" className="home__social-icon" target="_blank" rel="noreferrer" >
                    <FiInstagram />
                </a>
                    
            </div>
            <p class="footer__copy">&#169; Copyright 2025 Sarthak Chawathe. All right reserved</p>
            <span className="footer__copy"></span>
        </div>
    </footer>
  );
}

export default Footer;