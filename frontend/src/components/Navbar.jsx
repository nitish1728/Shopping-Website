import './../css/Navbar.css';
import {NavLink} from "react-router-dom"
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
                            <li>
                                <NavLink 
                                    to="/"
                                    className={({isActive})=>isActive?"active-link":""}
                                >Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/register"
                                    className={({isActive})=>isActive?"active-link":""}
                                >Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/login"
                                    className={({isActive})=>isActive?"active-link":""}
                                >Log in
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}