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

const Router = () => {
  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <PageNotFound />,
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
        { path: "/profile", element: <Profile /> },
        { path: "/add-product", element: <AddProduct /> },
      ],
    },
  ]);

  return <RouterProvider router={BrowserRouter} />;
};

export default Router;
