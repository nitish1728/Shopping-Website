import React from 'react'
import {Link,useNavigate } from "react-router-dom"
import './../css/Admin-CSS/AdminNavbar.css';
import api,{ setAuthToken } from './../javascript/api.js';
export default function AdminNavbar(){
    const navigate=useNavigate()
    async function handleLogout(){
        await api.post('/logout')
        console.log("Log Out")
        navigate('/')
        location.reload()
    }
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
                            <li><Link to ="/orders">Orders</Link></li>
                            <li><Link to ="/users">Users</Link></li>
                            <button onClick={handleLogout}>Log Out</button>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}