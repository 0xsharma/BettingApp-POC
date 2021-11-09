import React from "react";
import { FiChevronsDown } from "react-icons/fi";
import "./style.css";
import currencies from "../data/currencies.json";

const Dropdown = ({value, setValue}) => {

  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">
          {value?value[0]:"-----"} <FiChevronsDown className="icondrop" />
        </button>
        <div className="dropdown-content">
          {currencies.map((currency, ind) => {
            return (
              <a href="#token1" key={ind} onClick={() => setValue(currency)}>
                {currency[0]}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
