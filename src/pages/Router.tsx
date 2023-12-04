import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { ErrorComponent } from "@/components";
// import { Layout, Entry } from "@/pages"; // 왜 안돼지?
import { Layout } from "./Layout";
import { Entry } from "./Entry";

const generateRoute = (path, component, children?): RouteObject => {
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
    children: [generateRoute("/", <Entry />)],
  },
];

export const router = createBrowserRouter(routes);
