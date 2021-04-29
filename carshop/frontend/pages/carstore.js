import Head from 'next/head';
import Layout from '../components/layout';
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, {  } from "react";
import styles from "../styles/Home.module.css";
import style from "../styles/Index.module.css";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/cars";
const URL_SEL = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
  
  const carstore = ({token}) => {
    const {data} = useSWR(URL,fetcher);

    if(!data){
      console.log(data);
      return <div><h1>Loading...</h1></div>
    }

  const buyCar = async (id) => {
    let result = await axios.post(`${URL_SEL}/${id}`)
    mutate(URL, data);
  }

  const showCars = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div>
            <div className={styles.showstore}>
            <div><img src={item.src} alt="Car" width={200} height={200}></img></div><br/>
          <div className={style.listItem} key={index}>
            <div><b>Brand:</b> {item.brand}</div>
            <div><b>Model:</b> {item.model}</div>
            <div><b>Color:</b> {item.color}</div>
            <div><b>Price:</b> {item.price}  ฿.</div>
            <div><b>Url Image:</b> {item.src}</div>
            <div><center><button className={styles.btn} onClick={() => buyCar(item.id)}>Buy</button></center></div>
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
        <title>Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    </Head>
    <Navbar />
    <div className={styles.container}>
      <div className={styles.title}>
      <h1 className={style.text}><ins>CarShop</ins></h1></div>
      <div className={style.list}>
        {showCars()}
      </div>
    </div>
    </Layout>
  );
};

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

export default carstore;
