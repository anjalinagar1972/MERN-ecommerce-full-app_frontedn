import React, { useEffect, useState } from 'react'
import AppContext from './App_Context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const App_State = (props) => {
  // const url = "http://localhost:5000/api"

  const url = "https://mern-ecommerce-full-app.onrender.com/api"


  const [products, setProducts] = useState([])
  const [token, setToken] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [filterData, setIsFilterData] = useState([])
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [userOrder, setUserOrder] = useState([])



  // all product fetch
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/get/all/product`, {
        headers: {
          "content-Type": "Application/json"
        },
        withCredentials: true
      })
      console.log(api.data);
      setProducts(api.data)
      setIsFilterData(api.data)
      userProfile();
    }
    fetchProduct()
    userCart()
    getAddress()
    allUserOrder()
  }, [token, reload])

  // set local storage token for authentication
  useEffect(() => {
    let lsToken = localStorage.getItem('token')
    // console.log("lstoken =====>>>>>>",lsToken);
    if (lsToken) {
      setToken(lsToken)
      setIsAuthenticated(true)
    }
    // setToken(localStorage.getItem('token'))
  }, [])

  // register user
  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/create/new/user`, { name, email, password }, {
      headers: {
        "content-Type": "Application/json"
      },
      withCredentials: true
    })
    // console.log("user register =====>", api);
    toast.success(api.data.message)
    return api.data
    // alert(api.data.message)

  }

  // Login user
  const login = async (email, password) => {
    const api = await axios.post(`${url}/login/user/user`, { email, password }, {
      headers: {
        "content-Type": "Application/json"
      },
      withCredentials: true
    })
    // console.log("login =====>",api);
    toast.success(api.data.message)
    setToken(api.data.token)
    setIsAuthenticated(true)
    localStorage.setItem('token', api.data.token)
    // console.log("token======>>>>",token);
    return api.data
    // alert(api.data.message)

  }

  // logout user
  const logout = () => {
    setIsAuthenticated(false)
    setToken("")
    localStorage.removeItem('token')
    toast.success("Logout successfully....!")
  }

  // user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    })
    // console.log(api.data);
    setUser(api.data.user)
  }

  // add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(`${url}/add/to/cart`, { productId, title, price, qty, imgSrc }, {
      headers: {
        "content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    })
      .then(res => {
        setReload(!reload)
        toast.success(res.data.message)
      }).catch(err => {
        // console.log(err);
      })


  }

  // get item cart
  const userCart = async () => {
    const api = await axios.get(`${url}/get/user/cart`, {
      headers: {
        "content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setCart(api.data.cart)
  }

  // decrease qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(`${url}/--qty`, { productId, qty }, {
      headers: {
        "content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setReload(!reload)
    // console.log("response====>>>>",api);
  }

    // increase qty
    const increaseQty = async (productId, title, price, qty, imgSrc) => {
      const api = await axios.post(`${url}/add/to/cart`, { productId, title, price, qty, imgSrc }, {
        headers: {
          "content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      })
        .then(res => {
          setReload(!reload)
          // toast.success(res.data.message)
        }).catch(err => {
          // console.log(err);
        })
  
  
    }

  // remove item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/remove/item/cart/${productId}`, {
      headers: {
        "content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setReload(!reload)
    // window.confirm("Are you sure you want to remove from cart");
    // console.log("remove item from cart====>>>>",api);
    toast.success(api.data.message)

  }

  // clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/clear/cart`, {
      headers: {
        "content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setReload(!reload)
    // console.log("remove item from cart====>>>>",api);
    toast.success(api.data.message)

  }

    // Add shipping address
    const shippingAddress = async (fullName,address,city,state,country,pincode,phoneNumber) => {
      const api = await axios.post(`${url}/add/shipping/address`,{fullName,address,city,state,country,pincode,phoneNumber}, {
        headers: {
          "content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
      setReload(!reload)
      // console.log("remove item from cart====>>>>",api);
      toast.success(api.data.message)
      return api.data
  
    }

    // get user latest address
    const getAddress = async () => {
      const api = await axios.get(`${url}/get/shipping/address`, {
        headers: {
          "content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      })
      // console.log("user address =====>>>>>",api.data.userAddress);
      setUserAddress(api.data.userAddress)
    }

       // get user order
       const allUserOrder = async () => {
        const api = await axios.get(`${url}/all/orders`, {
          headers: {
            "content-Type": "Application/json",
            "Auth": token
          },
          withCredentials: true
        })
        console.log("user order =====>>>>>",api.data);
        setUserOrder(api.data)
      }
      // console.log("userorder-variable--->",userOrder);



  return (
    <AppContext.Provider value={{userOrder,url, products, register, login, token, setToken, isAuthenticated, setIsAuthenticated, filterData, setIsFilterData, logout, user, addToCart, cart, decreaseQty,increaseQty, removeFromCart, clearCart,shippingAddress,userAddress, }}>{props.children}</AppContext.Provider>
  )
}

export default App_State