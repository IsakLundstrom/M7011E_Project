import React from "react";

import homeImage from "../images/home_image.png";

const HomePage = () => {
  return (
    <main>
      <div class="homeImageContainer">
        <div className="imageGradient"></div>
        <img src={homeImage} alt="Home" />
        <h1 className="textBottomLeft">Home page</h1>
      </div>
      <div></div>
    </main>
  );
};

export default HomePage;
