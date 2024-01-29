import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./main-page";
import PostPage from "./post-page";
import ErrorPage from "./error-page";
import Root from "./root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/posts",
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "posts/:postId",
        element: <PostPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
