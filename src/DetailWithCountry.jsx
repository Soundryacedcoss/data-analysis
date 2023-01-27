import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { dataProvider } from "./App";
export const DetailWithCountry = () => {
  const data = useContext(dataProvider);
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    let country = data.data.map((val) => val["Country\r"]);
    country = [...new Set(country)];
    country = country.filter((item) => isNaN(item));
    setCountryData(country);
  }, [data]);
  const SelectHandler = (e) => {
    setSelectedCountry(e.target.value);
    let Quantity = 0;
    let counter = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (e.target.value === data.data[i]["Country\r"]) {
        Quantity += parseInt(data.data[i].Quantity);
        setTotalQuantity(Quantity);
        counter = counter + 1;
        setTotalOrder(counter);
      }
    }
  };
  return (
    <div className="InvoiceContainer">
      <h2>Country Wise details</h2>
      <select name="" id="" class="form-select mt-5" onChange={SelectHandler}>
        <option value="">Chooose</option>
        {countryData.map((val) => (
          <>
            <option value={val}>{val}</option>
          </>
        ))}
      </select>
      <div className="Output mt-5">
        Total Quantity is:{totalQuantity}
        <br />
        Total Products is:{totalOrder}
      </div>
    </div>
  );
};
