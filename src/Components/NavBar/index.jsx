import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const NavBar = () => {
  const activeStyle = "underline underline-offset-4";
  const {
    setSearchByCategory,
    cartProducts,
    isClickable,
    showCategories,
    setShowCategories,
    signOut,
    setSignOut,
  } = useContext(ShoppingCartContext);

  // Sign Out
  const signOutLocalStorage = localStorage.getItem("sign-out");
  const parseSignOut = JSON.parse(signOutLocalStorage);
  const isUserSignOut = signOut || parseSignOut;

  const handleClick = () => {
    if (isClickable) {
      setShowCategories((option) => !option);
    }
  };

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSignOut);
    setSignOut(true);
  };

  const renderView = () => {
    if (isUserSignOut) {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}>
            Sign out
          </NavLink>
        </li>
      );
    } else {
      <>
        <li className="text-black/60 ml-10 text-sm">edgardotecno@gmail.com</li>
        <li>
          <NavLink
            to="/my-orders"
            className={({ isActive }) => (isActive ? activeStyle : "text-sm")}>
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-account"
            className={({ isActive }) => (isActive ? activeStyle : "text-sm")}>
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : "text-sm")}
            onClick={() => handleSignOut()}>
            Sign In
          </NavLink>
        </li>
      </>;
    }
  };

  return (
    <nav
      className={`${
        isClickable
          ? "relative"
          : "relative flex items-center w-full gap-8 pt-3 pl-5"
      }`}>
      <ul
        className={`${
          isClickable
            ? "flex justify-center items-center fixed z-10 w-full py-5 px-8 font-light top-0"
            : "flex"
        }`}>
        <li className="font-semibold text-3xl">
          <NavLink to="/" onClick={handleClick}>
            Shopi
          </NavLink>
        </li>
      </ul>
      <ul
        className={`${
          showCategories
            ? "flex flex-col h-full justify-evenly items-center bg-white gap-y-9 w-full fixed z-10 top-0"
            : "hidden sm:flex sm:items-center sm:gap-5"
        }`}>
        <li
          className={`${
            showCategories
              ? "absolute top-0 right-0 flex justify-center items-center w-6 h-10 rounded-full m-2 p-1"
              : "hidden"
          }`}
          onClick={() => setShowCategories((option) => !option)}>
          <XMarkIcon className="h-full w-full text-black" />
        </li>
        <li className="">
          <NavLink
            to="/"
            onClick={() => setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : "text-sm")}>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/electronics"
            onClick={() => setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : "text-sm")}>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/jewelery"
            onClick={() => setSearchByCategory("jewelery")}
            className={({ isActive }) => (isActive ? activeStyle : "text-sm")}>
            Jewelery
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/category/men's clothing"
            onClick={() => setSearchByCategory("men's clothing")}
            className={({ isActive }) => (isActive ? activeStyle : "text-sm")}>
            Men's Clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/women's clothing"
            onClick={() => setSearchByCategory("women's clothing")}
            className={({ isActive }) => (isActive ? activeStyle : "text-sm")}>
            Women's Clothing
          </NavLink>
        </li>
        {renderView()}
        <li className="flex items-center">
          <ShoppingBagIcon className="h-6 w-6 text-black" />
          <div>{cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  );
};

export { NavBar };
