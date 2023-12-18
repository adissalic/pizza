import React, { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const Order = () => {
  const { id } = useParams();
  const [customers, setCustomers] = useState([]);
  const [pizzas, setPizza] = useState([]);

  useEffect(() => {
    const fetchCustomersById = async () => {
      try {
        const res = await axios.get(
          `https://pizza-6a7y.onrender.com:8800/customers/${id}`
        );
        setCustomers(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCustomersById();

    const fetchOrdersById = async () => {
      try {
        const res = await axios.get(
          `https://pizza-6a7y.onrender.com:8800/orders/${id}`
        );
        setPizza(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrdersById();
  }, [id]);

  return (
    <div className={styles.full}>
      <div className={styles.cart}>
        <div className={styles.checkout}>
          {customers.map((customer, index) => (
            <form key={index} className={styles.form}>
              <p>Order status:</p>
              <div className={styles.order}>
                <p className={customer.order_status === 1 && styles.active}>
                  In Accepting
                </p>
                <p className={customer.order_status === 2 && styles.active}>
                  Making pizzas
                </p>
                <p className={customer.order_status === 3 && styles.active}>
                  Delivering
                </p>
                <p className={customer.order_status === 4 && styles.active}>
                  Done
                </p>
              </div>
              <br></br>
              <input readOnly placeholder={customer.user_name}></input>
              <input readOnly placeholder={customer.user_email}></input>
              <input readOnly placeholder={customer.user_phone}></input>
              <input readOnly placeholder={customer.user_address}></input>
              <input readOnly placeholder={customer.user_city}></input>
              <input readOnly placeholder={customer.user_message}></input>
              <input readOnly placeholder={customer.user_payment}></input>
              <input readOnly placeholder={customer.total_price + " €"}></input>
            </form>
          ))}
        </div>
        <p className={styles.pizzas}>Your pizzas</p>
        {pizzas.map((item, index) => (
          <div key={index} className={styles.items}>
            <div className={styles.photo}>
              <img
                src={"https://pizza-6a7y.onrender.com:8800/" + item.pizza_photo}
                alt="pizza"
              />
            </div>
            <div className={styles.details}>
              <h3 className={styles.name}>{item.pizza_name}</h3>
              <p className={styles.size}>size: {item.pizza_size} </p>
              <p className={styles.size}>{item.more_cuts && "+ more cuts"}</p>
            </div>
            <div className={styles.check}>
              <div className={styles.price}>{item.pizza_price} €</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
