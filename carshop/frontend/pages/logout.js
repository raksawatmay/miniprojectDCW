import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }
 
    return (
        <Layout>
            <Head>
                <title>Logout Page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
                <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
            </Head> 
            <Navbar />
            <div className={styles.container}>
            <h1><i><ins>Admin Logout</ins></i></h1><br/>
                <div>
                    <h1 className={styles.texth1}>Status: {status}  </h1>
                </div>
            </div>
        </Layout>
    )
}
