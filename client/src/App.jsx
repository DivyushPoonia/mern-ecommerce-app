import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AdminOrders from "./pages/admin-view/AdminOrders";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import Home from "./pages/shopping-view/Home";
import Products from "./pages/shopping-view/Products";
import Checkout from "./pages/shopping-view/Checkout";
import UnAuthorized from "./components/common/UnAuthorized";
import CheckAuth from "./components/common/CheckAuth";
import { useEffect, useMemo } from "react";
import { checkAuth } from "./store/auth-slice/auth";

const getRouter = (isAuthenticated, user) => {
  return createBrowserRouter([
    {
      path: "/auth",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "orders",
          element: <AdminOrders />,
        },
        {
          path: "products",
          element: <AdminProducts />,
        },
      ],
    },
    {
      path: "/shop",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
      ],
    },
    {
      path: "/unauthorized",
      element: <UnAuthorized />,
    },
  ]);
};

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const router = useMemo(
    () => getRouter(isAuthenticated, user),
    [isAuthenticated, user]
  );
  if (isLoading) return <h1>loading....</h1>;
  return (
    <div className="overflow-hidden">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
