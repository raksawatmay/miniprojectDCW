import styles from '../styles/navbar.module.css'

const Navbar = () => (
    <div className={styles.topbar}>
    <ol className={styles.navbar}>
        <li className={styles.text}><a href="/"><i className="fa fa-home" ></i>&nbsp;<b>CarShop</b></a></li>
        <li><a href="/home"><b>CarStore</b></a></li>
        <li><a href="/register"><i className="fa fa-edit" ></i>&nbsp;<b>Register</b></a></li>
        <li><a href="/login"><i className="fa fa-sign-in"></i>&nbsp;<b>Login</b></a></li>
        <li><a href="/profile">&nbsp;<b>Profile</b></a></li>
        <li><a href="/admin">&nbsp;<b>Admin</b></a></li>
        <li><a href="/getConfig">&nbsp;<b>Config</b></a></li>
        <li className={styles.right}><a href="/logout"><b>Logout</b>&nbsp;<i className="fa fa-sign-out" ></i></a></li>
    </ol>
    </div>
)

export default Navbar