import "./App.css";

import React, { useEffect, useState } from "react";

import VendorForm from "./components/VendorForm";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DistributorForm from "./components/DistributorForm";
import Home from "./components/Home";
import AssetTracker from "./utils/AssetTracker.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Products from "./components/TrackProducts";
import Distributors from "./components/Distributors";
import Authenticate from "./components/Authenticate";
import GetStarted from "./components/getStarted";
import HeroIllustration from './assets/hero-illustration.jpg';


const CONTRACT_ADDRESS = '0x4838854e5150E4345Fb4Ae837E9FcCa40D51F3Fe';
// const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADD;

library.add(fas);

const App = () => {
  // console.log(process.env.REACT_APP_WALLET_ADD);
  const [currentAccount, setCurrentAccount] = useState("");
  const [wallet, setWallet] = useState("Get Started");
  const [contract, setContract] = useState(false);
  const [isMenuOpen, setIsMenuOpen] =useState(false)

  const openMenu = () =>{
      setIsMenuOpen(true)
      }
     
      const closeMenu = () =>{
      setIsMenuOpen(false)
  }


  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];

      console.log("Found an authorized account:", account);
      setWallet("Connected");

      setCurrentAccount(account);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        AssetTracker.abi,
        signer
      );
      console.log("contract", contract);
      setContract(contract);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);

      setWallet("Connected");

      setCurrentAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        AssetTracker.abi,
        signer
      );
      setContract(contract);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // checkIfWalletIsConnected();
  }, []);

   return (
    <>
      {contract ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home account={currentAccount} />}></Route>
            
            <Route
              path="/vendor"
              element={
                <GetStarted contract={contract} account={currentAccount} isMenuOpen={isMenuOpen} closeMenu={closeMenu} openMenu={openMenu} />
              }
            >
              <Route
                path="products"
                element={
                  <Products contract={contract} account={currentAccount} isMenuOpen={isMenuOpen} closeMenu={closeMenu} openMenu={openMenu}/>
                }
              ></Route>
              <Route
                path="addproduct"
                element={
                  <VendorForm contract={contract} account={currentAccount} isMenuOpen={isMenuOpen} closeMenu={closeMenu} openMenu={openMenu} />
                }
              />
              <Route
                path="available-distributors"
                element={
                  <Distributors contract={contract} account={currentAccount} isMenuOpen={isMenuOpen} closeMenu={closeMenu} openMenu={openMenu} />
                }
              />
            </Route>
            <Route
              path="/distributorform"
              element={
                <DistributorForm contract={contract} account={currentAccount} isMenuOpen={isMenuOpen} closeMenu={closeMenu} openMenu={openMenu}/>
              }
            ></Route>
            <Route
              path="/authenticate"
              element={
                <Authenticate contract={contract} account={currentAccount} isMenuOpen={isMenuOpen} closeMenu={closeMenu} openMenu={openMenu} />
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <div>
          <header className="landing-page-header" >
            <h3>Ezigbo Dapp</h3>
            <div className="connectWalletContainer">
              {wallet === "Get Started" && (
                <button onClick={connectWallet} className="connectWalletBtn">
                  <img
                    src={
                      "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                    }
                    className="img"
                    alt="metamask"
                  />{" "}
                  {wallet}
                </button>
              )}
            </div>
          </header>
          <div className="hero-section">
            <div className="hero-text">
            <h1>
              Welcome to ezigbo dapp. A blockchain asset tracker.
            </h1>

            <div className="connectWalletContainer hero-btn">
              {wallet === "Get Started" && (
                <button onClick={connectWallet} className="connectWalletBtn">
                  <img
                    src={
                      "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                    }
                    className="img"
                    alt="metamask"
                    />{" "}
                  {wallet}
                </button>
              )}
            </div>
            </div>
            <div className="hero-img"> 
              <img src={HeroIllustration} alt="" />
            </div>
          </div>

          <div className="services">
            <h2>
              Services
            </h2>

            <div className="services-cards-container">
            <div className="services-cards">
              <h3>
              Manufacturer
              </h3>
              <p>
              Manufacturer has the right to create the asset and based upon the unique hash returned after the transaction unique Qrcode is genereted which contains asset details and the unique hash of the asset.
              </p>
            </div>
            <div className="services-cards">
              <h3>
              Distributor
              </h3>
              <p>
              Distributor just need to register himself on the platform,no further functionalities is provided to the distributor,after the manufacturer create the asset he/she assign the registered distributor along with it,then selected distributor recieves the mail regarding the same to deliver the order.
              </p>
            </div>
            <div className="services-cards">
              <h3>
              Authentication
              </h3>
              <p>
              The distributor or the consumer can check wether the product is authenticate or not… Simply by proceeding to the authentication page where the Distributor or Consumer can scan the Qrcode pasted on the product and check for the authenticity of the product.
              </p>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;



{/* <Route
              path="/vendor"
              element={<SideBar contract={contract} account={currentAccount} />}
            ></Route> */}



{/* <Route
              path="/vendor/products"
              element={
                <Products contract={contract} account={currentAccount} />
              }
            ></Route>
            <Route
              path="/vendor/addproduct"
              element={
                <VendorForm contract={contract} account={currentAccount} />
              }
            />
            <Route
              path="/vendor/available-distributors"
              element={
                <Distributors contract={contract} account={currentAccount} />
              }
            /> */}





{/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home  />}></Route>
            <Route
              path="/vendor"
              element={<SideBar contract={contract} account={currentAccount} />}
            ></Route>
            <Route
              path="/vendor"
              element={
                <GetStarted/>
              }
            >
              <Route
                path="products"
                element={
                  <Products  />
                }
              ></Route>
              <Route
                path="addproduct"
                element={
                  <VendorForm   />
                }
              />
              <Route
                path="available-distributors"
                element={
                  <Distributors   />
                }
              />
            </Route>
            <Route
              path="/distributorform"
              element={
                <DistributorForm  />
              }
            ></Route>
            <Route
              path="/vendor/products"
              element={
                <Products contract={contract} account={currentAccount} />
              }
            ></Route>
            <Route
              path="/vendor/addproduct"
              element={
                <VendorForm contract={contract} account={currentAccount} />
              }
            />
            <Route
              path="/vendor/available-distributors"
              element={
                <Distributors contract={contract} account={currentAccount} />
              }
            />
            <Route
              path="/authenticate"
              element={
                <Authenticate />
              }
            />
          </Routes>
        </BrowserRouter> */}