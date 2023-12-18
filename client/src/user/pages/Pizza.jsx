import React from "react";
import Pizzas from "../components/Pizzas";

const Pizza = ({ order, setOrder, fav, setFav }) => {
  return (
    <>
      <Pizzas order={order} setOrder={setOrder} fav={fav} setFav={setFav} />
    </>
  );
};

export default Pizza;
