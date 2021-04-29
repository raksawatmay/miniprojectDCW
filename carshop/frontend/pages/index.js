import Head from 'next/head' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css' 
import { animated } from "react-spring";
import React from 'react';
import YouTube from 'react-youtube-embed';

const Index = ({ token }) => {
    
  return (
   <div>
    <Head>
        <title>Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    </Head>
    <Navbar />
    <div className={styles.container}>
    <div className={styles.title}>
    <marquee bgcolor="#FFCCCC" direction="lefe" scrollamount="5" width="100%" height="60px"><ins>Welcome to CarShop</ins></marquee></div>
      <div className={styles.showvideo}>
        <h1><center><b>Product Launch (BMW M8)</b></center></h1> <br/>
          <animated.div >
            <center>
              <div className={styles.video}><YouTube id='3N3qYZCMVYM' ></YouTube></div> 
              <h2><ins>#New Product 2021</ins></h2>
            </center> 
          </animated.div>
      </div><br/><br/>   
    </div>
    </div>
  )
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}

export default Index;

