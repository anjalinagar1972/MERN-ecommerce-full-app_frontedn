import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/App_Context'
import { Link, useNavigate } from 'react-router-dom';



const Cart = () => {
  const {cart,decreaseQty,increaseQty,removeFromCart,clearCart} = useContext(AppContext);
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  const navigate = useNavigate();
  console.log(qty);
  console.log(price);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if(cart?.items){
      for(let i=0; i<cart?.items?.length; i++ ){
        qty += cart.items[i].qty
        price += cart.items[i].price
      }
      setPrice(price)
      setQty(qty)
    }
  },[cart])

  // console.log("my cart====>>>",cart);
  

  return (
    <>
    {cart?.items?.length == 0 ? (
      <div className='text-center my-5'>
      <Link to={'/'} className='btn btn-warning mx-3' style={{fontWeight:"bold",fontSize:"1.2rem"}}>Continu Shopping...</Link>
      </div>
    ) : (
    <div className='my-5 text-center'>
      <button className='btn btn-info mx-3' style={{fontWeight:"bold",fontSize:"1.2rem"}}>Total Qty :- {qty} </button>
      <button className='btn btn-warning mx-3' style={{fontWeight:"bold",fontSize:"1.2rem"}}>Total Qty :- {price} </button>
    </div> 
    )}

    {cart?.items?.map((product)=> <div key={product?._id} className='container bg-dark my-5 p-3 text-center'>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <div className="cart_Img">
          <img src={product.imgSrc} style={{width:"100px",height:"100px",borderRadius:"10px"}} alt="" />
        </div>
        <div className="cart-des">
          <h2>{product?.title}</h2>
          <h4>{product?.price}</h4>
          <h4>Qty :- {product.qty}</h4>
        </div>
        <div className="cart_action">
          <div className="btn btn-warning mx-3" style={{fontWeight:"600"}} onClick={()=>decreaseQty(product?.productId,1)}>Qty--</div>
          <div className="btn btn-info mx-3" style={{fontWeight:"600"}} onClick={()=>increaseQty(product?.productId,product?.title,product?.price/product.qty,1,product?.imgSrc)} >Qty++</div>
          <div className="btn btn-danger mx-3" style={{fontWeight:"600"}} onClick={()=>{
            if(window.confirm("are you sure you want to remove this from cart")){
              removeFromCart(product?.productId);
            }
          }}>Remove</div>

        </div>
      </div>
    </div> )}

    {cart?.items?.length > 0 && (
          <div className='container text-center my-5'>
          <div className="btn btn-warning  mx-3" style={{fontWeight:"bold",padding:"10px 25px"}}  onClick={()=>navigate('/shipping')}>Check Out</div>
          <div className="btn btn-danger mx-3" style={{fontWeight:"bold",padding:"10px 25px"}} onClick={() => {
            if(window.confirm("are you sure you want to clear cart")){
              clearCart()
            }
          }}>Clear Cart</div>
        </div>
    )}


    </>
  )
}

export default Cart