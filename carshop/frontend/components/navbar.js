import Link from 'next/link'
const Navbar = () => (
    <div>
        |&nbsp;<Link href="/"><a><i className="fa fa-home" ></i>&nbsp;<b>Home</b></a></Link>&nbsp;|
        &nbsp;<Link href="/register"><a><i className="fa fa-edit" ></i>&nbsp;<b>Register</b></a></Link>&nbsp;|
        &nbsp;<Link href="/login"><a><i className="fas fa-sign-in-alt" ></i>&nbsp;<b>Login</b></a></Link>&nbsp;|
        &nbsp;<Link href="/profile"><a><i className="fas fa-id-badge"></i>&nbsp;<b>Profile</b></a></Link>&nbsp;|
        &nbsp;<Link href="/caredit"><a><i className="fas fa-pen-square" ></i>&nbsp;<b>Car Edit</b></a></Link>&nbsp;|
        &nbsp;<Link href="/getConfig"><a><i className="fas fa-pen" ></i>&nbsp;<b> Config</b></a></Link>&nbsp;| 
        &nbsp;<Link href="/logout"><a><i className="fas fa-sign-out-alt" ></i>&nbsp;<b>Logout</b></a></Link>&nbsp;|
        
    </div>
)

export default Navbar