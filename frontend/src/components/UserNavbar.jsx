import { NavLink,useNavigate} from "react-router-dom";
import api,{ setAuthToken } from './../javascript/api.js';
import Swal from "sweetalert2";
export default function UserNavbar({ setLoggedIn, setRole,user }) {
  const navigate=useNavigate()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    try {
      await api.post("/logout");
      setLoggedIn(false); // update App state
      setRole("");        // clear role
      navigate("/");      // redirect to Home
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Goodbye, ${user}! You have been logged out.`,
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire("Error", "Failed to log out. Please try again.", "error");
    }
  };
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h2>Nitshopy</h2>
      </div>
      <div className="navbar-buttons">
        <nav>
          <ul>
            <li>
              {/* Navlink used instead of link to find the active page in the navbar*/}
              <NavLink 
                to="/"
                className={({isActive})=>isActive?"active-link":""}
              >
              Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/favourites"
                className={({isActive})=>isActive?"active-link":""}
              >
              Favourites
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products/cart"
                className={({isActive})=>isActive?"active-link":""}
              >
              Cart
              </NavLink>
            </li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
