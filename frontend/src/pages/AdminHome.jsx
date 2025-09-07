import Navbar from '../components/AdminNavbar.jsx';
import {Routes,Route,useLocation} from 'react-router-dom'
import Product from './admin_pages/Modifyproduct.jsx'
import Users from './admin_pages/Users.jsx';
import Orders from './admin_pages/UnshippedOrders.jsx';
import Footer from '../components/Footer.jsx';
import NotFound from './NotFound.jsx';
export default function AdminHome(){
    const location=useLocation()

    const showLayout=["/","/orders",'/users'].includes(location.pathname)
    console.log(showLayout)
    return(
        <>
            {showLayout && <Navbar />}
            <div className="navbar-contents">
                <Routes>
                    <Route path="/" element={<Product />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            {showLayout && <Footer />}
        </>
    )
}