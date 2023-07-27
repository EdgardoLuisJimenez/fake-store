import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import { ShoppingCartContext, ShoppingCartProvider } from "../../Context";
import { Home } from "../Home";
import { MyAccount } from "../MyAccount";
import { MyOrder } from "../MyOrder";
import { MyOrders } from "../MyOrders";
import { SignIn } from "../SignIn";
import { NotFound } from "../NotFound";
import { NavBar } from "../../Components/NavBar";
import { CheckoutSideMenu } from "../../Components/CheckoutSideMenu";
import "./App.css";
import { useContext } from "react";

const AppRoutes = () => {
  const { account, signOut } = useContext(ShoppingCartContext);
  // Account
  const accountLocalStorage = localStorage.getItem("account");
  const parseAccount = JSON.parse(accountLocalStorage);
  // Sign out
  const signOutLocalStorage = localStorage.getItem("sign-out");
  const parseSignOut = JSON.parse(signOutLocalStorage);
  // Has an account
  const noAccountInLocalStorage = parseAccount
    ? Object.keys(parseAccount).length === 0
    : true;
  const noAccountInLocalState = Object.keys(account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = signOut || parseSignOut;

  let routes = useRoutes([
    {
      path: "/",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/category/:category",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/my-account",
      element: <MyAccount />,
    },
    {
      path: "/my-order",
      element: <MyOrder />,
    },
    {
      path: "/my-orders",
      element: <MyOrders />,
    },
    {
      path: "/my-orders/last",
      element: <MyOrder />,
    },
    {
      path: "/my-orders/:id",
      element: <MyOrder />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export { App };
