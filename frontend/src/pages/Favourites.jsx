import api,{ setAuthToken } from '../javascript/api';
import {useEffect,useState} from 'react'
import Product from '../components/Product';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Favourites(){
    const [favourites,setFavourites]=useState([])
    const [loading, setLoading] = useState(true);
    const [filter,setfilter]=useState('All')
    const [isloggedIn, setIsloggedIn] = useState(false);
    const [cartProducts,setCartProducts]=useState([])
    const navigate = useNavigate();

    useEffect( ()=>{
        async function getUserdetails(){
            try{
                const response=await api.get('/fetchAuth');
                console.log(response.data.isLoggedIn)
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

    async function fetchFavourites(){
        console.log(isloggedIn)
        if (!isloggedIn) {
            setFavourites([]);
            setLoading(false);
            return;
        }
        try{
        const response=await api.get('/favourites/fetch')
        setFavourites(response.data.favourites)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchFavourites()
    },[isloggedIn])

    async function getCartProducts(){
        const response=await api.get('/products/cart/fetch');
        const getProducts=response.data.cartProducts.cart.map(each=>each.product.id)
        console.log(getProducts)
        setCartProducts(getProducts)
    }

    useEffect(()=>{
        getCartProducts()
    },[])
    
    async function addFavorites(id){
        if(isloggedIn){
            const result = await Swal.fire({
                  title: "Remove from favourites?",
                  text: "Liked it once? Keep it in favourites to decide later.",
                  icon: "info",
                  showCancelButton: true,
                  confirmButtonText: "Remove it",
                  cancelButtonText: "Yes, keep it ❤️",
                  cancelButtonColor:"#0d6efd",
                  reverseButtons: true
                });
            
            if (!result.isConfirmed) {
              Swal.fire({
                toast:true,
                position: "top-end",
                title:"Still in favourites 💖",
                text:"Great choice! You can decide later.",
                icon:"info",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: "#f0f9ff",
                color: "#000"          
              });
              return;
            }
        
            Swal.fire({
              title: "Updating...",
              text: "Please wait while we update your favourites",
              allowOutsideClick: false,
              didOpen: () => Swal.showLoading(),
            });
            try{
                await api.patch(`/favourites/update/${id}`);
                Swal.fire({
                    title: "Removed from favourites",
                    text: "You can always add it back later.",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
				fetchFavourites()
            }
            catch(error){
                console.log("Error while updating favourites",error.message)
                Swal.fire("Oops!", "Something went wrong while updating your favourites. Please try again.", "error");
            }
        }
        else{
            Swal.fire({
            title: "Login Required",
            text: "Please login to access favourites",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Go to Login",
            cancelButtonText: "Maybe later",
            cancelButtonColor:"#DC3545"
            }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login");
            }
            });
        }
    }

    async function addCart(id){
        await api.put(`/products/cart/update/${id}`)
        await Swal.fire({
                toast:true,
                position: "top-end",
                title:`${id}`,
                text:"successfully added to cart",
                icon:"info",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: "#f0f9ff",
                color: "#000"          
        });
    }

    function checkOut(id){
    
    }

    function modifyFilter(filteredproduct){
        setfilter(filteredproduct)
    }

    const products = filter === 'All' 
    ? favourites 
    : filter==='clothing'
      ?favourites.filter(each => each.category.includes('Clothing'))
      :favourites.filter(each => each.category === filter);   

    const items=(products && products.length > 0)
        ? products.map(each=>(
            <Product  
                    key={each.id}
                    id={each.id}
                    mongoid={each._id}
                    title={each.title}
                    price={each.price}
                    description={each.description}
                    category={each.category}
                    image={each.image}
                    isFavourite={true}
                    isCart={cartProducts.includes(each.id)}
                    addFavorites={addFavorites}
                    // rating_rate={each.rating.rate}
                    // rating_count={each.rating.count}
                    addCart={addCart}
                    checkOut={checkOut}
            />      
          ))
        : <h3>No favourites found</h3>
    return(
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
                <div className="product-cart"></div>
            </div>
        </>
    )
}