import React from "react";
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram} from "react-icons/fi";

const Social = () => {
    return (
        <div className="home__social">
            <a href="https://www.linkedin.com/in/sarthak-chawathe/" className="home__social-icon" target="_blank">
                <FiLinkedin />
            </a>
            <a href="https://github.com/SarthakChawathe" className="home__social-icon" target="_blank">
                <FiGithub />
            </a>

            <a href="https://twitter.com/Sarthak_C97" className="home__social-icon" target="_blank">
                <FiTwitter />
            </a>

            <a href="https://www.instagram.com/sarthakchawathe/" className="home__social-icon" target="_blank">
                <FiInstagram />
            </a>

        </div> 
    ); 
}

export default Social;