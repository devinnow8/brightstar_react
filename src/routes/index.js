import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import SideBar from "../components/Sidebar";

import { ROUTES } from "../utils/routes";
function AuthRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  // if (!accessToken) {
  //   //Not signed in
  //   return <Navigate to="/" />;
  // }
  //Signed in
  return (
    <>
      {" "}
      <SideBar />
      {children}
    </>
  );
}

function Routing() {
  const location = useLocation();
  console.log("dddd", location.pathname);
  return (
    <>
      <main className="main">
        <div className={`right-content ${location.pathname === '/' ? 'login-content' : ''}`}>
          <Routes>
            {}
            <Route path="/" element={<Login />} />
            {Object.values(ROUTES).map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<AuthRoute>{route.element}</AuthRoute>}
                />
              );
            })}
          </Routes>
        </div>
      </main>
    </>
  );
}

export default Routing;
