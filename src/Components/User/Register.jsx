import React, { useContext, useState } from 'react'
import AppContext from '../../Context/App_Context'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const {register} =useContext(AppContext)
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangHandler = (e) => {
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }
  const {name,email,password} = formData
  const submitHandler = async (e) => {
    e.preventDefault();
    // alert("form submited")
    const result = await register(name,email,password)
    if(result.success){
      navigate('/login/user/user')
    }
    console.log(formData);
  }

  return (
    <div className="container my-5 p-5" style={{ width: "600px", border: "2px solid yellow", borderRadius: "10px" }}>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <h1 className='text-center'>User Register</h1>
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input name='name' value={formData.name} onChange={onChangHandler} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input name='email' value={formData.email} onChange={onChangHandler} type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input name='password' value={formData.password} onChange={onChangHandler} type="password" className="form-control" id="exampleInputPassword1" />
        </div>

        <div className='d-grid col-6 my-4'>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>

    </div>

  )
}

export default Register