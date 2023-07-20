import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

const Card = ({ id, title, price, category, description, image }) => {
  const productData = { id, title, price, category, description, image };
  const {
    count,
    setCount,
    openProductDetail,
    setProductToShow,
    cartProducts,
    setCartProducts,
    openCheckSideMenuOpen,
    closeProductDetail,
    closeCheckSideMenuOpen,
  } = useContext(ShoppingCartContext);

  const showProduct = (productData) => {
    openProductDetail();
    setProductToShow(productData);
    closeCheckSideMenuOpen();
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    setCount(count + 1);
    setCartProducts((cartProducts) => [...cartProducts, productData]);
    closeProductDetail();
    openCheckSideMenuOpen();
  };

  const renderIcon = (id) => {
    const isInCart =
      cartProducts.some((product) => product.id === id);

    if (isInCart) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-green-600 w-6 h-6 rounded-full m-2 p-1">
          <CheckIcon className="h-6 w-6 text-white" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProductsToCart(event, productData)}>
          <PlusIcon className="h-6 w-6 text-black" />
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg shadow-lg shadow-gray-300"
      onClick={() => showProduct(productData)}>
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {category}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={productData.image}
          alt={productData.title}
        />
        {renderIcon(productData.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light line-clamp-2">{productData.title}</span>
        <span className="text-lg font-medium">${productData.price}</span>
      </p>
    </div>
  );
};

export { Card };
