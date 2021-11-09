import React from 'react'
import phoneImg from "../images/hero1.jpg";
import ellipse1 from "../images/big-eclipse.svg";
import { useGlobalContext } from "../components/context";

const Hero = () => {

    const {openModal } = useGlobalContext();


    return (
      <main>
        <div className="hero">
          <div className="hero-center">
            <div className="hero-info">
              <h1 className="fancy">
                Create Your Own Crypto Portfolio With Crypto
                <span className="bet">Bet</span>
              </h1>
              <p>
                Invest in everything <br /> Online platform to invest in
                cryptocurrency
              </p>
              <button onClick={openModal} className="btn">
                Connect Wallet
              </button>
            </div>
            <div className="hero-images">
              <img src={phoneImg} className="phone-img" alt="phone" />
            </div>
          </div>
        </div>
        <img className="big-circle" src={ellipse1} alt="" />
        <div className="footer1"></div>
      </main>
    );
}

export default Hero
