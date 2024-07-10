import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AppContext from '../Context/App_Context'


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const { products, setIsFilterData, logout, isAuthenticated ,cart } = useContext(AppContext)

  // filter by category
  const filterByCategory = (cat) => {
    console.log("cat===>>>", cat);
    setIsFilterData(products.filter((data) => data?.category?.toLowerCase() == cat?.toLowerCase()));
  }

  // filter by price
  const filterByprice = (price) => {
    setIsFilterData(products.filter((data) => data?.price >= price))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    navigate(`/get/single/product/search/${searchTerm}`)
    setSearchTerm('')
  }
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to={'/'} className="left" style={{ width: "12%" }}>
            <img src="https://adiogent.in/wp-content/uploads/2023/09/adiogent-website-logo.png" style={{ width: "100%" }} />
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">
              search
            </span>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='search products....' />
          </form>
          <div className="right_bar">
            {isAuthenticated && (
              <>
                <Link to={'/cart'} type="button" className="btn btn-primary position-relative">
                  <span class="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {
                    cart?.items?.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                    )
                  }
                </Link>

                <Link to={'/user/profile'} className='btn btn-info mx-3'>Profile</Link>
                <button onClick={() => { logout(); navigate('/') }} className='btn btn-danger mx-3'>Logout</button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to={'/login/user/user'} className='btn btn-secondary mx-3'>Login</Link>
                <Link to={'/create/new/user'} className='btn btn-info mx-3'>Register</Link>
              </>
            )}

          </div>
        </div>

        {location.pathname == '/' && (
          <div className="sub_bar">
            <div className="items" onClick={() => setIsFilterData(products)}>No Filter</div>
            <div className="items" onClick={() => filterByCategory("android")}>Mobiles</div>
            <div className="items" onClick={() => filterByCategory("laptop")}>Laptops</div>
            <div className="items" onClick={() => filterByCategory("camera")}>Camera's</div>
            <div className="items" onClick={() => filterByCategory("headphone")}>Headphone</div>
            <div className="items" onClick={() => filterByprice(15999)}>15999</div>
            <div className="items" onClick={() => filterByprice(25999)}>25999</div>
            <div className="items" onClick={() => filterByprice(49999)}>49999</div>
            <div className="items" onClick={() => filterByprice(69999)}>69999</div>
            <div className="items" onClick={() => filterByprice(89999)}>89999</div>
          </div>
        )}

      </div>
    </>
  )
}

export default Navbar