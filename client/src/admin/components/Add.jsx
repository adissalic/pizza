import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState({
    name: "",
    description: "",
    price: null,
  }); 
  const show = () => {
    console.log(pizza);
  };
  const handleChange = (e) => {
    setPizza((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", pizza.name);
    formdata.append("description", pizza.description);
    formdata.append("price", pizza.price);
    formdata.append("photo", file);

    axios
      .post("https://pizza-6a7y.onrender.com:8800/add", formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Succeded");
          navigate("/");
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <form typeof="submit" onSubmit={show}>
      <h1>Add New Pizza</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={handleChange}
        name="name"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="description"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
      />
      <input type="file" onChange={handleFile} name="photo" />
      <button onClick={handleClick}>Add</button>
    </form>
  );
};

export default Add;