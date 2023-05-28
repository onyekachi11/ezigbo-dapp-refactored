import React, { useState, useEffect } from "react";
// import { QrReader } from "react-qr-reader";
import QRCode, { QRCodeSVG } from "qrcode.react";
import axios from "axios";

import "../css/Authenticate.css";
const Authenticate = ({ account }) => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="cam">
        <h4 style={{ color: "#000"}} className="wallet-addr-txt">
          Wallet Address:{" "}
          {account.substring(0, 4) +
            "..." +
            account.substring(account.length - 4, account.length)}
        </h4>
        <h2>
          Hold QR Code Steady and Clear to Scan
        </h2>
        <div>
        <QRCode
          value={async (result, error) => {
            if (result && result?.text) {
              let data = JSON.parse(result?.text);
              if (data.hash) {
                let res = await axios.get(
                  // `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${data.hash}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
                  'https://twitter.com/home'
                  );
                  if (res) {
                    setMessage("Product is Authenticated ✅");
                    setAuth(true);
                  }
                }
              }
              if (error) {
                console.info(error);
              }
            }}
            style={{ width: "300px", height:"300px" }}
            />
            </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
          }}
         >
          <div>
            <h1>{message}</h1>
          </div>
        </div>
        <div className="qr-footer"
         >
          <h3 style={{fontSize:'20px'}}>
            Please wait for 15 sec if Authentication messages is not appearing
            on the screen then your product is not Authenticated.
          </h3 >
          <br />
          <span > Please reload the page to Scan again.</span>
        </div>
      </div>
    </>
  );
};

export default Authenticate;
