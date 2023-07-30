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
    account,
  } = useContext(ShoppingCartContext);

  // Sign Out
  const signOutLocalStorage = localStorage.getItem("sign-out");
  const parseSignOut = JSON.parse(signOutLocalStorage);
  const isUserSignOut = signOut || parseSignOut;
  // Account
  const accountLocalStorage = localStorage.getItem("account");
  const parseAccount = JSON.parse(accountLocalStorage);
  // Has an account
  const noAccountInLocalStorage = parseAccount
    ? Object.keys(parseAccount).length === 0
    : true;
  const noAccountInLocalState = account
    ? Object.keys(account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSignOut);
    setSignOut(true);
  };

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60">{parseAccount?.email}</li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleSignOut()}>
              Sign out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}>
            Sign in
          </NavLink>
        </li>
      );
    }
  };

  return (
    <nav
      className={`${
        isClickable
          ? "relative"
          : " flex  justify-evenly items-center w-full gap-8 pt-3 pl-5 bg-white z-10 fixed top-0"
      }`}>
      <ul
        className={`${
          isClickable
            ? "flex justify-center items-center fixed z-10 w-full py-5 px-8 font-light top-0"
            : "flex"
        }`}>
        <li className="font-semibold text-3xl">
          <NavLink to={`${isUserSignOut ? "/sign-in" : "/"}`}>Shopi</NavLink>
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
        <li>
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
      </ul>
      <ul
        className={`${
          showCategories
            ? "flex flex-col h-full justify-evenly items-center bg-white gap-y-9 w-full fixed z-10 top-0"
            : "hidden sm:flex sm:items-center sm:gap-5"
        }`}>
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
