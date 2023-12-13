import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Equipments from "../pages/Equipments";
import SideBar from "../components/Sidebar";
import Users from "../pages/Users";
import ProjectDetails from "../pages/ProjectDetails";
import UserDetails from "../pages/UserDetails";
import AddCrew from "../pages/AddCrew";

function Routing() {
  let logged = true;
  return (
    <>
      <Router>
        {logged ? (
          <>
            <main className="main">
              <SideBar />
              <div className="right-content">
                <Routes>
                  <Route path="/projects" element={<HomePage />} />
                  <Route path="/equipments" element={<Equipments />} />
                  <Route path="/users" element={<Users />} />
                  <Route
                    path="/project-details/:id?"
                    element={<ProjectDetails />}
                  />
                  <Route path="/user-details/:id?" element={<UserDetails />} />
                  <Route path="/crew-management/:id?" element={<AddCrew />} />
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
