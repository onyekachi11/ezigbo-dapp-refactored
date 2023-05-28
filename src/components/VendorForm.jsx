import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import styled, { createGlobalStyle } from "styled-components";
import styled from "styled-components";
// import { useForm, useField, splitFormProps } from "react-hook-form";
import { useForm} from "react-hook-form";
import { useTable } from "react-table";
import QRCode from "qrcode.react";
import Modal from "react-modal";
import "./VendorForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";
import MainBar from "./MainBar";


  const TableInput = (props) => {
    console.log("TableInput", props);
    const { column, row, cell, updateData } = props;
    const onChange = (e) => updateData(row.index, column.id, e.target.value);
    return (
      <input
        type="number"
        value={cell.value}
        onChange={onChange}
        className="cell-input"
      />
    );
  };

  const ItemName = (props) => {
    console.log("ItemName", props);
    const { column, row, cell, updateData } = props;
    const onChange = (e) => updateData(row.index, column.id, e.target.value);
    return (
      <input
        type="text"
        value={cell.value}
        onChange={onChange}
        className="cell-input"
      />
    );
  };

  const ReactTable = React.memo((props) => {
    console.log("ReactTable", props);
    const { setAmountDue } = props;
    const columns = React.useMemo(
      () => [
        {
          Header: "Item",
          accessor: "item",
          Cell: ItemName,
        },
        {
          Header: "Item Description",
          accessor: "description",
          Cell: ItemName,
        },
        {
          Header: "Cost (USD)",
          accessor: "cost",
          Cell: TableInput,
        },
        {
          Header: "Quantity",
          accessor: "quantity",
          Cell: TableInput,
        },
        {
          Header: "Total (USD)",
          accessor: (row) => row.cost * row.quantity,
          id: "total",
          cell: ItemName,
        },
      ],
      []
    );
    const initialData = [
      {
        item: "Vaccine",
        description: "Medicine",
        cost: 1,
        quantity: 1,
      },
    ];
    const [data, setData] = React.useState(initialData);
    const resetData = () => setData(initialData);

    const updateData = (rowIndex, columnID, value) => {
      setData((oldData) =>
        oldData.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...oldData[rowIndex],
              [columnID]: value,
            };
          }
          return row;
        })
      );
    };
    const table = useTable({ columns, data, updateData });
    const { getTableProps, headerGroups, rows, prepareRow } = table;
    const tableSum = rows.reduce((sum, row) => sum + row.values.total, 0);
    console.log("setAmountDue", tableSum);
    setAmountDue(tableSum);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [qrcode, setQrcode] = React.useState(null);
    const [hash, setHash] = React.useState(null);
    const [assetMessage, setAssetMessage] = React.useState("Create");
    const [assetModalIsOpen, setAssetModalIsOpen] = React.useState(false);
    const [assetDetails, setAssetDetails] = React.useState([]);

    const closeModal = () => {
      setQrcode(null);
      setIsOpen(false);
    };

    const assetcloseModal = () => {
      setAssetModalIsOpen(false);
    };

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "580px",
        borderRadius: "20px",
        backgroundClip: "text",
      },
    };
    const assetModalStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "350px",
        height: "400px",
        borderRadius: "20px",
        // backgroundClip: "text",
        // fontSize:'15px'
      },
      h2:{
        fontSize:'12px',
        // border: '1px solid black'
      }
    };

    return (
      <>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="QrCode Modal"
          ariaHideApp={false}
        >
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <PaymentQRCode size={500} value={`${qrcode}`}/>
          </div>

          <span
            onClick={closeModal}
            style={{
              position: "absolute",
              top: 3,
              right: 20,
              fontSize: 28,
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </span>
        </Modal>
        <Modal
          isOpen={assetModalIsOpen}
          onRequestClose={assetcloseModal}
          style={assetModalStyles}
          contentLabel="Asset Modal"
          ariaHideApp={false}
        >
          <div style={{ textAlign: "center", marginTop: 10, color: "black"}} className="modal">
            <h2>Name:{assetDetails[0]}</h2>
            <h2>Description:{assetDetails[1]}</h2>
            <h2>Quantity:{assetDetails[8]}</h2>
            <h2>Cost:{assetDetails[7]}</h2>
            <h2>Manufacturer:{assetDetails[2]}</h2>
            <h2>Consumer:{assetDetails[3]}</h2>
            <h2>AddressFrom:{assetDetails[4]}</h2>
            <h2>AddressTo:{assetDetails[5]}</h2>
          </div>

          <span
            onClick={assetcloseModal}
            style={{
              position: "absolute",
              top: 3,
              right: 20,
              fontSize: 28,
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </span>
        </Modal>

        <br />
        <StyledTables {...getTableProps()} className="scroll">
          <thead >
            <tr>
              <td className="label">Item</td>
              <td className="label">Item Description</td>
              <td className="label">Cost (USD)</td>
              <td className="label">Quantity</td>
              <td className="label">Total (USD) </td>
            </tr>
            {/* {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))} */}
          </thead>
          <tbody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
            <tr>
              <td colSpan={3}>
                <button type="button" onClick={resetData} className="btn">
                  Reset Table
                </button>
              </td>
              <td colSpan={2}>
              <button
                type="submit"
                onClick={async (e) => {
                  e.preventDefault()
                  console.log("id:", props.distributorId);
                  console.log(
                    !data[0].item,
                    !data[0].description,
                    !data[0].cost,
                    !data[0].quantity,
                    !props.vendorName,
                    !props.consumerName,
                    !props.vendorAdd,
                    !props.consumerAdd,
                    !props.distributorId
                  );
                  if (
                    !data[0].item ||
                    !data[0].description ||
                    !data[0].cost ||
                    !data[0].quantity ||
                    !props.vendorName ||
                    !props.consumerName ||
                    !props.vendorAdd ||
                    !props.consumerAdd ||
                    props.distributorId<0
                  ) {
                    setAssetMessage("Plese fill all the fields");
                  } else {
                    setAssetMessage("Creating...");
                    // e.preventDefault();
                    console.log(
                      data[0].item,
                      data[0].description,
                      data[0].cost,
                      data[0].quantity,
                      props.vendorName,
                      props.consumerName,
                      props.vendorAdd,
                      props.consumerAdd,
                      props.distributorId
                    );
                    let asset = await props.contract.createAsset(
                      data[0].item,
                      data[0].description,
                      props.distributorId,
                      data[0].cost,
                      data[0].quantity,
                      props.vendorName,
                      props.consumerName,
                      props.vendorAdd,
                      props.consumerAdd
                    );

                    console.log(props.contract.createAsset)
                    await asset.wait();
                    console.log("asset created", asset.hash);
                    setHash(asset.hash);
                    if (asset.hash) {
                      const info = {
                        name: data[0].item,
                        description: data[0].description,
                        distributorId: props.distributorId,
                        cost: data[0].cost,
                        quantity: data[0].quantity,
                        vendorName: props.vendorName,
                        consumerName: props.consumerName,
                        vendorAdd: props.vendorAdd,
                        consumerAdd: props.consumerAdd,
                        hash: asset.hash,
                      };
                      let strData = JSON.stringify(info);
                      setQrcode(strData);
                      try {
                        let distributor = await props.contract.getDistributorbyId(
                          props.distributorId
                        );
                        console.log(distributor[2]);
                        if (distributor[2]) {
                          let body = `Deliver to the given address: ${props.consumerAdd}`;
                          // const options = {
                          //   method: "POST",
                          //   url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
                          //   headers: {
                          //     "content-type": "application/json",
                          //     "X-RapidAPI-Host":
                          //       "rapidprod-sendgrid-v1.p.rapidapi.com",
                          //     "X-RapidAPI-Key":
                          //       process.env.REACT_APP_RAPID_API_KEY,
                          //   },
                          //   data: `{"personalizations":[{"to":[{"email":"${distributor[2]}"}],"subject":"Dispatch Item"}],"from":{"email":"rp589006@gmail.com"},"content":[{"type":"text/plain","value":"${body}"}]}`,
                          // };
                          const options = {
                            method: "POST",
                            url: `https://api.mailslurp.com/sendEmail?apiKey=${process.env.REACT_APP_RAPID_API_KEY}`,
                            
                            // data: `{"personalizations":[{"to":[{"email":"${distributor[2]}"}],"subject":"Dispatch Item"}],"from":{"email":"rp589006@gmail.com"},"content":[{"type":"text/plain","value":"${body}"}]}`,
                            data: {
                              senderId: "mufaddalshakir55@gmail.com",
                              to: distributor[2],
                              subject: "Dispatch Item",
                              body: body,
                            },
                          };
                          axios
                            .request(options)
                            .then(function (response) {
                              console.log("Email Succesfully Send");
                            })
                            .catch(function (error) {
                              console.error("Unable to send the mail");
                            });
                          setAssetMessage("Create");
                          setIsOpen(true);
                        } else {
                          console.log("distributor does not exixts");
                          return;
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    } else {
                      console.log("unable to create asset");
                    }
                  }
                }}
                className="btn"
                // style={{ marginLeft: "40%" }}
              >
                {assetMessage}
              </button>
              </td>
            </tr>
          </tbody>
        </StyledTables>
      </>
    );
  });


  const ReactForm = (props) => {
    console.log("ReactForm", props);
    const navigate = useNavigate();
    const { amountDue, setAmountDue, distributors } = props;
    const defaultValues = React.useMemo(
      () => ({
        name: "Rohit",
        dashAddress: "Kalyan",
        dashAddressto: "Gujrat",
        notes: "Payment terms: Net 30",
      }),
      []
    );
    const onSubmit = async (values, instance) => {
      console.log("Form values:", values);
      instance.reset();
    };
    const form = useForm({ defaultValues, onSubmit });
    const { Form, values, meta } = form;

    const [vendorName, setVendorName] = React.useState("");
    const [vendorAdd, setVendorAdd] = React.useState("");
    const [consumerAdd, setConsumerAdd] = React.useState("");
    const [consumerName, setConsumerName] = React.useState("");
    const [distributorId, setDistributorId] = React.useState(0);

    console.log(props.openMenu)
    return (
      <>
        <FontAwesomeIcon 
        icon="fa-solid fa-bars" 
        onClick={props.openMenu} 
        className="open-icon"
        // style={{ cursor: "pointer", marginTop: 20, color:'black'}}
        />

        <FormStyles >
          <form>
            <aside>
              <section >
                <div className="info-container">
                  <label className="label">
                    Manufacturer :{" "}
                    <input
                      type="text"
                      className="VendorInfo"
                      onChange={(e) => {
                        e.preventDefault();
                        setVendorName(e.target.value);
                      }}
                    />
                  </label>
                  <label className="label">
                    Consumer :{" "}
                    <input
                      type="text"
                      className="VendorInfo"
                      onChange={(e) => {
                        e.preventDefault();
                        setConsumerName(e.target.value);
                      }}
                    />
                  </label>
                  <label className="label">
                    Address From:
                    <input
                      type="text"
                      className="VendorInfo"
                      onChange={(e) => {
                        e.preventDefault();
                        setVendorAdd(e.target.value);
                      }}
                    />
                  </label>
                  <label className="label">
                    Address To:
                    <input
                      type="text"
                      className="VendorInfo"
                      onChange={(e) => {
                        e.preventDefault();
                        setConsumerAdd(e.target.value);
                      }}
                    />
                  </label>
                  <label className="label">
                    Distributors:
                    <select
                      className="VendorInfo"
                      value={distributorId}
                      onChange={(e) => {
                        setDistributorId(e.target.value);
                      }}
                    >
                      {distributors.map((d, i) => (
                        <option key={i} value={i}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </section>
              <section className="amountdue">
                <AmountDue className="amount">Amount Due: {amountDue} USD</AmountDue>
              </section>
            </aside>
            <ReactTable
              setAmountDue={setAmountDue}
              contract={props.contract}
              vendorName={vendorName}
              consumerName={consumerName}
              vendorAdd={vendorAdd}
              consumerAdd={consumerAdd}
              distributorId={distributorId}
            />
            {/* <br /> */}
          </form>
        </FormStyles>
      </>
    );
  };


  const Invoice = (props) => {
    console.log("Invoice", props);
    const [amountDue, setAmountDue] = React.useState(0);

    return (
      <Main>
        <ReactForm
          amountDue={amountDue}
          setAmountDue={setAmountDue}
          account={props.account}
          contract={props.contract}
          distributors={props.distributors}
          openMenu={props.openMenu}
        />
      </Main>
    );
  };

  const VendorForm = (props) => {
    console.log('apps' + props )
    const [distributors, setDistributors] = useState([]);
    const getDistributors = async () => {
      let dis = await props.contract.getAlldistributors();
      console.log("distributors Id: ",dis);
      setDistributors(dis);
    };
    useEffect(() => {
      getDistributors();
    }, []);
    return (
      <div>
        <Invoice
          account={props.account}
          contract={props.contract}
          distributors={distributors}
          openMenu={props.openMenu}
        />
      </div>
    );
  };

export default VendorForm;
// export default VendorForm;


const Main = styled.main`
    border-radius: 5px;
    padding: 10px;

    background: white;
    height: 100vh;
    h2 {
      text-align: center;
    }
  `;

const PaymentQRCode = styled(QRCode)`
padding: 5px;
align-self: flex-end;
`;

const AmountDue = styled.label`
margin-top: 20px;
  font-size: 1em;
  padding: 10px 20px;
  width: 300px;
  text-align: center;
  border-radius: 5px;
  background-image: linear-gradient(
    -45deg,
    rgba(9, 28, 60, 1) 0%,
    rgba(67, 46, 103, 1) 100%
  );
  color:white;
`;

const FormStyles = styled.div`
form {
  /* border: 1px solid black; */
  label{
    color: white;
    margin-bottom: 20px;
  }
  .info-container{
    margin-right: 20px;
    margin-top: 20px;
    border-radius: 5px;
    background-image: linear-gradient(
      -45deg,
    rgba(9, 28, 60, 1) 0%,
    rgba(67, 46, 103, 1) 100%
    );
  }
  input{
    width: 100%;
  }
  aside {
    display: flex;
    justify-content: space-between;
  }
  section {
    flex: 8 1;
    display: flex;
    flex-flow: column nowrap;
  }
}
`;

const StyledTables = styled.table`
border-collapse: collapse;
font-size: 15px;
border: 1px solid red;
th,
td {
  text-align: center;
  border: 1px solid lightgray;
}
th{
  background-image: linear-gradient(
  -45deg,
  rgba(9, 28, 60, 1) 0%,
  rgba(67, 46, 103, 1) 100%
  
);
font-size: 10px;
color: white;
}
`;