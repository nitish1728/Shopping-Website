import './../css/Navbar.css';
import {Link} from "react-router-dom"
export default function Navbar(){
    return(
        <>
            <div className="navbar">
                <div className="navbar-logo">
                    <h2>Nitshopy</h2>
                </div>
                <div className="navbar-buttons">
                    <nav>
                        <ul>
                            <li><Link to="/">Products</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Log in</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}