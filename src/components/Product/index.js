import { useState } from "react";
import EditProduct from "../EditProduct";

const Product = ({ id, name, price, addToCart, isAdminLogged, getProducts }) => {

    const [quantity, setQuantity] = useState(0);
    const [isEditEnabled, setIsEditEnabled] = useState(false)

    const deleteHandler = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }

        
        let responseIsSuccesfull = true

        fetch(`http://127.0.0.1:5000/product/${id}`, requestOptions)
        .then(response => {
            if (!response.ok){
                responseIsSuccesfull = false                
            }
            return response.json()
        })
        .then(data => {
            if (responseIsSuccesfull){
                alert(data["message"])
                getProducts()
            }
            else{
                throw new Error(data["message"])
            }
        })
        .catch(message => (
            alert(message)
        ))
    }

    return (
        <div>
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <p>
            Quantity:
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
        </p>
        {isAdminLogged && <button onClick={() => (setIsEditEnabled(!isEditEnabled))}>Edit</button>}
        {isEditEnabled && <EditProduct getProducts={getProducts} productId={id} closeForm={() => (setIsEditEnabled(false))}/>}
        {isAdminLogged && <button onClick={() => (deleteHandler())}>Delete</button>}
        {!isAdminLogged && <button onClick={() => addToCart({ id, name, price, quantity })}>Add to Cart</button>}
        </div>
    );
};

export default Product;