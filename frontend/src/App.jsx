import { useState,useEffect } from 'react'
import './css/App.css';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import Home from './pages/Home.jsx';
import api,{ setAuthToken } from './javascript/api.js';
function App() {
  const [role,setRole]=useState('')
  const [isLoggedin,setLoggedIn]=useState(false)
  const [loading, setLoading] = useState(true);
  const [token,setToken]=useState("")
  useEffect(()=>{
    async function fetchData(){
      try{
        const result=await api.get('/fetchAuth')
        if(result.data.isLoggedIn){
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
        }
      }
      catch(error){
        setRole("")
        setLoggedIn(false)
      }
      finally {
      setLoading(false);
      }
    }
    fetchData()
  },[])

  useEffect(()=>{
    async function attachToken(){
      const response=await api.get("/refresh")
      const accessToken=response.data.accessToken
      setAuthToken(accessToken)
      if(isLoggedin)setToken(accessToken)
    }
    attachToken()
    const reattachToken=setTimeout(()=>{
      attachToken()
    },14*60*1000)

    return () => clearInterval(reattachToken);
  },[])
  if (loading) return <div>Loading...</div>;
  return (
    <>
      {isLoggedin ? (role === "Admin" ? <AdminHome /> : <UserHome />) : <Home />}
    </>
  )
}

export default App
