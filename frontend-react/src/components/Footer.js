import React from "react";
import { Link } from "react-router-dom";

import twitterSvg from "../images/icons8-twitter.svg";
import facebookSvg from "../images/icons8-facebook.svg";
import instagramSvg from "../images/icons8-instagram.svg";

const Footer = () => {
  return (
    <footer>
      <div className="socialContainer">
        <Link className="socialLink" to="/">
          <div className="socialSvg">
            <img src={facebookSvg} alt="Facebook" />
          </div>
        </Link>
        <Link className="socialLink" to="/">
          <div className="socialSvg">
            <img src={twitterSvg} alt="Twitter" />
          </div>
        </Link>
        <Link className="socialLink" to="/">
          <div className="socialSvg">
            <img src={instagramSvg} alt="Instagram" />
          </div>
        </Link>
      </div>

      <p>© 2022 Website Name</p>
    </footer>
  );
};

export default Footer;
