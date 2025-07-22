import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import SchedulePage from "./pages/SchedulePage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { RootStoreContext } from "./root-store-context";
import RootStore from "./store/root-store";
const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/schedule", element: <SchedulePage isAdmin={false} /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/schedule", element: <SchedulePage isAdmin={true} /> },
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

// createRoot(document.getElementById("root")!).render(
//   <RootStoreContext.Provider value={new RootStore()}>
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   </RootStoreContext.Provider>
// );

export const App = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RootStoreContext.Provider>
  );
};
