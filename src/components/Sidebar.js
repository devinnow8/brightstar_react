import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Roles } from "../utils/constants";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let role_id;
  if (localStorage.getItem("role_id")) {
    role_id = JSON.parse(localStorage.getItem("role_id"));
  }
  const currentRoleAccess = Roles[role_id];

  const sideBarItems = [
    { name: "Projects", route: "/projects", label: "projects" },
    { name: "Users", route: "/users", label: "users" },

    { name: "Time Sheet", route: "/time-sheet", label: "time" },
  ];

  // if (
  //   currentRoleAccess === "Forman" ||
  //   currentRoleAccess === "General Forman"
  // ) {
  sideBarItems.push({
    name: "Time Cards",
    route: "/time-card",
    label: "cards",
  });
  // }
  if (currentRoleAccess === "Ops Manager") {
    sideBarItems.push({
      name: "Crew Management",
      route: "/all-crews-management",
      label: "crew",
    });
  }

  const currentSelectedTab = sideBarItems.findIndex((item) =>
    location.pathname.split("/")[1].includes(item.label)
  );
  const [selectedTab, setSelectedTab] = useState(
    currentSelectedTab !== -1
      ? sideBarItems[currentSelectedTab]?.name
      : sideBarItems[0].name
  );

  const signOutHandler = (event) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role_id");

    navigate("/");
  };

  const onTabClick = (item) => {
    setSelectedTab(item?.name);
  };

  return (
    <>
      <div className="sidebar text-white">
        <h3 className="logo">BrightStar</h3>
        <div className="sidebar-menu">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            {sideBarItems?.map((item, key) => {
              return (
                <li
                  onClick={() => onTabClick(item)}
                  className={
                    selectedTab === item?.name
                      ? "nav-item selectedTab"
                      : "nav-item"
                  }
                  key={key}
                >
                  <span className="nav-link align-middle px-0">
                    <Link
                      className="nav-link align-middle px-0"
                      to={item.route}
                    >
                      {item?.name}
                      <i className="fs-4 bi-house"></i>{" "}
                    </Link>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="dropdown">
            <a
              href="/"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="hugenerd"
                width="30"
                height="30"
                className="rounded-circle"
              />
              <span className="d-none d-sm-inline mx-1">User</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              {/* <li>
                <a className="dropdown-item" href="/">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li> */}
              <li>
                <a className="dropdown-item" href="/" onClick={signOutHandler}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="col py-3">content area...</div> */}
    </>
  );
};

export default SideBar;
