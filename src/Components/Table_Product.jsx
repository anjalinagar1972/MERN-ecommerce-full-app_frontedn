import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/App_Context';
import { useNavigate } from 'react-router-dom';


const Table_Product = ({ cart }) => {

    const { decreaseQty, increaseQty, removeFromCart, clearCart } = useContext(AppContext);
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        let qty = 0;
        let price = 0;
        if (cart?.items) {
            for (let i = 0; i < cart?.items?.length; i++) {
                qty += cart.items[i].qty
                price += cart.items[i].price
            }
            setPrice(price)
            setQty(qty)
        }
    }, [cart])


    return (
        <>
            <div className="container">
                <table class="table table-bordered border-primary bg-dark">
                    <thead>
                        <tr>
                            <th scope="col" className='bg-dark text-light'>Product Image</th>
                            <th scope="col" className='bg-dark text-light'>Title</th>
                            <th scope="col" className='bg-dark text-light'>Price</th>
                            <th scope="col" className='bg-dark text-light'>Qty</th>
                            <th scope="col" className='bg-dark text-light' >Qty--</th>
                            <th scope="col" className='bg-dark text-light'>Qty++</th>
                            <th scope="col" className='bg-dark text-light'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>

                        {cart?.items?.map((product) => (
                            <tr key={product?._id}>
                                <th className='bg-dark text-light' scope="row">
                                    <img src={product?.imgSrc} alt="" style={{ width: "100px", height: "80px", borderRadius: "6px" }} />
                                </th>
                                <td className='bg-dark text-light'>{product?.title}</td>
                                <td className='bg-dark text-light'>{product?.price}</td>
                                <td className='bg-dark text-light'>{product?.qty}</td>
                                <td className='bg-dark text-light'><span class="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => decreaseQty(product?.productId, 1)}>do_not_disturb_on</span></td>
                                <td className='bg-dark text-light'><span class="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => increaseQty(product?.productId, product?.title, product?.price / product.qty, 1, product?.imgSrc)}>add_circle</span></td>
                                <td className='bg-dark text-light'><span class="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => {
                                    if (window.confirm("are you sure you want to remove this from cart")) {
                                        removeFromCart(product?.productId);
                                    }
                                }}>delete</span></td>
                            </tr>
                        ))}

                        <tr>
                            <th className='bg-dark text-light' scope="row"></th>
                            <td className='bg-dark text-light'><button style={{ fontWeight: "bold" }} className='btn btn-primary'>Total</button></td>
                            <td className='bg-dark text-light'><button style={{ fontWeight: "bold" }} className='btn btn-warning'>{price}</button></td>
                            <td className='bg-dark text-light'><button style={{ fontWeight: "bold" }} className='btn btn-info'>{qty}</button></td>
                            <td className='bg-dark text-light'></td>
                            <td className='bg-dark text-light'></td>
                            <td className='bg-dark text-light'></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table_Product