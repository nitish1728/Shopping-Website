import {Link} from 'react-router-dom'
import './../css/NotFound.css';

export default function NotFound(){
    return(
        <>
            <div className="notfound">
                <h1>Page Not found</h1>
                <h2>You are trying to access a page which is not available</h2>
                <Link to="/">Click here to go to main page</Link>
            </div>
        </>
    )
}