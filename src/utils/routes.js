import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Equipments from "../pages/Equipments";
import SideBar from "../components/Sidebar";
import Users from "../pages/Users";
import ProjectDetails from "../pages/ProjectDetails";
import UserDetails from "../pages/UserDetails";
import CrewManagement from "../pages/AddCrew";
import AllCrewsManagement from "../pages/AllCrewsManagement";
import NotFound from "../components/NotFound";
import TimeSheet from "../pages/TimeSheet";
import TimeCards from '../pages/TimeSheetStatus'

export const ROUTES = {
  HOME: {
    path: "/projects",
    element: <HomePage />,
  },
  LOGIN: {
    path: "/",
    element: <Login />,
  },
  TIME_SHEET: {
    path: "/time-sheet",
    element: <TimeSheet />,
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
    path: "/crew-management/:projectId/:crewId?",
    element: <CrewManagement />,
  },
  CREW_MANAGEMENT: {
    path: "/all-crews-management",
    element: <AllCrewsManagement />,
  },
  TIME_CARDS: {
    path: "/time-card",
    element: <TimeCards />,
  },
  NOTFOUND: {
    path: "*",
    element: <NotFound />,
  },
};
