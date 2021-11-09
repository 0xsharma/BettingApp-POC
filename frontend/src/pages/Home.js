import React, { useEffect } from 'react'
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import Hero from "./Hero";
import { useGlobalContext } from '../components/context';
import { useHistory } from 'react-router-dom';

const Home = () => {

  const history = useHistory();

  const { 
    account,
    connected
  } = useGlobalContext();

  useEffect(()=> {
    console.log("Account : ",account);
    console.log("Connected : ", connected);
    if(account && connected)
      history.push("/pools");
    else 
      history.push("/");
  }, [account, connected, history]);

    return (
      <>
        <Navbar />
        <Hero />
        <Modal />
      </>
    );
}

export default Home
