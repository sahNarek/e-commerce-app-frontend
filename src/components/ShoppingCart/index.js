import { useCookies } from 'react-cookie';


const ShoppingCart = ({cart, setCart}) => {

  const [cookies, _, removeCookie] = useCookies(['auth-token']);
  const total = cart.reduce((acc, product) => acc + parseInt(product.price,10) * parseInt(product.quantity,10), 0);

  const buyHandler = () => {
    
    const items = cart.map((product) => {
      const {price, ...item} = product
      return item
    })

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-access-token': cookies?.authToken
      },
      body: JSON.stringify({ items })
    };

    fetch("http://127.0.0.1:8000/checkout", requestOptions)
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

export default ShoppingCart;