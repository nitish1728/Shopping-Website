import Navbar from '../components/UserNavbar'
import Product from './Mainprdpage'
import {Routes,Route} from 'react-router-dom'
import NotFound from './NotFound.jsx';
export default function UserHome(){
    return(
        <>
            <Navbar />
            <div className="navbar-contents">
                <Routes>
                    <Route path="/" element={<Product />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    )
}