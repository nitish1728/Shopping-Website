import { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'

export default function LogedOut(){
    const [time,setTime]=useState(5);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        },1000)

        return()=>clearInterval(interval);
    },[])
    return(
        <div className="logged-out">
            <h1>Logged Out Successfully</h1>
            <h2>You will be redirect to login page within 0{time} seconds</h2>
            <p>Please click here for immediate login</p>
        </div>
    )
}