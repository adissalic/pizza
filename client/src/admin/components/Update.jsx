import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: "",
    description: "",
    price: null,
    photo: ""
  });
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pizza/" + bookId);
        setBook(res.data[0]);
        setFile(res.data[0].photo)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(book)
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", book.name);
    formdata.append("description", book.description);
    formdata.append("price", book.price);
    formdata.append("photo", file);

    try {
      await axios.put("http://localhost:8800/pizza/" + bookId, formdata);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleFile = async (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <form typeof="submit">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder={book.name}
        onChange={handleChange}
        name="name"
      />
      <input
        type="text"
        placeholder={book.description}
        onChange={handleChange}
        name="description"
      />
      <input
        type="number"
        placeholder={book.price}
        onChange={handleChange}
        name="price"
      />
      <img
        style={{ width: "100px" }}
        src={"http://localhost:8800/" + book.photo}
        alt="cover"
      />
      <input type="file" onChange={handleFile} name="photo" />
      <button onClick={handleClick}>Update</button>
    </form>
  );
};

export default Update;
