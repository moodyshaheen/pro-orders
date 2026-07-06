import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Products from "./pages/products/Products";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import Users from "./pages/users/Users";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import AdminLogin from "./pages/login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout onLogout={() => { localStorage.removeItem("adminToken"); setIsLoggedIn(false); }} />,
      errorElement: (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>404 - Page Not Found</h2>
        </div>
      ),
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
