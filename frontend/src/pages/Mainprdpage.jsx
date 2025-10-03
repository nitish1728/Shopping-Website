import { useEffect, useState } from 'react';
import Product from '../components/Product'
import './../css/Home.css';
import axios from 'axios'
import api,{ setAuthToken } from './../javascript/api.js';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Mainprdpage() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,setfilter]=useState('All')
  const [Favourites,setFavourites]=useState([]);
  const [isloggedIn, setIsloggedIn] = useState(false);
   const navigate = useNavigate();

  useEffect( ()=>{
    async function getUserdetails(){
      try{
        const response=await api.get('/fetchAuth');
        if(response.data.isLoggedIn){
          setIsloggedIn(true)
        }
        else{
          setIsloggedIn(false)
        }
      }
      catch(error){
          console.error("Auth check failed:", error.message);
          setIsloggedIn(false);
      }
    }
    getUserdetails()
  },[])

  const getProducts = async () => {
    try {
      const res = await api.get("/product/fetch");
      setMessage(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getProducts();
  }, []);

  const getFavourites=async () =>{
    if (isloggedIn) {
      try {
        const response = await api.get("/favourites/fetch");
        setFavourites(response.data.favourites.map(each => each._id));
      } catch (err) {
        console.error("Error fetching favourites:", err.message);
      }
    } else {
      setFavourites([]); // clear favourites if logged out
    }
  }
  
  useEffect(()=>{
    getFavourites()
  },[isloggedIn])

  console.log(message)
  function modifyFilter(filteredproduct){
    setfilter(filteredproduct)
  }
  const products = filter === 'All' 
    ? message 
    : filter==='clothing'
      ?message.filter(each => each.category.includes('Clothing'))
      :message.filter(each => each.category === filter);    
  
  async function addFavorites(id){
    if(isloggedIn){
      try{
        const response=await api.patch(`/favourites/update/${id}`);
        setFavourites(response.data.map(each => each._id));
      }
      catch(error){
        console.log("Error while updating favourites",error.message)
      }
    }
    else{
        Swal.fire({
        title: "Login Required",
        text: "Please login to access favourites",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        cancelButtonColor:"#DC3545"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login"); // 👈 redirect
          }
        });
    }
  }

  const items=(products && products.length > 0)
    ?products.map(each=>(
        <Product  
              key={each.id}
              id={each.id}
              mongoid={each._id}
              title={each.title}
              price={each.price}
              description={each.description}
              category={each.category}
              image={each.image}
              // rating_rate={each.rating.rate}
              // rating_count={each.rating.count}
              isFavourite={Favourites.includes(each._id)}
              addFavorites={addFavorites}
        />      
      ))
    : <h3>No Products Found</h3>
  return (
    <>
      <div>
        <div className="product-page">
          <div className="filter-products">
            <button 
              className={filter==='All'?'active':''} 
              onClick={()=>modifyFilter('All')}>All
            </button>
            <button 
              className={filter==='Electronics'?'active':''} 
              onClick={()=>modifyFilter('Electronics')}>Electronics
            </button>
            <button 
              className={filter==="Clothing"?'active':''} 
              onClick={() => modifyFilter("Clothing")}>Clothing
            </button>
            <button 
              className={filter==='Jewellery'?'active':''} 
              onClick={()=>modifyFilter('Jewellery')}>Jewellery
            </button>
          </div>
          <div className="products">
            {loading?<h2>Loading..</h2>:items}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainprdpage;