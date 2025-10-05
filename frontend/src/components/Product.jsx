import {useEffect,useState} from 'react'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
import './../css/Product.css';
import Icon from '../images/favourite_icon.png';
import FavouriteIcon from './../images/after_favourite_icon.png';
import api,{ setAuthToken } from './../javascript/api.js';
export default function Product(props){
  console.log(props.isCart)
  const ratings=[1,2,3,4,5]
  const real_rating=Math.floor(props.rating_rate || 0);
  const rating=ratings.map(each=>(
    <span 
        key={each} 
        className={`fa fa-star ${each <= real_rating ? 'checked' : ''}`} 
    ></span>
  ))

  return (
    <>
        <div className='product'>
            <div className="product-description">
                <img src={props.image} alt={props.description} />
                <h3>{props.title}</h3>
                <span className='rating'>{props.rating_rate}</span>{rating}<span className='rating'>({props.rating_count>0?props.rating_count:0} reviews)</span>
                <p className='price'>${props.price}</p>
            </div>
            <div className="buying-options">
                {props.isCart?<button>Go to Cart</button>:<button onClick={()=>props.addCart(props.mongoid)}>Add to Cart</button>}
                <button onClick={()=>props.checkOut(props.mongoid)}>Buy Now</button>
            </div>
            <div className='Favourite'>
              <button 
                onClick={()=>props.addFavorites(props.mongoid)}>
                {props.isFavourite?<img src={FavouriteIcon} alt="Add to Favourites" />:<img src={Icon} alt="" />}
              </button></div>
            <button></button>
        </div>
    </>
  )
}