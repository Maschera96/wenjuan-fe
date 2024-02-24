import React from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";

function App() {
  return <RouterProvider router={routerConfig} />;
}

export default App;
