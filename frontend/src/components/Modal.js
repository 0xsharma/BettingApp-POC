import React from "react";
import { useGlobalContext } from "./context";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Portis from "@portis/web3";
import Web3 from "web3";

const Modal = () => {

  const { 
    isModalOpen, 
    closeModal,
    setAccount,
    setConnected
  } = useGlobalContext();

  async function loadPortis() {
    const portis = new Portis('a48d17a8-f418-407e-951c-23ed15677980', 'mainnet');
    const web3 = new Web3(portis.provider);
    window.web3 = web3;
  }

  async function loadMetamask() {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    setConnected(true);
  }

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <h3 className="connect">Connect Wallet</h3>
        <button className="close-modal-btn" onClick={closeModal}>
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
        </button>
        <hr/>
        <button 
          className="btn metamask"
          onClick={
            async(e)=>{
              await loadMetamask();
              await loadBlockchainData();
              closeModal();
          }
        }
        >
          Metamask
        </button>

        <button 
          className="btn portis"
          onClick={
            async(e)=>{
              await loadPortis();
              await loadBlockchainData();
              closeModal();
            }
          }
        >
          Portis
        </button>

      </div>
    </div>
  );
};
export default Modal;
