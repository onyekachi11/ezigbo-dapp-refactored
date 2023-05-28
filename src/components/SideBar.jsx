import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/sidebar.css";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ iconName, title, isActive, url , isMenuOpen,closeMenu,openMenu}) => {
  console.log('menuitem' + closeMenu)
  let menuClass = "menu-item";
  if (isActive) {
    menuClass += " active-menu";
  }
  return (
    <div className={menuClass}>
      <NavLink className="menu-link" to={url} onClick={closeMenu}>
        <FontAwesomeIcon icon={iconName} className="menu-icon" />

        <h1 className="menu-title">{title}</h1>
      </NavLink>
    </div>
  );
};

const SideBar = ({ contract, account, activeLink, isMenuOpen,closeMenu,openMenu }) => {

  const navigate = useNavigate();
  

  // const [isMenuOpen, setIsMenuOpen] =useState(false)

  //   const openMenu = () =>{
  //     setIsMenuOpen(true)
  //     }
     
  //     const closeMenu = () =>{
  //     setIsMenuOpen(false)
  //   }
   console.log('sidebar' +' '+ isMenuOpen +' '+ 'sidebarjsx')
   

  return (
    <React.Fragment>

      
      <div className={`${isMenuOpen ? 'sidebar-container':'sidebar-container closeMenu'}`}>

        <div className="nav-icons">
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-left"
            className="menu-icon"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <FontAwesomeIcon icon="fa-solid fa-xmark" className="menu-icon close-icon" onClick={closeMenu}
          />
        </div>

        <div id="menu-item-container">
          <MenuItem
            iconName={"fa-solid fa-truck"}
            title="Track Products."
            isActive={activeLink === "products"}
            url="/vendor/products"
            closeMenu={closeMenu}
          />
          <MenuItem
            iconName={"fa-solid fa-shirt"}
            title="Add Product."
            isActive={activeLink === "addproduct"}
            url="/vendor/addproduct"
            closeMenu={closeMenu}
          />
          <MenuItem
            iconName={"fa-solid fa-user"}
            title="Distributors."
            isActive={activeLink === "available-distributors"}
            url="/vendor/available-distributors"
            closeMenu={closeMenu}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
