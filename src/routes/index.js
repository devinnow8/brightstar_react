import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import HomePage from "../pages/HomePage";
// import Login from "../pages/Login";
// import Equipments from "../pages/Equipments";
import SideBar from "../components/Sidebar";

function Routing() {
  return (
    <>
      <Router>
        <SideBar />
      </Router>
    </>
  );
}

export default Routing;
