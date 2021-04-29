import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/student.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
import useSWR, {mutate } from 'swr';
import Head from "next/head";
import Layout from "../components/layout";

const URL = `http://localhost/api/cars`;

const fetcher = url => axios.get(url).then(res => res.data);

const caredit = ({ token }) => {

  const {data} = useSWR(URL,fetcher);
  const [cars, setCars] = useState({});
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState(0);
  const [scr, setScr] = useState('http://pngimg.com/uploads/ferrari/ferrari_PNG10679.png');
  const [car, setCar] = useState({});

  if(!data){
    console.log(data);
    return <div><h1>Loading...</h1></div>
  }

  const getcar = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('car id: ', result.data)
    setCar(result.data)
    mutate(URL);
}
 
  const getCars = async () => {
    let result = await axios.get(`${URL}`);
    mutate(URL);
  };

  const addCar = async (brand,model,color,price,scr) => {
    let car = await axios.post(URL, {
      brand,
      model,
      color,
      price,
      scr
    });
    console.log(car.data);
    mutate(URL);
  };

  const deleteCar = async (id) => {
    let result = await axios.delete(`${URL}/${id}`,{
      brand,
      model,
      color,
      price,
      scr,
    });
    setCars(car.data);
    mutate(URL);
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
    mutate(URL);
  };

  const showCars = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div>
          <div><img src={item.src} alt="Car" width={200} height={200}></img></div><br/>
          <div className={styles.listItem} key={index}>
            <b>Brand:</b> {item.brand} <br />
            <b>Model:</b> {item.model} <br />
            <b>Color:</b> {item.color} <br />
            <b>Price:</b> {item.price} ฿.<br />
            <b>Url Image:</b> {item.src}<br />
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
    } 
  };
  return (
    <Layout>
      <Head>
        <title>Admin Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
        <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
      </Head>
      <Navbar />
      <div className={styles.container}>
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
        Url Image:
        <input
          type="text"
          name="picture"
          onChange={(e) => setScr(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addCar(brand, model, color, price, scr)}
        >
          Add New Car
        </button>
      </div>

      <div className={styles.list}>{showCars()}</div>
      <div>
        <div className={styles.list1}><b><i><ins>(selected car)</ins></i></b> <b> &nbsp;Brand:</b>{car.brand}<b>&nbsp;Model:</b>{car.model} <b>&nbsp;Color:</b>{car.color}&nbsp;<b>Price:</b>{car.price} ฿.</div>
      </div>
    </div>
    </Layout>
  );
};

export default withAuth(caredit);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
