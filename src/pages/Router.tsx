import { Navigate, createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import { ErrorComponent } from "@/components";
import { Layout, Entry, Recommend, Login, SignUp } from "@/pages";
import { ReactNode } from "react";

const generateRoute = (
  path: string,
  component: ReactNode,
  children?: RouteObject[]
): RouteObject => {
  return {
    path: path,
    element: component,
    errorElement: <ErrorComponent />,
    children: children,
  };
};

export const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorComponent />,
    children: [
      generateRoute("/", <Entry />),
      generateRoute("/recommend", <Recommend />),
      generateRoute("/recommend/:id", <Recommend />),
      generateRoute("/login",<Login />),
      generateRoute("/signup", <SignUp />)
    ],
  },
];

export const router = createBrowserRouter(routes);
