import React from "react";
import "../css/mainBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainBar = ({ pageTitle, children, account,isOpenMenu,closeMenu,openMenu }) => {
  return (
    <div id="box-container">
      <FontAwesomeIcon icon="fa-solid fa-bars" onClick={openMenu} className="open-icon"
       />
       <h4 className="wallet-addr-txt">
          Wallet Address:
          { " " + account.substring(0, 4) +
          "..." +
          account.substring(account.length - 4, account.length)}
      </h4> 
      <div id="page-desc-container">
        <h1 id="page-title">{pageTitle}</h1>
      </div>
      {children}
    </div>
  );
};

export default MainBar;
