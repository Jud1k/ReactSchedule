import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import SchedulePage from "./pages/SchedulePage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import  Layout  from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {path:"/",element:<HomePage/>},
      {path:"/schedule",element:<SchedulePage isAdmin={false}/>}
    ]
  },
  {
    element:<AdminLayout />,
    children:[
      {path:"/admin",element:<AdminPage/>},
      {path:"/admin/schedule",element:<SchedulePage isAdmin={true}/>}
    ]
  },

]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
