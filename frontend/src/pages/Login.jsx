import {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import api,{ setAuthToken } from './../javascript/api.js';
export default function Login(){
    const [user,setUser]=useState('')
    const [pass,setPass]=useState('')
    const [loading,setLoading]=useState('')
    const [token,setToken]=useState('')
    const navigate=useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        try{
            console.log(user,pass)
            const response=await api.post("/login", {
                user,
                pass
            });
            const accessToken=response.data.accessToken
            console.log("nitish")
            setAuthToken(accessToken)
            setToken(response.data.accessToken)
            navigate("/")
            location.reload()
        }
        catch(error){
            console.log(error.message)
            Swal.fire("Error!", "Login Failed. Try again.", "error");
        } 
    }
    return(
        <div className="login">
            <div className="login-description">
                <h4>Welcome to NitShopy </h4>
                <p>Please log in using the form below</p>
            </div>
            <div className="login-inputs">
                <form onSubmit={handleLogin}>
                    <div className="input user">
                        <label htmlFor="user">User Name</label>
                        <input type="text" name="user" id="user" value={user} onChange={(e)=>setUser(e.target.value)}/>
                    </div>
                    <div className="input pass">
                        <label htmlFor="pass">Password</label>
                        <input type="password" name="pass" id="pass" value={pass} onChange={(e)=>setPass(e.target.value)} />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
            <div className="login-footer">
                <span>Don't have an account?</span><Link to="/register">Register</Link>
            </div>
        </div>
    )
}