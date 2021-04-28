import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'

const GetConfig = () => {
    return (<Layout>
        <Head>
            <title>Get Config</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
            <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
        </Head>
        <div className={styles.container}>
            <Navbar />
            <h2> Get Configuration from ../config/config.js </h2>
            <b>Config: </b> {JSON.stringify(config)}
            <ul>
                <li>npm run dev  (for development mode)</li>
                <li>npm run build; npm run start  (for production mode)</li>
            </ul>
        </div>

    </Layout>)
}

export default GetConfig