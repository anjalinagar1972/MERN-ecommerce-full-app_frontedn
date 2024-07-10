import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/App_Context'
import { Link } from 'react-router-dom'


const Related_Product = ({ category }) => {
    const { products } = useContext(AppContext)
    const [relatedProducts, setRelatedProducts] = useState([])
    useEffect(() => {
        setRelatedProducts(products?.filter((data) => data?.category?.toLowerCase() == category?.toLowerCase()))
    }, [category, products])

    return (
        <>
            <div className="container text-center">
                <h1>Related Product</h1>
                <div className='container'>
                    <div className='row container d-flex justify-content-center align-items-center my-5'>
                        {relatedProducts?.map((product) => <div key={product._id} className='my-3 col-md-4 d-flex justify-content-center align-items-center p-3'>
                            <div className="card bg-dark text-light text-center" style={{ width: "18rem" }}>
                                <Link to={`/get/single/product/${product._id}`} className='d-flex justify-content-center align-items-center p-3'>
                                    <img src={product.imgSrc} className="card-img-top" alt="..." style={{ width: "200px", height: "200px", borderRadius: "10px", border: "2px solid yellow" }} />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <div className='my-3'>
                                        <button className="btn btn-primary mx-3">{product.price} {"₹"} </button>
                                        <button className="btn btn-warning">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Related_Product