import React, { useState, useEffect } from 'react';

const Product = ({ id, name, price, addToCart }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>
        Quantity:
        <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
      </p>
      <button onClick={() => addToCart({ id, name, price, quantity })}>Add to Cart</button>
    </div>
  );
};

const ProductList = ({addToCart}) => {

  const [products, setProducts] = useState([]);

  const getProducts = () => (
    fetch("http://127.0.0.1:5000/products")
    .then(response => response.json())
    .then(data => (setProducts(data)))
  )

  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div>
      {products.map(product => (
        <Product key={product.id} {...product} addToCart={addToCart}/>
      ))}
    </div>
  );
};

const ShoppingCart = ({cart, setCart}) => {

  const total = cart.reduce((acc, product) => acc + parseInt(product.price,10) * parseInt(product.quantity,10), 0);

  const buyHandler = () => {
    console.log("The cart", cart)

    const items = cart.map((product) => {
      const {price, ...item} = product
      return item
    })

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    };

    fetch("http://127.0.0.1:5000/checkout", requestOptions)
    .then(response => response.json())
    .then((data) => {
      alert(data.message)
      setCart([])
    });
  }

  const removeHandler = (id) => {
    setCart(cart.filter((item) => (item["id"] !== id)))
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>${product.price * product.quantity}</td>
              <td><button onClick={() => removeHandler(product.id)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Total: ${total}
      </p>
      <button onClick={() => (buyHandler())}>Buy now</button>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = product => {
    if (product.quantity > 0){
      setCart([...cart, product]);
    }
  };

  return (
    <div>
      <h1>Product Catalog</h1>
      <ProductList addToCart={(product) => addToCart(product)}/>
      <ShoppingCart cart={cart} setCart={setCart}/>
    </div>
  );
};

export default App;
