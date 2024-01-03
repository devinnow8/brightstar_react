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
import TimeCard from "../pages/TimeCard";
import RoleSelect from "../pages/RoleSelect";

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
    element: <TimeCards />,
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
    availability: ["Ops Manager"],
  },
  // TIME_CARDS: {
  //   path: "/time-card",
  //   element: <TimeCards />,
  //   // availability: ["Forman", "General Forman"],
  //   availability: ["all"],
  // },
  TIME_CARD: {
    path: "/timesheet-card/:id",
    element: <TimeCard />,
    // availability: ["Forman", "General Forman"],
    availability: ["all"],
  },
  ROLE_SELECT: {
    path: "/role-select/:id",
    element: <RoleSelect />,
    availability: ["all"],
  },
  NOTFOUND: {
    path: "*",
    element: <NotFound />,
    availability: ["all"],
  },
};
