import React from "react";
import { Link } from "react-router-dom";

import twitterSvg from "../images/icons8-twitter.svg";
import facebookSvg from "../images/icons8-facebook.svg";
import instagramSvg from "../images/icons8-instagram.svg";

const Footer = () => {
  return (
    <footer>
      <div className="socialContainer">
        <a className="socialLink" href="https://www.facebook.com/">
          <div className="socialSvg">
            <img src={facebookSvg} alt="Facebook" />
          </div>
        </a>
        <a className="socialLink" href="https://www.twitter.com/">
          <div className="socialSvg">
            <img src={twitterSvg} alt="Twitter" />
          </div>
        </a>
        <a className="socialLink" href="https://www.instagram.com/">
          <div className="socialSvg">
            <img src={instagramSvg} alt="Instagram" />
          </div>
        </a>
      </div>

      <p>© 2022 The Sweat Zone</p>
    </footer>
  );
};

export default Footer;
