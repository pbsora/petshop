import App from "@/pages/App";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Search from "@/pages/Search";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { productLoader } from "@/lib/Loaders/ProductPageLoader";
import PageNotFound from "@/pages/PageNotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import AddProduct from "@/pages/AddProduct";
import { authLoader } from "./Loaders/AuthLoader";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import Favorites from "@/pages/Favorites";
import PrivateRoutes from "@/pages/PrivateRoutes";

const Router = () => {
  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <PageNotFound />,
      loader: authLoader,
      children: [
        { path: "/", element: <Home /> },
        { path: "/search", element: <Search /> },
        {
          path: "/product/:slug",
          element: <ProductDetails />,
          loader: productLoader,
        },
        { path: "/auth", element: <Auth /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
              children: [
                { path: "orders", element: <Orders /> },
                { path: "favorites", element: <Favorites /> },
              ],
            },
          ],
        },

        { path: "/add-product", element: <AddProduct /> },
        { path: "/cart", element: <Cart /> },
        /*   { path: "/orders", element: <Orders /> },
        { path: "/favorites", element: <Favorites /> }, */
      ],
    },
  ]);

  return <RouterProvider router={BrowserRouter} />;
};

export default Router;
