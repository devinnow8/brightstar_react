import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Equipments from "../pages/Equipments";
import SideBar from "../components/Sidebar";
import Users from "../pages/Users";
import ProjectDetails from "../pages/ProjectDetails";

function Routing() {
  let logged = true;
  return (
    <>
      <Router>
        {logged ? (
          <>
            <main className="main">
              <SideBar />
              <div className="col-md-9 col-xl-10">
                <Routes>
                  <Route path="/projects" element={<HomePage />} />
                  <Route path="/equipments" element={<Equipments />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/projects/project-details" element={<ProjectDetails />} />
                  <Route path="*" element={<div>404 Error</div>} />
                </Routes>
              </div>
            </main>
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
