import React, { useState, useEffect } from 'react';
import AddProduct from '../AddProduct';
import ProductList from '../ProductList';
import ShoppingCart from '../ShoppingCart'

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAdminLogged, setisAdminLogged] = useState(false);

  const addToCart = product => {
    if (product.quantity > 0){
      setCart([...cart, product]);
    }
  };

  const getProducts = () => (
    fetch("http://127.0.0.1:5000/products")
    .then(response => response.json())
    .then(data => (setProducts(data)))
    .then(() => (console.log("Gets here")))
  )

  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div>
      <button onClick={() => (setisAdminLogged(!isAdminLogged))}> {isAdminLogged ? "Log out": "Login as Admin"} </button>
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
