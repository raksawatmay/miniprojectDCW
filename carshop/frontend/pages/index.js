import Head from 'next/head' 
import Layout from '../components/layout' 
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
import Image from 'next/image'
const URL = "http://localhost/api/cars";
const URL_SEL = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const index = () => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  
  const selCar = async (id) => {
    let result = await axios.post(`${URL_SEL}/${id}`)
    mutate(URL, data);
    
  }


  const showCars = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div >
            <div><Image src={item.src} alt="car1" width={150} height={150}/></div>
          <div className={styles.listItem} key={index}>
            <div><b>Brand:</b> {item.brand}</div>
            <div><b>Model:</b> {item.model}</div>
             <div> <b>Color:</b> {item.color} </div>
            <div><b>Price:</b> {item.price}</div>
            
            <div>
            <button
              className={styles.btn}
              onClick={() => selCar(item.id)}
            >
              Select
            </button></div></div></div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <Layout>
       <Head>
        <title>Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    </Head>
    <div className={styles.container}><Navbar />
      <div className={styles.title}>
      <marquee bgcolor="#A9E0B8" direction="lefe" scrollamount="5" width="100%"><ins>Welcome to CarShop</ins></marquee></div>
     
      <div className={styles.list}>
        {showCars()}
  
      </div>
    </div>
    </Layout>
  );
};
export default index;
