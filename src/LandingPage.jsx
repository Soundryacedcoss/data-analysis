import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { dataProvider } from "./App";
export const LandingPage = () => {
  const data = useContext(dataProvider);
  const [ci, setCi] = useState([]);
  const [bill, setBill] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [click, setClick] = useState(false);
  useEffect(() => {
    let temp = data.data.map((val) => val.CustomerID);
    temp = [...new Set(temp)];
    let unique = temp.map((val) => parseInt(val));
    let uniqueId = unique.filter((item) => JSON.stringify(item).length === 5);
    setCi(uniqueId);
  }, [data.data]);
  const SelectHandler = (e) => {
    setSelectedId(e.target.value);
  };
  const BillHandler = (e) => {
    setClick(true);
    let price = 0;
    let Arr = [];
    for (let i = 0; i < data.data.length; i++) {
      if (`${selectedId}.0` === data.data[i].CustomerID) {
        console.log("hs");
        price += data.data[i].Quantity * data.data[i].UnitPrice;
        var obj = {
          price: data.data[i].UnitPrice,
          quantity: data.data[i].Quantity,
          name: data.data[i].Description,
        };
        Arr.push(obj);
        setInvoiceDetail(Arr);
        setBill(price);
      }
    }
  };
  console.log(invoiceDetail);
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
        {selectedId === "" ? (
          " "
        ) : (
          <>
            <button
              className="btn btn-info mt-5 w-25"
              value={click}
              onClick={BillHandler}
            >
              Generate Bill
            </button>
            {click === true ? (
              <>
                <table
                  className="table table-info table-hover table-striped mt-4"
                  style={{ textAlign: "left" }}
                >
                  <thead className=" table table-primary">
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </thead>
                  <tbody>
                    {invoiceDetail.splice(0, 10).map((val) => (
                      <tr>
                        <td>{val.name}</td>
                        <td>{val.quantity}</td>
                        <td>{val.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="Output mt-5">Bill : {bill}</div>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
};
