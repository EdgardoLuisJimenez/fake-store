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

  // Shopping Cart - Order
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState(null);

  // Filtered items
  const [filteredItems, setfilteredItems] = useState(null);

  // Get products by title
  const [searchByTitle, setsearchByTitle] = useState(null);

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  // Click the Shopi
  const [isClickable, setIsClickable] = useState(false);

  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    console.log(`Order: ${JSON.stringify(order)}`);

    if (JSON.stringify(order) != "[]") {
      localStorage.setItem("my-products", JSON.stringify(order));
    }
    if (
      JSON.stringify(order) == "[]" &&
      localStorage.getItem("my-products") != null
    ) {
      setOrder(JSON.parse(localStorage.getItem("my-products")));
    }

    console.log(`Local Storage: ${localStorage.getItem("my-products")}`);
  }, [order]);

  const handleResize = () => {
    setIsClickable(window.innerWidth <= 576);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) =>
      item.category.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE")
      return filteredItemsByTitle(items, searchByTitle);

    if (searchType == "BY_CATEGORY")
      return filteredItemsByCategory(items, searchByCategory);

    if (searchType == "BY_TITLE_AND_CATEGORY")
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );

    if (!searchType) return items;
  };

  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setfilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );

    if (searchByTitle && !searchByCategory)
      setfilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );

    if (!searchByTitle && searchByCategory)
      setfilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );

    if (!searchByTitle && !searchByCategory)
      setfilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
  }, [searchByTitle, searchByCategory]);

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
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setsearchByTitle,
        filteredItems,
        setfilteredItems,
        searchByCategory,
        setSearchByCategory,
        isClickable,
        showCategories,
        setShowCategories,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartProvider, ShoppingCartContext };
