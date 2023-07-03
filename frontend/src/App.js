import React from "react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import Sidebar from "./Components/Sidbar/Sidebar";
import Header from "./Components/Header/Header";

import "./App.css";

function App() {
  let router = useRoutes(routes);
  return (
      <>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <Header />
        {router}
      </div>
      </>
  );
}

export default App;
