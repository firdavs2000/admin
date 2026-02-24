import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";

import MainLayout from "../auth/MainLayout";
import AuthLayout from "../auth/AuthLayout";

import AuthLogin from "../pages/AuthLogin.tsx";
import Dashboard from "../components/Dashboard/Dashboard.tsx";
import ProductsPage from "../components/products/ProductsPage.tsx";
import AddProductPage from "../components/products/AddProductPage.tsx";


export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <AuthLogin /> }
    ]
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "products", element: <ProductsPage /> },
      { path: "addproductpage", element: <AddProductPage /> },
     
    ]
  },
  
]);
