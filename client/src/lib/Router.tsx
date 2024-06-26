import App from "@/pages/App";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Search from "@/pages/Search";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { productLoader } from "@/lib/Loaders/ProductPageLoader";
import PageNotFound from "@/pages/PageNotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import Profile from "@/pages/Profile";
import AddProduct from "@/pages/AddProduct";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import Favorites from "@/pages/Favorites";
import PrivateRoutes from "@/pages/PrivateRoutes";
import Disclaimer from "@/pages/Disclaimer";
import AdminRoutes from "@/pages/AdminRoutes";
import ErrorPage from "@/pages/ErrorPage";
import AuthRoutes from "@/pages/AuthRoutes";

const Router = () => {
  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/search", element: <Search /> },
        {
          path: "/product/:slug",
          element: <ProductDetails />,
          loader: productLoader,
        },
        {
          element: <AuthRoutes />,
          children: [
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
          ],
        },
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
              children: [
                { path: "/profile/orders", element: <Orders /> },
                { path: "/profile/favorites", element: <Favorites /> },
              ],
            },
          ],
        },
        {
          element: <AdminRoutes />,
          children: [{ path: "/add-product", element: <AddProduct /> }],
        },
        { path: "/cart", element: <Cart /> },
        { path: "/disclaimer", element: <Disclaimer /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={BrowserRouter} />;
};

export default Router;
