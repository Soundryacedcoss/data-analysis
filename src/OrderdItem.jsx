import React, { useContext, useEffect, useState } from "react";
import { dataProvider } from "./App";

export const OrderdItem = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [selectedDes, setSelectedDes] = useState("");
  const [productName, setProductName] = useState([]);
  const [click, setClick] = useState(false);
  const data = useContext(dataProvider);
  useEffect(() => {
    let description = data.data.map((val) => val.Description);
    description = [...new Set(description)];
    setProductName(description);
  }, [data]);
  const SelectProductHandler = (e) => {
    setSelectedDes(e.target.value);
  };
  const DetailHandler = () => {
    setClick(true);
    let Quantity = 0;
    let counter = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (selectedDes === data.data[i].Description) {
        // let temp = data.data[i].Description;
        Quantity += parseInt(data.data[i].Quantity);
        setTotalQuantity(Quantity);
        counter = counter + 1;
        setTotalOrder(counter);
      }
    }
  };
  return (
    <div className="InvoiceContainer">
      <h2>Order Item details</h2>
      <select name="" id="" class="form-select" onChange={SelectProductHandler}>
        <option value="">Chooose</option>
        {productName.map((val) => (
          <>
            <option value={val}>{val}</option>
          </>
        ))}
      </select>
      {selectedDes === "" ? (
        " "
      ) : (
        <>
          <button
            value={click}
            className="btn btn-info mt-5 w-25"
            onClick={DetailHandler}
          >
            Show Details
          </button>
          {click === true ? (
            <div className="Output mt-5">
              total order is: {totalOrder}
              <br />
              total quantity is:{totalQuantity}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};
