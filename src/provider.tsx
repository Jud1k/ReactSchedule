import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import SchedulePage from "./pages/SchedulePage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { RootStoreContext } from "./root-store-context";
import RootStore from "./store/root-store";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/schedule", element: <SchedulePage/> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/schedule", element: <SchedulePage/> },
    ],
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <RegisterPage />,
    path: "/register",
  },
]);


export const App = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
        <RouterProvider router={router} />
    </RootStoreContext.Provider>
  );
};
