import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import SideBar from "../components/Sidebar";

import { ROUTES } from "../utils/routes";
function AuthRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    //Not signed in
    return <Navigate to="/" />;
  }
  //Signed in
  return (
    <>
      {" "}
      <SideBar />
      {children}
    </>
  );
}

function Routing({ logged, isLogged }) {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <>
      <main className="main">
        <div className="right-content">
          <Routes>
            {}
            <Route
              path="/"
              element={<Login logged={logged} isLogged={isLogged} />}
            />
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
