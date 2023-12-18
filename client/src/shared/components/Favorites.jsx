import styles from "./Favorites.module.scss";
const Favorites = ({ fav, closeFav, handleDeleteFav }) => {
  return (
    <div className={styles.full}>
      <div className={styles.cart}>
        <h2 className={styles.title}>Your favorites</h2>
        <button className={styles.close} onClick={closeFav}>
          X
        </button>
        {fav.map((item, index) => (
          <div key={index} className={styles.items}>
            <div className={styles.photo}>
              <img
                src={"https://pizza-6a7y.onrender.com/" + item.photo}
                alt="pizza"
              />
            </div>
            <div className={styles.details}>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.size}>size: {item.size} </p>

              <p className={styles.description}>{item.description}</p>
            </div>
            <div className={styles.check}>
              <div className={styles.price}>{item.price} KM</div>
              <button
                className={styles.quantity}
                onClick={() => handleDeleteFav(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        {fav.length > 0 ? (
          <>
            {" "}
            <button className={styles.cta} onClick={closeFav}>
              Close{" "}
            </button>
          </>
        ) : (
          <h4>is empty, Go like some yummy pizzas</h4>
        )}
      </div>
    </div>
  );
};

export default Favorites;
