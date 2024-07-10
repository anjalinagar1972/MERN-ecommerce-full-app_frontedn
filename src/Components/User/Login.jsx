import React, { useContext, useState } from 'react'
import AppContext from '../../Context/App_Context'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const {login} =useContext(AppContext)
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const onChangHandler = (e) => {
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }
  
  const {email,password} = formData
  const submitHandler = async (e) => {
    e.preventDefault();
    // alert("form submited")
    const result = await login(email,password)
    if(result.success){
      navigate('/')

    }
  }

  return (
    <div className="container my-5 p-5" style={{ width: "600px", border: "2px solid yellow", borderRadius: "10px" }}>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input name='email' value={formData.email} onChange={onChangHandler} type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input name='password' value={formData.password} onChange={onChangHandler} type="password" className="form-control" id="exampleInputPassword1" />
        </div>

        <div className='d-grid col-6 my-4'>
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>

    </div>

  )
}

export default Login