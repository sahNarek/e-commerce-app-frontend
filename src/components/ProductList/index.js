import React from 'react';
import Product from '../Product';

const ProductList = ({addToCart, products, isAdminLogged, getProducts }) => {
  
  return (
    <div>
      {products.map(product => (
        <Product 
          key={product.id} 
          {...product} 
          addToCart={addToCart} 
          isAdminLogged={isAdminLogged} 
          getProducts={getProducts}>
        </Product>
      ))}
    </div>
  );
};

export default ProductList;