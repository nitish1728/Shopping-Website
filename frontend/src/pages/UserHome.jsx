import Navbar from '../components/UserNavbar'
import Product from './Mainprdpage'
import LogedOut from './LogedOut.jsx';
import {Routes,Route} from 'react-router-dom'
import NotFound from './NotFound.jsx';
import Favourites from './Favourites.jsx';
import Cart from './Cart.jsx';
export default function UserHome(){
    return(
        <>
            <Navbar />
            <div className="navbar-contents">
                <Routes>
                    <Route path="/logedout" element={<LogedOut />} />
                    <Route path="/" element={<Product />} />
                    <Route path="/favourites" element={<Favourites />} />
                    <Route path="/products/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    )
}