import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import SchedulePage from "./pages/SchedulePage";
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:"/schedule",
    element:<SchedulePage/>,
    children:[{
      index:true,element:<SchedulePage/>
    }]
  },
  {
    path:"/schedule/:groupId",
    element:<SchedulePage/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
