import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import DROPdown from "../components/Dropdown";
import './ActivePools.css';
import * as BettingContract from "../abis/BettingContract.json";
import { useGlobalContext } from "../components/context";

const ActivePools = () => {
  const [index, setIndex] = useState(1);
  const [pools, setPools] = useState([]);

  const { 
    account
  } = useGlobalContext();

  const [state, setState] = useState({
    event : null,
    token1 : "", 
    token2 : "",
    token3 : "",
    bet : 0.0
  })

  const setToken1 = (value) => {
    setState({
      ...state,
      token1 : value
    })
  }  

  const setToken2 = (value) => {
    setState({
      ...state,
      token2 : value
    })
  }  

  const setToken3 = (value) => {
    setState({
      ...state,
      token3 : value
    })
  }  

  const setAmount = (e) => {
    setState({
      ...state, 
      bet : e.target.value
    });
  }

  const selectPool = (value) => {
    setState({
      ...state, 
      event : value
    })
  }

  useEffect(() => {
    const lastIndex = pools.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, pools]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);


  useEffect(()=> {
    const f = async() => {
      const web3 = window.web3;
      const bettingToken = new web3.eth.Contract(BettingContract.default.abi, BettingContract.default.address);
      const poolCount = await bettingToken.methods.poolCounter().call();
      
      const pl = [];
      for(let i=0; i<poolCount; i++) {
        const spl = await bettingToken.methods.pools(i+1).call();
        pl.push({
          ...spl, 
          index : i+1
        });
      }
      setPools(pl);
      console.log("Pools : ", pl);
    };
    f();

  }, []);

  useEffect(()=> {
    console.log("Data : ", state);
  }, [state]);

  const buyIn = () => {
    const web3 = window.web3;
    const bettingToken = new web3.eth.Contract(BettingContract.default.abi, BettingContract.default.address);

    const data = {
      _poolId : state.event, 
      _tokens : [state.token1[2], state.token2[2], state.token3[2]]
    }

    console.log("data : ", data);
    console.log({from : account, value : parseInt(state.bet)});

    bettingToken.methods.buyIn(data._poolId, data._tokens).send({from : account, value : parseInt(state.bet)});
  }

  return (
    <section className="section">
      <div className="title">
        <h2>Actice Pools</h2>
        <div className="underline"></div>
      </div>

      <div className="section-center">
        {pools.map((pool, ind) => {

          let position = "nextSlide";
          if (ind === index) {
            position = "activeSlide";
          }
          if (
            ind === index - 1 ||
            (index === 0 && ind === pools.length)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={ind}>
              <img 
                src="https://images.theconversation.com/files/410791/original/file-20210712-15-1kq5y30.jpeg?ixlib=rb-1.1.0&rect=26%2C0%2C5964%2C3997&q=45&auto=format&w=496&fit=clip" 
                alt="Event Logo" 
                className="person-img"
              />
              <h4>{`Pool ${ind+1}`}</h4>
              <p className="title">Start time : {pool.startTime}</p>
              <p className="title">End time : {pool.endTime}</p>
              <p className="text">Bet Size  : {pool.betSize}</p>
              <button 
                className="btn1"
                onClick={()=> selectPool(pool.index)}
              >
                Select Now
              </button>
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>

      <div className="title token_title">
        <h2>Select Tokens</h2>
        <div className="underline"></div>
      </div>
      <div className="token">
        <div className="token1 ">
          <h3 className="token_title1">Token 1</h3>
          <DROPdown value={state.token1} setValue={setToken1} />
        </div>
        <div className="token2">
          <h3 className="token_title1">Token 2</h3>
          <DROPdown value={state.token2} setValue={setToken2} />
        </div>
        <div className="token3">
          <h3 className="token_title1">Token 3</h3>
          <DROPdown value={state.token3} setValue={setToken3} />
        </div>
      </div>

      <div className="bet_amount">
        <div className="title">
          <h2>Bet Amount</h2>
          <div className="underline"></div>
        </div>
        <div className="betinput">
          <input type="number" placeholder="Enter Amount" onChange={setAmount} />
        </div>
        <div className="betsubmit">
          <button className="btn1" onClick={buyIn}>Place Bet</button>
        </div>
      </div>
      <div className="footer"></div>
    </section>
  );
};

export default ActivePools;
