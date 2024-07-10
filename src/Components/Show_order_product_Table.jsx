import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/App_Context';
import { useNavigate } from 'react-router-dom';


const Show_order_product_Table = ({ items }) => {
    // console.log("itemmsss===>>",items);

    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        let qty = 0;
        let price = 0;
        if (items) {
            for (let i = 0; i < items?.length; i++) {
                qty += items[i].qty
                price += items[i].price
            }
            setPrice(price)
            setQty(qty)
        }
    }, [items])


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
                        </tr>
                    </thead>
                    <tbody>

                        {items?.map((product) => (
                            <tr key={product?._id}>
                                <th className='bg-dark text-light' scope="row">
                                    <img src={product?.imgSrc} alt="" style={{ width: "100px", height: "80px", borderRadius: "6px" }} />
                                </th>
                                <td className='bg-dark text-light'>{product?.title}</td>
                                <td className='bg-dark text-light'>{product?.price}</td>
                                <td className='bg-dark text-light'>{product?.qty}</td>
                            </tr>
                        ))}

                        <tr>
                            <th className='bg-dark text-light' scope="row"></th>
                            <td className='bg-dark text-light'><button style={{ fontWeight: "bold" }} className='btn btn-primary'>Total</button></td>
                            <td className='bg-dark text-light'><button style={{ fontWeight: "bold" }} className='btn btn-warning'>{price}</button></td>
                            <td className='bg-dark text-light'><button style={{ fontWeight: "bold" }} className='btn btn-info'>{qty}</button></td>

                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Show_order_product_Table