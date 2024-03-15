import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const resetCart = () => {
    setCartCount(0);
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
  
};