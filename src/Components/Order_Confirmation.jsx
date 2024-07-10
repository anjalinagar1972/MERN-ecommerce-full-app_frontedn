import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/App_Context'
import Show_order_product_Table from './Show_order_product_Table'


const Order_Confirmation = () => {
  const {userOrder} = useContext(AppContext)
  const [latestOrder, setLatestOrder] = useState({})

  useEffect(()=>{

    if(userOrder){
      setLatestOrder(userOrder[0])
    }

  },[userOrder])
  // console.log("latest order ====>>>>",latestOrder);
  
  return (
    <>
    <div className="container my-5">
      <h1 className='text-center'>Your order has been confirm,</h1>
      <h3 className='text-center'>it will delivered soon</h3>
    </div>

    <div className="container my-3">

        <table className="table table-bordered border-primary bg-dark">
          <thead>
            <tr>
              <th scope="col" className='bg-dark text-light text-center'>Order Items</th>
              <th scope="col" className='bg-dark text-light text-center'>Order Detail & Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* product details */}
              <td className='bg-dark text-light text-center'>
                <Show_order_product_Table items ={latestOrder?.orderItems} />
              </td>
              {/* shipping address */}
              <td className='bg-dark text-light'>
                <ul style={{ fontWeight: "600" }}>
                  <li>Order id :- {latestOrder?.orderId}</li>
                  <li>PaymentId :- {latestOrder?.paymentId}</li>
                  <li>Payment Status :- {latestOrder?.payStatus}</li>
                  <li>Order Date :- {latestOrder?.orderDate}</li>
                  <li>Name :- {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone :- {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country :- {latestOrder?.userShipping?.country}</li>
                  <li>State :- {latestOrder?.userShipping?.state}</li>
                  <li>City :- {latestOrder?.userShipping?.city}</li>
                  <li>Pincode :- {latestOrder?.userShipping?.pincode}</li>
                  <li>Near By :- {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

      {/* <div className="container text-center my-5">
        <button className="btn btn-secondary btn-lg" style={{ fontWeight: "bold" }} >Proceed To Pay</button>
      </div> */}

    </>
  )
}

export default Order_Confirmation