import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import _ from "lodash";

const OrdersCards = (props) => {
  const { totalPrice, totalProducts, article } = props;
  const { deleteCards } = useContext(ShoppingCartContext);

  return (
    <div className="flex justify-between items-center mb-3 border border-none w-80 p-4 rounded-lg shadow-lg shadow-gray-400">
      <div className="relative flex justify-between w-full items-center">
        <p className="flex flex-col">
          <span className="font-light">01.02.03</span>
          <span className="font-light">{totalProducts} articles</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-2xl">${totalPrice}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
        </p>
        <div className="flex h-6 w-6 cursor-pointer">
          <XMarkIcon onClick={() => deleteCards(article)} />
        </div>
      </div>
    </div>
  );
};

export { OrdersCards };
