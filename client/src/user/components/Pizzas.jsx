/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./Pizzas.scss";
import heart from "../../assets/images/heart.png";
import cart from "../../assets/images/cart.png";

const Pizzas = ({ order, setOrder, fav, setFav }) => {
  const [pizzas, setPizza] = useState([]);
  const [size, setSize] = useState("");
  const [activePizza, setActivePizza] = useState([]);
  const [imageClass, setImageClass] = useState("");
  const [rotationClass, setRotationClass] = useState("");
  const [defaultRotation, setRotation] = useState(40);
  const svgContainerRef = useRef(null);
  const rotatingSvgRef = useRef(null);
  let rotationAngle = 40;
  const minRotationAngle = -50;
  const maxRotationAngle = 50;
  const scrollSpeed = 1;

  // Function to clamp a value between a minimum and maximum
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // Function to rotate the SVG on scroll
  function rotateSVG(e) {
    rotationAngle += e.deltaY * scrollSpeed;
    rotationAngle = clamp(rotationAngle, minRotationAngle, maxRotationAngle);
    rotatingSvgRef.current.style.transform = `rotate(${rotationAngle}deg)`;
  }
  useEffect(() => {
    const fetchAllPizza = async () => {
      try {
        const res = await axios.get("https://pizza-6a7y.onrender.com/pizza");
        setPizza(res.data);
        if (!pizzas.length > 0) {
          setActivePizza(res.data[0]);
          setRotation(res.data.length * 10);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPizza();
  }, [pizzas.length]);

  useEffect(() => {
    if (size === "S") {
      setImageClass("S");
      activePizza.size = "S";
      activePizza.price = activePizza.priceS;
    } else if (size === "M") {
      setImageClass("M");
      activePizza.size = "M";
      activePizza.price = activePizza.priceM;
    } else if (size === "L") {
      setImageClass("L");
      activePizza.size = "L";
      activePizza.price = activePizza.priceL;
    } else {
      setSize("M");
      activePizza.size = "M";
      activePizza.price = activePizza.priceM;
    }
  }, [size, activePizza, pizzas]);

  useEffect(() => {
    setRotationClass("rotate");
    const rotationTimeout = setTimeout(() => {
      setRotationClass("defrotate");
    }, 5000);
    return () => {
      clearTimeout(rotationTimeout);
    };
  }, [activePizza]);

  /*
  const deleteBook = async (id) => {
    try {
      await axios.delete("http://localhost:8800/pizza/" + id);
      setPizza(pizzas.filter((pizza) => pizza.id !== id));
    } catch (err) {
      console.log(err);
    }
  };*/

  return (
    <div className="pizza">
      <div className="pizza-wrap">
        <div className="pizza-info">
          <h2>{activePizza.name} pizza</h2>
          <p>{activePizza.description}</p>
        </div>
        <div className="pizza-size">
          <h3>Select size</h3>
          <div className="sizes">
            {size && (
              <>
                <div
                  className={size === "S" ? "active" : "not-active"}
                  onClick={() => {
                    setSize("S");
                    activePizza.size = "S";
                  }}
                >
                  <h4>S</h4>
                </div>
                <div
                  className={size === "M" ? "active" : "not-active"}
                  onClick={() => {
                    setSize("M");
                    activePizza.size = "M";
                  }}
                >
                  <h4>M</h4>
                </div>
                <div
                  className={size === "L" ? "active" : "not-active"}
                  onClick={() => {
                    setSize("L");
                    activePizza.size = "L";
                  }}
                >
                  <h4>L</h4>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="pizza-price">
          <h2>{activePizza.price}€</h2>
          <div
            className="cart"
            onClick={() => {
              const newActivePizza = { ...activePizza };
              newActivePizza.time = new Date().toUTCString();
              newActivePizza.size = size;
              // Add the newActivePizza to the order array
              setOrder((prevOrder) => [...prevOrder, newActivePizza]);
            }}
          >
            <img src={cart} alt="cart " />
          </div>
        </div>
      </div>
      <div className="pizza-extras">
        <div className="toping">
          {" "}
          <span>+</span>
          <h3
            onClick={() => {
              activePizza.cut = "Yes";
            }}
          >
            {" "}
            cut on more slices
          </h3>
        </div>
        <div
          className="favorites"
          onClick={() => {
            const newFavorite = { ...activePizza };
            newFavorite.time = new Date().toUTCString();
            newFavorite.size = size;
            // Add the newActivePizza to the order array
            setFav((prevOrder) => [...prevOrder, newFavorite]);
          }}
        >
          <h3> Save to Favorites</h3>
          <img src={heart} alt="heart" />
        </div>
      </div>
      <div className="pizza-type" ref={svgContainerRef} onWheel={rotateSVG}>
        <svg
          style={{ rotate: defaultRotation + "deg" }}
          ref={rotatingSvgRef}
          viewBox="0 0 
        100 100"
        >
          {" "}
          <path id="curve" fill="transparent" d="M2,50 A1 1 0 0 1 100,52" />
          {pizzas.length > 0 &&
            pizzas.map((pizza, index) => {
              let offset = 0;
              for (let i = 0; i < index; i++) {
                offset += pizzas[i].name.length * 2 + 5;
              }

              return (
                <text
                  key={index}
                  onClick={() => {
                    setActivePizza(pizza);
                    setSize();
                  }}
                >
                  <textPath xlinkHref="#curve" startOffset={offset}>
                    <a
                      className={
                        activePizza.name === pizza.name ? "active" : ""
                      }
                      href="#"
                    >
                      {pizza.name}
                    </a>
                  </textPath>
                </text>
              );
            })}
        </svg>
      </div>
      <div className="arcs">
        <div className="large"></div>
        <div className="medium"></div>
      </div>
      <div className={"pizza-photo"}>
        <div className={`${rotationClass}`}>
          <img
            key={activePizza.photo + size}
            className={imageClass}
            src={"https://pizza-6a7y.onrender.com/" + activePizza.photo}
            alt="Margherita"
          />
        </div>
      </div>
    </div>
  );
};
export default Pizzas;
