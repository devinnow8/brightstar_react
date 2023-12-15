import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const sideBarItems = [
    { name: "Projects", route: "/projects" },
    { name: "Users", route: "/users" },
    { name: "Crew Management", route: "/all-crews-management" },
    // { name: "Equipment", route: "/equipments" },
  ];
  const [selectedTab, setSelectedTab] = useState(sideBarItems[0].name);

  const signOutHandler = (event) => {
    // event.preventDefault();
    localStorage.removeItem("accessToken");
    // isLogged((prevLogged) => !prevLogged);
    navigate("/");
  };

  const onTabClick = (item) => {
    setSelectedTab(item.name);
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
            {sideBarItems.map((item, key) => {
              return (
                <li
                  onClick={() => onTabClick(item)}
                  className={
                    selectedTab === item.name
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
                      {item.name}
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
              <span className="d-none d-sm-inline mx-1">Winner</span>
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
