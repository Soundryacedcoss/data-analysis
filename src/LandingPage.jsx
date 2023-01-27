import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { dataProvider } from "./App";
export const LandingPage = () => {
  const data = useContext(dataProvider);
  const [ci, setCi] = useState([]);
  const [bill, setBill] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const [productName, setProductName] = useState([]);
  const [selectedDes, setSelectedDes] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  useEffect(() => {
    let temp = data.data.map((val) => val.CustomerID);
    temp = [...new Set(temp)];
    setCi(temp);
    let description = data.data.map((val) => val.Description);
    description = [...new Set(description)];
    setProductName(description);
  }, [data]);
  const SelectHandler = (e) => {
    setSelectedId(e.target.value);
  };
  const BillHandler = () => {
    let price = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (selectedId === data.data[i].CustomerID) {
        price += data.data[i].Quantity * data.data[i].UnitPrice;
        setBill(price);
      }
    }
  };
  const SelectProductHandler = (e) => {
    setSelectedDes(e.target.value);
  };
  const DetailHandler = () => {
    let Quantity = 0;
    let counter = 0;

    for (let i = 0; i < data.data.length; i++) {
      if (selectedDes === data.data[i].Description) {
        let temp = data.data[i].Description;
        Quantity += parseInt(data.data[i].Quantity);
        setTotalQuantity(Quantity);
        counter = counter + 1;
        setTotalOrder(counter);
      }
    }

  };
  return (
    <div>
      <div className="InvoiceContainer">
        <h2>Invoice generation</h2>
        <select name="" id="" class="form-select mt-5" onChange={SelectHandler}>
          <option value="">Chooose</option>
          {ci.map((val) => (
            <>
              <option value={val}>{val}</option>
            </>
          ))}
        </select>
        <button className="btn btn-info mt-5 w-25" onClick={BillHandler}>
          Generate Bill
        </button>
        <div className="Output mt-5">Bill : {bill}</div>
      </div>
      <div className="InvoiceContainer">
        <h2>Order Item details</h2>
        <select
          name=""
          id=""
          class="form-select"
          onChange={SelectProductHandler}
        >
          <option value="">Chooose</option>
          {productName.map((val) => (
            <>
              <option value={val}>{val}</option>
            </>
          ))}
        </select>
        <button className="btn btn-info mt-5 w-25" onClick={DetailHandler}>
          Show Details
        </button>
        <div className="Output mt-5">
          total order is: {totalOrder}
          <br />
          total quantity is:{totalQuantity}
        </div>
      </div>
    </div>
  );
};
