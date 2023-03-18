import React, { useState, useEffect } from 'react';
import AddProduct from '../AddProduct';
import ProductList from '../ProductList';
import ShoppingCart from '../ShoppingCart'
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import UserInfo from '../UserInfo';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [showSignIn, setShowSignIn] = useState(true)
  const [cookies, _, removeCookie] = useCookies(['auth-token']);

  const addToCart = product => {
    if (product.quantity > 0){
      fetch("http://127.0.0.1:8000/add-to-cart",{
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token': cookies?.authToken
        },
        body: JSON.stringify({item: product })
      })
      .then(response => response.json())
      .then(setCart([...cart, product]))
    }
  };

  const getProducts = () => (
    fetch("http://127.0.0.1:8000/products")
    .then(response => response.json())
    .then(data => (setProducts(data))))

  useEffect(() => {
    getCurrentUser()
    getProducts()
  }, []);

  const getCurrentUser = () => (
    fetch("http://127.0.0.1:8000/current-user",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': cookies?.authToken
      }
    })
    .then(response => response.json())
    .then(data => (setCurrentUser(data['current_user'])))
  )

  const logoutHandler = () => {
    removeCookie('authToken');
    setCurrentUser({});
  };

  const userBar = () => {
    if (currentUser?.name){
      return (
        <UserInfo currentUser={currentUser} 
        logOutHandler = {() => (logoutHandler())}/>
      )
    }
    else{
      return(
        <div>
          {showSignIn && 
            <SignIn signUpHandler = {() => (setShowSignIn(false))} 
                    setCurrentUser={(user) => (setCurrentUser(user))}/>}
          {!showSignIn && <SignUp signInHandler={() => (setShowSignIn(true))}></SignUp>}
        </div>
      )
    }
  }

  const isAdminLogged = currentUser?.isAdmin || false

  return (
    <div>
      {userBar()}
      {isAdminLogged && <AddProduct getProducts={getProducts}/>}
      <h1>Product Catalog</h1>
      <ProductList 
        addToCart={(product) => addToCart(product)} products={products} setProducts={setProducts} isAdminLogged={isAdminLogged}
        getProducts={getProducts}
        />
      {!isAdminLogged && (cart.length > 0) && <ShoppingCart cart={cart} setCart={setCart}/>}
    </div>
  );
};

export default App;
