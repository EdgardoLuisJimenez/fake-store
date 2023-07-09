import { createContext, useEffect, useState } from "react";

const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart - Increment quantity
  const [count, setCount] = useState(0);

  // Product Detail - Open / Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu - Open / Close
  const [isCheckSideMenuOpen, setIsCheckSideMenuOpen] = useState(false);
  const openCheckSideMenuOpen = () => setIsCheckSideMenuOpen(true);
  const closeCheckSideMenuOpen = () => setIsCheckSideMenuOpen(false);

  // Product Detail - Show Product
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckSideMenuOpen,
        openCheckSideMenuOpen,
        closeCheckSideMenuOpen,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartProvider, ShoppingCartContext };
