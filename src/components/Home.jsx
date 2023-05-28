import React from "react";
import "../css/home.css";
import { NavLink } from "react-router-dom";
import Qrcode from '../assets/qrcode.jpg'

const Home = ({ account }) => {
  return (
    <div className="container">
      <div id="login-type-container">
        <div className="wallet-div">
        {/* <h4 style={{}}>
          Wallet Address:
          {account.substring(0, 4) +
            "..." +
            account.substring(account.length - 4, account.length)}
        </h4> */}
          </div>
          <h4 className="wallet-addr-txt wallet-div " >
          Wallet Address:
          { " " + account.substring(0, 4) +
          "..." +
          account.substring(account.length - 4, account.length)}
      </h4> 

        {/* <h4 style={{ color: "#000", position: "fixed", right: 8, top: 2 }}>
          wallet Address:
        </h4> */}

        <br />
        <div id="login-type">
          {/* <h1 id="greetings">Welcome to Asset Tracker!</h1> */}
          {/* <h1 id="subtitle-txt">
            A Blockchain Based Fake Product Detection 🕵️‍♀️
          </h1> */}
          <div id="options-container">
            <NavLink to="/vendor" className="select-link">
              <div className="options">
                <img
                  src={Qrcode}
                  alt="manufacturer"
                  className="options-image"
                />
                <h3 className="options-image-caption">Manufacturer Login</h3>
              </div>
            </NavLink>
            <NavLink to="/distributorform" className="select-link">
              <div className="options">
                <img
                  src={Qrcode}
                  alt="manufacturer"
                  className="options-image"
                />
                <h3 className="options-image-caption">Distributor Login</h3>
              </div>
            </NavLink>
            <NavLink to="/authenticate" className="select-link">
              <div className="options">
                <img
                  src={Qrcode}
                  alt="manufacturer"
                  className="options-image"
                />
                <h3 className="options-image-caption">Authenticate Product</h3>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
