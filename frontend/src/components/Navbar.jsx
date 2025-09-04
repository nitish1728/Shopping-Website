import React from 'react'
import {Link} from "react-router-dom"

export default function Navbar(){
    return(
        <>
            <div className="navbar">
                <div className="navbar-logo">
                    <h2>Nitshhop</h2>
                </div>
                <div className="navbar-buttons">
                    <nav>
                        <ul>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to ="/orders">Orders</Link></li>
                            <li><Link to ="/users">Users</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}