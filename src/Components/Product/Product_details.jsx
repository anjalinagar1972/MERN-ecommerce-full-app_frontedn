import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Related_Product from './Related_Product'

const Product_details = () => {

  const navigate = useNavigate();
  const [product, setProduct] = useState()
  const { id } = useParams()
  const url = "http://localhost:5000/api"


  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/get/single/product/${id}`, {
        headers: {
          "content-Type": "Application/json"
        },
        withCredentials: true
      })
      // console.log(api.data.getData);
      setProduct(api.data.getData)
    }
    fetchProduct()
  }, [id])

  const goback = () => {
    navigate(-1)
  }

  return (
    <>
      <div>
        <button onClick={goback} className='btn btn-primary my-4 mx-4' style={{padding:"0px 28px 8px 28px"}}><span style={{fontSize:"25px",}}>←</span> Go back</button>
      </div>
      <div className="container text-center my-5" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <div className="left">
          <img src={product?.imgSrc} style={{ width: "250px", height: "250px", borderRadius: "10px", border: "2px solid yellow" }} />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h2>{product?.price} {"₹"}</h2>
          <div className='my-3'>
            <button className='btn btn-danger mx-3'>Buy Now</button>
            <button className='btn btn-warning'>Add to cart</button>
          </div>
        </div>
      </div>

      <Related_Product category={product?.category} />
    </>
  )
}

export default Product_details