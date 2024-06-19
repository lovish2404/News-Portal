import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { FullArticle } from "./pages/fullArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/article/:article_id",
    element: <FullArticle></FullArticle>,
  },
]);
export const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
