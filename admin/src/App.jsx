import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Products from "./pages/products/Products";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import Users from "./pages/users/Users";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
      </div>,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "products", element: <Products /> },
        { path: "orders", element: <Orders /> },
        { path: "users", element: <Users /> },
        { path: "settings", element: <Settings /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
