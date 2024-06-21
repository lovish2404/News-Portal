import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { FullArticle } from "./pages/fullArticle";
import { Bookmarks } from "./pages/bookmarks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/article/:article_id",
    element: <FullArticle></FullArticle>,
  },
  {
    path: "/bookmarks",
    element: <Bookmarks></Bookmarks>,
  },
]);
export const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
