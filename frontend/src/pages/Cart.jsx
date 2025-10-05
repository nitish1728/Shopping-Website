import {useState,useEffect} from 'react'
import api,{ setAuthToken } from '../javascript/api';
import './../css/Cart.css';
import Swal from "sweetalert2";
import Footer from './../components/Footer.jsx';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

export default function Cart(){
    const [cartProducts,setCartProducts]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        async function getCartProducts(){
            const response=await api.get('/products/cart/fetch');
            setLoading(false)
            setCartProducts(response.data.cartProducts.cart)
        }
        getCartProducts()
    },[])

    async function updateCount(id,update){
        console.log(id)
        setCartProducts(prev=>prev.map(each=>{
            if(each.product._id===id){
                if(update=="+"){
                    if(each.quantity+1>each.product.stock){
                        Swal.fire("Limit Excceded",`You can buy only upto ${each.quantity} items for this product`,"info")
                        return each;
                    }
                    api.put(`/products/cart/update/count/${id}`,{count:1})
                    return{
                        ...each,
                        quantity:Math.min(each.quantity+1,each.product.stock)
                    }
                }
                else{
                    api.put(`/products/cart/update/count/${id}`,{count:-1})
                    return{
                        ...each,
                        quantity:Math.max(each.quantity-1,1)
                    }
                }
            }
            else{
                return {...each};
            }
        }))
    }
    const totalAmount = cartProducts.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    return(
        <div className="cart-page">
            <h1>Cart</h1>
            <div className="cart-products">
                {!loading && cartProducts.length > 0 ? (
                    <div className="cart">
                        <table className="modifytable">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Final Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartProducts.map((p) => (
                                    <tr key={p.product._id}>
                                    <td>
                                        <img
                                        src={p.product.image}
                                        alt={p.product.description}
                                        width="50"
                                        height="50"
                                        />
                                    </td>
                                    <td>{p.product.title}</td>
                                    <td>{p.product.category}</td>
                                    <td>${p.product.price.toFixed(2)}</td>
                                    <td>
                                        <div className="modify-quantity">
                                            <button className="decrease" onClick={()=>updateCount(p.product._id,"-")} disabled={p.quantity<=1}>-</button>
                                            <input type="text" name="" id="" value={p.quantity} readOnly/>
                                            <button className="increase" onClick={()=>updateCount(p.product._id,"+")}>+</button>
                                        </div>
                                    </td>
                                    <td>${(p.product.price*p.quantity).toFixed(2)}</td>
                                    <td><button className='delete'><i className="fa fa-trash"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="cart-summary">
                            <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
                            <button className="checkout-btn">Proceed to Checkout</button>
                        </div>
                    </div>
                ) : (
                !loading && <h3>No Products Found</h3>
                )}
            </div>
        </div>
    )
}