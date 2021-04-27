import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/student.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
import Image from 'next/image';
const URL = "http://localhost/api/cars";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [cars, setCars] = useState({});
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState();
  const [scr, setScr] = useState("");
  const [car, setCar] = useState({});
  useEffect(() => {
    getCars();
    profileUser();
  }, []);
  const profileUser = async () => {
    try {
      
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getcar = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('car id: ', result.data)
    setCar(result.data)
}
 
  const getCars = async () => {
    let result = await axios.get(URL);
    setCars(result.data.list);
  };

  const addCar = async () => {
    let result = await axios.post(URL, {
      brand,
      model,
      color,
      price,
      scr,
    });
    console.log(result);
    getCars();
  };

  const deleteCar = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getCars();
  };

  const updateCar = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      brand,
      model,
      color,
      price,
      scr,
    });
    console.log(result);
    getCars();
  };

  const showCars = () => {
    if (cars && cars.length) {
      return cars.map((item, index) => {
        return (
          <div>
          <div className={styles.listItem} key={index}>
            <b>Brand:</b> {item.brand} <br />
            <b>Model:</b> {item.model} <br />
            <b>Color:</b> {item.color} <br />
            <b>Price:</b> {item.price} <br />
            <div><Image src={item.src} alt="car1" width={150} height={150}/></div>
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getcar(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updateCar(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deleteCar(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
      <Navbar />
      <h1><ins>Car Data Edit </ins></h1>
      <div className={styles.form_add}>
        <h2>Add Cars</h2>
        Brand:
        <input
          type="text"
          name="brand"
          onChange={(e) => setBrand(e.target.value)}
        ></input>
        Model:
        <input
          type="text"
          name="model"
          onChange={(e) => setModel(e.target.value)}
        ></input>
        Color:
        <input
          type="text"
          name="color"
          onChange={(e) => setColor(e.target.value)}
        ></input>
        Price:
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        ></input>
         Picture:
        <input
          type="text"
          name="picture"
          onChange={(e) => setScr(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addCar(brand, model, color, price, scr)}
        >
          Add
        </button>
      </div>

      <div className={styles.list}>{showCars()}</div>
      <div>
        <div className={styles.list1}><b><i><ins>(selected car)</ins></i></b> <b> &nbsp;Brand:</b>{car.brand}<b>&nbsp;Model:</b>{car.model} <b>&nbsp;Color:</b>{car.color}&nbsp;<b>Price:</b>{car.price} </div>
      </div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
