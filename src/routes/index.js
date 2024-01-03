import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "../pages/Login";
import SideBar from "../components/Sidebar";
import { Roles } from "../utils/constants";
import { ROUTES } from "../utils/routes";
import RoleSelect from "../pages/RoleSelect";


function AuthRoute({ children, userroles }) {
  const accessToken = localStorage.getItem("accessToken");
  let role_id;
  console.log("userroles", Roles, userroles);
  if (localStorage.getItem("role_id")) {
    role_id = JSON.parse(localStorage.getItem("role_id"));
  }
  const navigate = useNavigate();

  const currentRoleAccess = Roles[role_id];
  if (!accessToken) {
    //Not signed in
    return <Navigate to="/" />;
  }
  //Signed in
  console.log(
    "currentRoleAccess",
    userroles,
    currentRoleAccess,
    userroles.includes(currentRoleAccess) || userroles.includes("all")
  );
  if (role_id) {
    if (userroles.includes(currentRoleAccess) || userroles.includes("all")) {
      console.log("trueee");
      return (
        <>
          {" "}
          {/* <SideBar /> */}
          {children}
        </>
      );
    } else {
      return <Navigate to="/projects" />;
    }
  } else {
    return <Navigate to="/" />;
  }
}

function Routing() {
  const location = useLocation();
  console.log("pathnamepathnamepathname", location.pathname);
    const selectRole = location.pathname.split("/");
    console.log("selectRoleselectRole", selectRole);
  return (
    <>
      <main className="main">
        <div
          className={`right-content ${
            location.pathname === "/" || location.pathname.includes("/role-select") ? "login-content" : ""
          }`}
        >
          <Routes>
            {}
            <Route path="/" element={<Login />} />
            <Route path="/role-select/:id" element={<RoleSelect />} />
            {Object.values(ROUTES).map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <AuthRoute userroles={route?.availability}>
                      {route.element}
                    </AuthRoute>
                  }
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
