import React, { useEffect, useState } from "react";
import "./Header.scss";
import heart from "../../assets/images/heart.png";
import cart from "../../assets/images/cart.png";
import Cart from "./Cart";
import Favorites from "./Favorites";

const Header = ({ order, setOrder, fav, setFav }) => {
  const [open, setOpen] = useState(false);
  const [openFav, setOpFav] = useState(false);

  const closeCart = () => {
    setOpen(false);
  };
  const closeFav = () => {
    setOpFav(false);
  };
  const handleDelete = (index) => {
    const updatedOrder = order.filter((_, i) => i !== index);
    setOrder(updatedOrder);
  };
    const handleDeleteFav = (index) => {
      const updatedFav = fav.filter((_, i) => i !== index);
      setFav(updatedFav);
    };

  const orderNow = () => {
    setOrder([]);
    setOpen(false);
  };

  useEffect(() => {}, [open, openFav]);
  return (
    <header className="header">
      <div className="info">
        <div>||| </div>
        <h4> PIZZALOVER</h4>
      </div>

      <div
        className="cta"
      >
        <div className="cart"
        onClick={()=>{setOpFav(true)}}
        >
          <div>
            <img src={heart} alt="heart" />
            <div className="items">
              <p>{fav.length}</p>
            </div>
          </div>
        </div>

        <div
          className="cart"
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src={cart} alt="cart" />
          <div className="items">
            <p>{order.length}</p>
          </div>
        </div>
        {openFav && (
          <Favorites fav={fav}  closeFav={closeFav} openFav={openFav} handleDeleteFav={handleDeleteFav} />

        )}
        {open && (
          <Cart
            order={order}
            closeCart={closeCart}
            handleDelete={handleDelete}
            orderNow={orderNow}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
