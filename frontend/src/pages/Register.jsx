import {useState} from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import {Link} from 'react-router-dom'
import api,{ setAuthToken } from './../javascript/api.js'
export default function Register(){
    const [user,setUser]=useState("")
    const [gmail,setGmail]=useState("")
    const [pass,setPass]=useState("")
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")

    function resetForm(){
        setUser("")
        setGmail("")
        setPass("")
        setError("")
    }

    async function handleRegister(e){
        e.preventDefault()
        try{
            await api.post("/register", {
                user,
                gmail,
                pass
            });
            Swal.fire("Success!",`${user} registered successfully 🎉`, "success")
            resetForm()
        }
        catch(error){
            console.log(error.message)
        } 
    }
    return(
        <div className="register">
            <div className="register-description">
                <h4>Welcome to NitShopy </h4>
                <p>Please register using the form below</p>
            </div>
            <div className="register-inputs">
                <form onSubmit={handleRegister}>
                    <div className="input user">
                        <label htmlFor="user">User Name</label>
                        <input type="text" name="user" id="user" value={user} onChange={(e)=>setUser(e.target.value)}/>
                    </div>
                    <div className="input gmail">
                        <label htmlFor="gmail">Email</label>
                        <input type="email" name="gmail" id="gmail" value={gmail} onChange={(e)=>setGmail(e.target.value)} />
                    </div>
                    <div className="input pass">
                        <label htmlFor="pass">Password</label>
                        <input type="password" name="pass" id="pass" value={pass} onChange={(e)=>setPass(e.target.value)} />
                    </div>
                    <button type='submit'>Register</button>
                </form>
            </div>
            <div className="register-footer">
                <span>Already have an account?</span><Link to="/login">Log in</Link>
            </div>
        </div>
    )
}