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
import TimeCards from "../pages/TimeSheetStatus";

export const ROUTES = {
  HOME: {
    path: "/projects",
    element: <HomePage />,
    availability: ["all"],
  },
  LOGIN: {
    path: "/",
    element: <Login />,
    availability: ["all"],
  },
  TIME_SHEET: {
    path: "/time-sheet",
    element: <TimeSheet />,
    availability: ["all"],
  },
  USERS: {
    path: "/users",
    element: <Users />,
    availability: ["all"],
  },
  PROJECT_DETAILS: {
    path: "/project-details/:id?",
    element: <ProjectDetails />,
    availability: ["all"],
  },
  USERDETAILS: {
    path: "/user-details/:id?",
    element: <UserDetails />,
    availability: ["all"],
  },
  CREW: {
    path: "/crew-management/:projectId/:crewId?",
    element: <CrewManagement />,
    availability: ["all"],
  },
  CREW_MANAGEMENT: {
    path: "/all-crews-management",
    element: <AllCrewsManagement />,
    availability: ["all"],
  },
  TIME_CARDS: {
    path: "/time-card",
    element: <TimeCards />,
    availability: ["Forman", "General Forman"],
  },
  NOTFOUND: {
    path: "*",
    element: <NotFound />,
    availability: ["all"],
  },
};
