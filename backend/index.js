import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";

 
const app = express();

const db = mysql.createConnection({
  host: "bm9acxvnp0af9gzhpphz-mysql.services.clever-cloud.com",
  user: "uwa9gpg6gqo1df5h",
  password: "X94e56jENJ9roHIErPnP",
  database: "bm9acxvnp0af9gzhpphz",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the Clever Cloud database:", err);
    return;
  }
  console.log("Connected to the Clever Cloud database");
});
 
app.use(express.json());
app.use(cors());
app.use(express.static("assets"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

/* Posting customer */
app.post("/customers", (req, res) => {
  const values = [
    req.body.order_id,
    req.body.user_name,
    req.body.user_email,
    req.body.user_phone,
    req.body.user_address,
    req.body.user_city,
    req.body.user_message,
    req.body.user_payment,
    req.body.order_status,
    req.body.order_date,
    req.body.total_price,
  ];
  const sql =
    "INSERT INTO customers (`order_id`, `user_name`, `user_email`, `user_phone`,`user_address`,`user_city`,`user_message`,`user_payment`,`order_status`,`order_date`,`total_price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Message: "Database error" });
    }
    return res.json({ Status: "Success" });
  });
});

/* Posting order */
app.post("/ordering", (req, res) => {
  const values = [
    req.body.order_id,
    req.body.pizza_name,
    req.body.pizza_size,
    req.body.pizza_description,
    req.body.pizza_price,
    req.body.order_date,
    req.body.pizza_photo,
    req.body.more_cuts,
  ];
  const sql =
    "INSERT INTO orders (`order_id`, `pizza_name`,`pizza_size`, `pizza_description`, `pizza_price`, `order_date`, `pizza_photo`, `more_cuts`) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Message: "Database error" });
    }
    return res.json({ Status: "Success" });
  });
});

app.get("/customers/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM customers WHERE order_id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/orders/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM orders WHERE order_id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
  
/*Test file upload*/
app.post("/add", upload.single("photo"), (req, res) => {
  const photo = req.file.filename;
  const values = [req.body.name, req.body.description, req.body.price, photo];
  const sql =
    "INSERT INTO pizza (`name`, `description`, `price`, `photo`) VALUES (?, ?, ?, ?)";
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Message: "Database error" });
    }
    return res.json({ Status: "Success" });
  });
});

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

app.get("/:food", (req, res) => {
  const food = req.params.food;
  const q = "SELECT * FROM " + food;
  db.query(q, food, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/pizza/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM pizza WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/pizza/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM pizza WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successsfully");
  });
});

app.put("/pizza/:id", upload.single("photo"), (req, res) => {
  const bookId = req.params.id;

  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.photo,
  ];
  const q =
    "UPDATE pizza SET `name` = ?, `description` = ?, `price` = ?, `photo` = ? WHERE id = ?";
  db.query(q, [...values, bookId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Message: "Database error" });
    }
    return res.json({ Status: "Success" });
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
