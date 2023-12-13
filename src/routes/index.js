import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Equipments from "../pages/Equipments";
import SideBar from "../components/Sidebar";

function Routing() {
  let logged = true;
  return (
    <>
      <Router>
        {logged ? (
          <>
            <div className="screens-container">
              <SideBar />
              <div className="screens-section-container">
                <Routes>
                  <Route path="/projects" element={<HomePage />} />
                  <Route path="/equipments" element={<Equipments />} />
                  <Route path="*" element={<div>404 Error</div>} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </>
        )}
      </Router>
    </>
  );
}

export default Routing;
