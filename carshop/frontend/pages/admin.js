import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/admin.module.css'
import useSWR, { mutate } from 'swr';
import withAuth from '../components/withAuth'
import axios from 'axios';

const URL = `http://localhost/api/cars`

const fetcher = url => axios.get(url).then(res => res.data);

const admin = ({ token }) => {
  const {data} = useSWR(URL,fetcher);
  const [cars, setCars] = useState({})
  const [car, setCar] = useState({})
  const [brand, setBrand] = useState(''); 
  const [model, setModel] = useState('');
  const [color, setcolor] = useState('');
  const [price, setPrice] = useState(0);
  const [src, setsrc] = useState('http://pngimg.com/uploads/ferrari/ferrari_PNG10680.png');
  
  if(!data){
      console.log(data);
      return <div><h1>Loading...</h1></div>
  }
  const getCar = async(id)=>{
      let result = await axios.get(`${URL}/${id}`);
      setCar(result.data);
      mutate(URL);
  }

  const getCars=async()=>{
      let result = await axios.get(`${URL}`);
      mutate(URL)
  }
  const addcar = async (brand,model,color,price,src) => {
    let car = await axios.post(URL, { brand,model,color,price,src})
    console.log(car.data);
    mutate(URL)
   
  }
  const updatecar = async (id) => {
    let result = await axios.put(`${URL}/${id}`, { brand,model,color,price,src})
    console.log(result);
    mutate(URL)
  }

  const deletecar = async (id) => {
      let result = await axios.delete(`${URL}/${id}`)
      setCars(car.data)
      mutate(URL)
  }
  

const showcars =()=>{
        if(data.list && data.list.length){
            return(
            <div>
                {data.list.map((item,index)=>{
                    return(
                        <div>
                            <center><div><img src={item.src} alt="Car" width={200} height={200}/></div></center>
                            <div className={styles.listItem} key={index}>
                            <div><b>Brand:</b> {item.brand}</div>
                            <div><b>Model:</b> {item.model} </div>
                            <div><b>Color:</b> {item.color}</div>
                            <div><b>Price:</b> {item.price} ฿</div>
                            <div><b>Url:</b> {item.src}</div>
                            <br></br>
                            <div className={styles.edit_button}>
                            <div><center>
                            <button onClick={() => getCar(item.id)} className={styles.button_get}>Get</button>
                            <button onClick={() => updatecar(item.id)} className={styles.button_update}>Update</button>
                            <button onClick={() => deletecar(item.id)} className={styles.button_delete}>Delete</button>
                            </center></div></div>
                            </div>
                        </div>
                    )
                })}
                </ div>

            )
              }

    }
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
          <br></br>
          <div className={styles.form_add}>
          <h2>Add New Car</h2>
          <label>Brand:</label><input type="text" name="brand" onChange={(e) => setBrand(e.target.value)}/>
          <label>Model:</label><input type="text" name="model" onChange={(e) => setModel(e.target.value)}/>
          <label>Color:</label><input type="text" name="color" onChange={(e) => setcolor(e.target.value)}/>
          <label>Price:</label><input type="number" name="price" onChange={(e) => setPrice(e.target.value)}/>
          <label>Url Image:</label><input type="text" name="src" onChange={(e) => setsrc(e.target.value)}/>
            <br></br>
            <center><button  className={styles.button_add} onClick={() => addcar(brand,model,color,price,src)} >Add New Car</button></center>
         </div>
         <div className={styles.list}>
             <h5>Show Cars</h5>
             {showcars()} 
          </div>
         <div className={styles.list1}>
         <div className={styles.list1}><b><i><ins>(selected car)</ins></i></b> <b> &nbsp;Brand:</b>{car.brand}<b>&nbsp;Model:</b>{car.model} <b>&nbsp;Color:</b>{car.color}&nbsp;<b>Price:</b>{car.price} ฿.</div>
        </div> 
      </div>      
    </Layout>
    )
}

export default withAuth(admin)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}