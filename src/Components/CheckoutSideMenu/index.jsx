import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { OrderCard } from "../OrderCard";

const CheckoutSideMenu = () => {
  const { isCheckSideMenuOpen, closeCheckSideMenuOpen, cartProducts } =
    useContext(ShoppingCartContext);

  return (
    <aside
      className={`${
        isCheckSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border bg-white border-black rounded-lg w-[360px] h-[calc(100vh-80px)]`}>
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => closeCheckSideMenuOpen()}
          />
        </div>
      </div>
      <div className="px-6">
        {cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </aside>
  );
};

export { CheckoutSideMenu };
