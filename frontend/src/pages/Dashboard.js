import React from "react";
import clock from "../images/clock.png";
import coin from "../images/coin.png";
import winner from "../images/win.png";
import mainman from "../images/mainman.png";
import "./dashbord.css";

const Dashboard = () => {
  return (
    <main>
      <div className="dash_hero">
        <div className="dash_hero-center">
          <div className="dash_hero-info">
            <div className="dash_fancy">
              <h1>Prices</h1>
              <div className="underline"></div>
            </div>
            <div className="card">
              <div className="card-info"></div>
            </div>
          </div>
          <div className="dash_hero-image">
            <img src={mainman} alt="hero" />
          </div>
        </div>
        <div className="winner-info">
          <div className="winnerinfo betsize">
            <h2>Bet Size</h2>
            <div className="underline"></div>
            <img src={coin} alt="" />
            <div className="recta1"></div>
          </div>
          <div className="winnerinfo endtime">
            <h2>End Time</h2>
            <div className="underline"></div>
            <img src={clock} alt="" />
            <div className="recta2"></div>
          </div>
          <div className="winnerinfo Winners">
            <h2>Winners</h2>
            <div className="underline"></div>
            <img src={winner} alt="" />
            <div className="recta3"></div>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </main>
  );
};

export default Dashboard;
