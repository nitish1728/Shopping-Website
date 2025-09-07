import Navbar from '../components/Navbar.jsx';

import {Routes,Route,useLocation} from 'react-router-dom'
import Product from './Mainprdpage.jsx'
import Register from './Register.jsx';
import Login from './Login.jsx';
export default function Home(){
    return(
        <>
            <Navbar />
            <div className="navbar-contents">
                <Routes>
                    <Route path="/" element={<Product />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </>
    )
}