import { useState,useEffect } from 'react'
import './css/App.css';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import Home from './pages/Home.jsx';
import api,{ setAuthToken } from './javascript/api.js';
function App() {
  const [role,setRole]=useState('')
  const [user,setUser]=useState('')
  const [isLoggedin,setLoggedIn]=useState(false)
  const [loading, setLoading] = useState(true);
  const [token,setToken]=useState("")
  useEffect(()=>{
    async function fetchData(){
      try{
        const result=await api.get('/fetchAuth')
        if(result.data.isLoggedIn){
          console.log(result.data)
          setUser(result.data.user)
          if(result.data.role==="Admin"){
            setRole("Admin")
            setLoggedIn(true)
          }
          else if(result.data.role==="User")
          {
            setRole("User")
            setLoggedIn(true)
          }
          else{
            setRole("")
            setLoggedIn(false)
          }
        }
        else{
          setRole("")
          setLoggedIn(false)
          setUser("")
        }
      }
      catch(error){
        setRole("")
        setLoggedIn(false)
        setUser("")
      }
      finally {
      setLoading(false);
      }
    }
    fetchData()
  },[])

  useEffect(()=>{
    async function attachToken(){
      try{
        const response=await api.get("/refresh")
        const accessToken=response.data.accessToken
        setAuthToken(accessToken)
        if(isLoggedin)setToken(accessToken)
      }
      catch(error){
        console.log("Refresh Token expired or invalid",error.message)
        await api.post("/logout").catch(() => {});
        Swal.fire("Session expired", "Please log in again", "info");
        setRole("");
        setLoggedIn(false);
        setUser("");
      }
    }
    attachToken()
    const reattachToken=setTimeout(()=>{
      attachToken()
    },14*60*1000)

    return () => clearInterval(reattachToken);
  },[isLoggedin])
  if (loading) return <div>Loading...</div>;
  return (
    <>
      {isLoggedin ? (role === "Admin" ? <AdminHome setLoggedIn={setLoggedIn} setRole={setRole} user={user}/> : <UserHome setLoggedIn={setLoggedIn} setRole={setRole} user={user}/>) : <Home />}
    </>
  )
}

export default App
