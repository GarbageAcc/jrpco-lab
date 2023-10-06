import Table from "./CoinTable";
import React from "react";

const Home = ({ money, setMoney }) => {
  return (
    <div>
      <Table money={money} setMoney={setMoney} />
    </div>
  );
};

export default Home;
