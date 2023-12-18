import React, { useRef, useState } from "react";
import styles from "./Cart.module.scss";
import emailjs from "@emailjs/browser";
import axios from "axios";

const Cart = ({ order, closeCart, handleDelete, orderNow }) => {
  const [check, openCheckout] = useState(false);
  const openCheck = () => {
    openCheckout(true);
  };

  const form = useRef();
  let totalPrice = 0;

  order.forEach((item) => {
    totalPrice += item.price;
  });
  function generateId() {
    const currentDateInMilliseconds = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000);
    return `${currentDateInMilliseconds}${randomPart}`;
  }
  function generateDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  let generatedId = generateId();

  const sendEmail = (e) => {
    e.preventDefault();
    let generatedDate = generateDate();
    const setOrdering = async () => {
      try {
        await axios.post("https://pizza-6a7y.onrender.com:8800/customers", {
          order_id: form.current.order_id.value,
          user_name: form.current.user_name.value,
          user_email: form.current.user_email.value,
          user_phone: form.current.user_phone.value,
          user_address: form.current.user_address.value,
          user_city: form.current.user_city.value,
          user_message: form.current.user_message.value,
          user_payment: form.current.user_payment.value,
          total_price: totalPrice,
          order_status: 1,
          order_date: generatedDate,
        });

        for (const item of order) {
          await axios.post("https://pizza-6a7y.onrender.com:8800/ordering", {
            order_id: form.current.order_id.value,
            pizza_name: item.name,
            pizza_size: item.size,
            pizza_description: item.description,
            pizza_price: item.price,
            order_date: generatedDate,
            pizza_photo: item.photo,
            more_cuts: item.cut,
          });
        }

        emailjs
          .sendForm(
            "service_krhvfse",
            "template_1og3e1n",
            form.current,
            "Km95Q4lYds9vJ8d1H"
          )
          .then(
            (result) => {
              console.log(result.text);
              orderNow();
            },
            (error) => {
              console.log(error.text);
            }
          );
      } catch (err) {
        console.log(err);
      }
    };
    setOrdering();
  };

  return (
    <div className={styles.full}>
      <div className={styles.cart}>
        {check ? (
          <div className={styles.checkout}>
            <h2 className={styles.title}>Checkout</h2>
            <form className={styles.form} ref={form} onSubmit={sendEmail}>
              <input type="text" name="user_name" placeholder="Name" required />
              <input
                type="email"
                name="user_email"
                placeholder="E-mail"
                required
              />
              <input
                type="text"
                name="user_address"
                placeholder="Address"
                required
              />
              <input type="text" name="user_city" placeholder="City" required />
              <input
                type="number"
                name="user_phone"
                placeholder="Phone"
                required
              />
              <input
                type="text"
                name="user_message"
                placeholder="Additional message"
              />
              <input readOnly hidden name="total_price" value={totalPrice} />
              <input readOnly hidden name="order_id" value={generatedId} />
              <label>Payment </label>

              <select type="text" name="user_payment" id="payment">
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="paypal" disabled>
                  PayPal
                </option>
              </select>
              <div className={styles.buttons}>
                <button className={styles.cta} onClick={closeCart}>
                  Close{" "}
                </button>
                <button className={styles.cta} type="submit">
                  Order now{" "}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Your cart</h2>
            <button className={styles.close} onClick={closeCart}>
              X
            </button>
            {order.map((item, index) => (
              <div key={index} className={styles.items}>
                <div className={styles.photo}>
                  <img
                    src={"https://pizza-6a7y.onrender.com:8800/" + item.photo}
                    alt="pizza"
                  />
                </div>
                <div className={styles.details}>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.size}>
                    size: {item.size} {item.cut && "+ more cuts"}{" "}
                  </p>

                  <p className={styles.description}>{item.description}</p>
                  <p className={styles.description}></p>
                </div>
                <div className={styles.check}>
                  <div className={styles.price}>{item.price} KM</div>
                  <button
                    className={styles.quantity}
                    onClick={() => handleDelete(index)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            {order.length > 0 ? (
              <>
                {" "}
                <button className={styles.cta} onClick={closeCart}>
                  Close{" "}
                </button>
                <button className={styles.cta} onClick={openCheck}>
                  Checkout{" "}
                </button>
              </>
            ) : (
              <h4>is empty, Go order some yummy pizzas</h4>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
