import "./App.css";
import React from "react";
import NavRoutes from "../src/components/Routes";
import Navigationbar from "./components/NavBar";
import { useState, useEffect } from "react";

function App() {
  const [money, setMoney] = useState();
  useEffect(() => {
    var mon = localStorage.getItem("money");
    if (mon == null) {
      localStorage.setItem("money", 1000000);
      setMoney(mon);
    } else {
      setMoney(mon);
    }
  }, []);
  return (
    <div className="App">
      <Navigationbar money={money} setMoney={setMoney} />
      <NavRoutes money={money} setMoney={setMoney} />
    </div>
  );
}

export default App;
