import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Equipments from "../pages/Equipments";
import SideBar from "../components/Sidebar";
import Users from "../pages/Users";
import ProjectDetails from "../pages/ProjectDetails";
import UserDetails from "../pages/UserDetails";
import CrewManagement from "../pages/AddCrew";
export const ROUTES = {
  HOME: {
    path: "/projects",
    element: <HomePage />,
  },
  LOGIN: {
    path: "/",
    element: <Login />,
  },
  EQUIPMENTS: {
    path: "/equipments",
    element: <Equipments />,
  },
  USERS: {
    path: "/users",
    element: <Users />,
  },
  PROJECT_DETAILS: {
    path: "/project-details/:id?",
    element: <ProjectDetails />,
  },
  USERDETAILS: {
    path: "/user-details/:id?",
    element: <UserDetails />,
  },
  CREW: {
    path: "/crew-management/:id?",
    element: <CrewManagement />,
  },
  NOTFOUND: {
    path: "*",
    element: <div>404 Error</div>,
  },
};
