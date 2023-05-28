import React, { useEffect, useState } from "react";
import "../css/distributors.css";
import Title from "./Title";
import MainBar from "./MainBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Distributors({ contract, account, isOpenMenu,closeMenu,openMenu }) {

  // console.log('openMenu'+' ' + openMenu +' ' + 'distributorjsx')
  const navigate = useNavigate();
  const [distributors, setDistributors] = useState([]);

  const getDistributor = async () => {
    try {
      const di = await contract.getAlldistributors();
      console.log(di);

      setDistributors(di);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDistributor();
  }, []);

  return (
    distributors && (
      <MainBar pageTitle="Welcome to manufacturer dashboard" openMenu={openMenu} account={account}>
        <div className="scroll">
        <table className="styled-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {distributors.map((d, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{d.name}</td>
                <td>{d.add}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </MainBar>
    )
  );
}

export default Distributors;
