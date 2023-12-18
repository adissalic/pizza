import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pizza from "./user/pages/Pizza";
import Add from "./admin/components/Add";
import Update from "./admin/components/Update";
import Header from "./shared/components/Header";
import { useState } from "react";
import Order from "./user/components/Order";

function App() {
  const [order, setOrder] = useState([]);
  const [fav, setFav] = useState([]);


  const routes = (
    <>
      
      <Route
        path="/"
        exact
        element={<>
          <Header order={order} setOrder={setOrder} fav={fav} setFav={setFav} />
          <Pizza order={order} setOrder={setOrder} fav={fav} setFav={setFav} /> </>
        }
      />
      <Route path="/order/:id" exact element={<Order />} />
      <Route path="/add" exact element={<Add />} />
      <Route path="/update/:id" exact element={<Update />} />
    </>
  );
  return (
    <Router>
      <div className="App">
        <Routes>{routes}</Routes>
      </div>
    </Router>
  );
}

export default App;
