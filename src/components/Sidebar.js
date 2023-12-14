import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const sideBarItems = [
    { name: "Projects", route: "/projects" },
    { name: "Users", route: "/users" },
    { name: "Equipment", route: "/equipments" },
  ];

  const signOutHandler = (event) => {
    // event.preventDefault();
    localStorage.removeItem("accessToken");
    // isLogged((prevLogged) => !prevLogged);
    navigate("/");
  };

  console.log(sideBarItems);
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
                <li className="nav-item" key={key}>
                  {/* <Link to=></Link> */}
                  <a href={item.route} className="nav-link align-middle px-0">
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="dropdown pb-4">
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
              <li>
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
              </li>
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
