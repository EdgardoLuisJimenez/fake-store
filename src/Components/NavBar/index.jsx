import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const NavBar = () => {
  const activeStyle = "underline underline-offset-4";
  const {setSearchByCategory, cartProducts } =
    useContext(ShoppingCartContext);

  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/electronics"
            onClick={() => setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/jewelery"
            onClick={() => setSearchByCategory("jewelery")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Jewelery
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/category/men's clothing"
            onClick={() => setSearchByCategory("men's clothing")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Men's Clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/women's clothing"
            onClick={() => setSearchByCategory("women's clothing")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Women's Clothing
          </NavLink>
        </li>
      </ul>

      <ul className="flex items-center gap-3">
        <li className="text-black/60">edgardotecno@gmail.com</li>
        <li>
          <NavLink
            to="/my-orders"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-account"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Sign In
          </NavLink>
        </li>

        <li className="flex items-center">
          <ShoppingBagIcon className="h-6 w-6 text-black" />
          <div>{cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  );
};

export { NavBar };
