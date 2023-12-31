import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { OrderCard } from "../OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  const {
    isCheckSideMenuOpen,
    closeCheckSideMenuOpen,
    cartProducts,
    setCartProducts,
    order,
    setOrder,
    setsearchByTitle,
  } = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter((product) => product.id != id);
    setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "01.02.23",
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    };

    setOrder([...order, orderToAdd]);
    setCartProducts([]);
    closeCheckSideMenuOpen();
    setsearchByTitle(null);
  };

  return (
    <aside
      className={`${
        isCheckSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border bg-white border-black rounded-lg w-[360px] h-[calc(100vh-140px)]`}>
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => closeCheckSideMenuOpen()}
          />
        </div>
      </div>
      <div className="px-6 overflow-y-auto flex-1">
        {cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">
            ${totalPrice(cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="w-full bg-black py-3 text-white rounded-lg"
            onClick={() => handleCheckout()}>
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export { CheckoutSideMenu };
