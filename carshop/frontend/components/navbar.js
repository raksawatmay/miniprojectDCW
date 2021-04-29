import styles from '../styles/navbar.module.css'

const Navbar = () => (
    <div className={styles.topbar}>
    <ol className={styles.navbar}>
        <li className={styles.text}><a href="/"><i className="fa fa-home" ></i>&nbsp;<b>CarShop</b></a></li>
        <li className={styles.text1}><a href="/carstore"><i className="fas fa-archive"></i>&nbsp;<b>CarStore</b></a></li>
        <li className={styles.text2}><a href="/register"><i className="fa fa-edit" ></i>&nbsp;<b>Register</b></a></li>
        <li className={styles.text3}><a href="/login"><i className="fa fa-sign-in"></i>&nbsp;<b>Login</b></a></li>
        <li className={styles.text4}><a href="/profile"><i className="far fa-address-card"></i>&nbsp;<b>Profile</b></a></li>
        <li className={styles.text5}><a href="/admin"><i className="fas fa-user-cog"></i>&nbsp;<b>Admin</b></a></li>
        <li className={styles.text6}><a href="/getConfig"><i className="far fa-question-circle"></i>&nbsp;<b>Config</b></a></li>
        <li className={styles.right}><a href="/logout"><b>Logout</b>&nbsp;<i className="fa fa-sign-out" ></i></a></li>
    </ol>
    </div>
)

export default Navbar