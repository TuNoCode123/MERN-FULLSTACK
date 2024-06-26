import React, { useEffect } from "react";
import Header from "./header/header";
import "./home.scss";
import Tittle1 from "./main/tittle1/tittle1";
import Tittle2 from "./main/title2/title2";
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <Header />
      </div>
      <div className="main mt-3">
        <div className="tittle1">
          <Tittle1 />
        </div>
        <div className="tittle2 mt-5">
          <Tittle2 />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};
export default Home;
