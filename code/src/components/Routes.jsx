import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Coin from "../pages/Coin";
import NotFound from "../components/NotFound/Error404";

const NavRoutes = ({ money, setMoney }) => (
  <Routes>
    <Route
      exact
      path="/"
      element={<Home money={money} setMoney={setMoney} />}
      render={() => <Home money={money} setMoney={setMoney} />}
    />
    <Route path="Coin/:id" element={<Coin />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default NavRoutes;
