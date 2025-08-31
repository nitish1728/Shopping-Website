import { useEffect, useState } from 'react';
import Product from '../components/Product'
import './../css/Home.css';
import axios from 'axios'


function Mainprdpage() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,setfilter]=useState('All')
  const [Favourites,setFavourites]=useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/product/fetch");
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
  
  console.log(message)
  function modifyFilter(filteredproduct){
    setfilter(filteredproduct)
  }
  const products = filter === 'All' 
    ? message 
    : filter==='clothing'
      ?message.filter(each => each.category.includes('Clothing'))
      :message.filter(each => each.category === filter);    
  
  function addFavorites(id){
     setFavourites(prev =>
      prev.includes(id)
        ? prev.filter(fid => fid !== id) // remove if already fav
        : [...prev, id] // add if not fav
    );
  }
  const items=products.map(each=>{
      return(
      <Product 
            key={each.id}
            id={each.id}
            title={each.title}
            price={each.price}
            description={each.description}
            category={each.category}
            image={each.image}
            // rating_rate={each.rating.rate}
            // rating_count={each.rating.count}
            isFavourite={Favourites.includes(each.id)}
            addFavorites={addFavorites}
      />      
      )
  })
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