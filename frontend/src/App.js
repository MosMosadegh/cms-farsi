import React from "react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import Sidebar from "./Components/Sidbar/Sidebar";
import Header from "./Components/Header/Header";

import "./App.css";

function App() {
  let router = useRoutes(routes);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-3 sidebar">
          <Sidebar />
        </div>
        <div className="col main">
          <Header />
          {router}
        </div>
      </div>
    </div>
  );
}

export default App;
