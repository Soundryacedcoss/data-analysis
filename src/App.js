import { createContext, useEffect, useState } from "react";
import "./App.css";
import { DetailWithCountry } from "./DetailWithCountry";
import { LandingPage } from "./LandingPage";
import cvg from "./online_retail.csv";
export const dataProvider = createContext();
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(cvg, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.text())
      .then((responseText) => {
        const csvHeader = responseText
          .slice(0, responseText.indexOf("\n"))
          .split(",");
        const csvRows = responseText
          .slice(responseText.indexOf("\n") + 1)
          .split("\n");
        const array = csvRows.map((i) => {
          const values = i.split(",");
          const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
          }, {});
          return obj;
        });
        setData(array);
      });
  }, []);

  return (
    <div className="App">
      <dataProvider.Provider value={{ data, setData }}>
        <LandingPage />
        <DetailWithCountry />
      </dataProvider.Provider>
    </div>
  );
}
export default App;
