import React, { useContext, useState } from 'react'
import AppContext from '../Context/App_Context';
import { useNavigate } from 'react-router-dom'

const Address = () => {
  const navigate = useNavigate();
  const { shippingAddress, userAddress } = useContext(AppContext)
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: ""

  })


  const onChangHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const { fullName, address, city, state, country, pincode, phoneNumber } = formData
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber)
    if (result?.success) {
      navigate('/checkout')
    }
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: ""
    })
    console.log(formData);
  }

  return (
    <div className="container my-4 p-5" style={{ border: "2px solid yellow", borderRadius: "10px" }}>
      <h1 className='text-center'>Shipping Address</h1>
      <form onSubmit={submitHandler}>

        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
            <input name='fullName' value={formData.fullName} onChange={onChangHandler} type="text" className="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
            <input name='country' value={formData.country} onChange={onChangHandler} type="text" className="form-control bg-dark text-light" id="exampleInputEmail2" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">State</label>
            <input name='state' value={formData.state} onChange={onChangHandler} type="text" className="form-control bg-dark text-light" id="exampleInputPassword1" />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">City</label>
            <input name='city' value={formData.city} onChange={onChangHandler} type="text" className="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Pincode</label>
            <input name='pincode' value={formData.pincode} onChange={onChangHandler} type="number" className="form-control bg-dark text-light" id="exampleInputEmail2" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
            <input name='phoneNumber' value={formData.phoneNumber} onChange={onChangHandler} type="number" className="form-control bg-dark text-light" id="exampleInputPassword3" />
          </div>
        </div>

        <div className="row">
          <div class="mb-3">
            <label htmlFor="exampleFormControlTextarea1" class="form-label">Address/Nearby</label>
            <textarea name='address' value={formData.address} type="text" onChange={onChangHandler} className="form-control bg-dark text-light" id="exampleInputPassword4" rows="3" />
          </div>
        </div>



        <div className='d-grid col-6 mx-auto my-2'>
          <button type="submit" className="btn btn-primary" style={{fontWeight:"bold"}}>Submit</button>
        </div>
      </form>
      {userAddress && (
        <div className='d-grid col-6 mx-auto '>
          <button type="submit" className="btn btn-warning my-3"style={{fontWeight:"bold"}} onClick={()=>navigate('/checkout')}>Use Old Address</button>
        </div>
      )}


    </div>

  )
}

export default Address