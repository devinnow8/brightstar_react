import React from "react";

const SideBar = () => {
  const sideBarItems = [
    { name: "Projects", route: "/projects" },
    { name: "Users", route: "/users" },
    { name: "Equipment", route: "/equipments" },
  ];
  console.log(sideBarItems);
  return (
    <>
      <div className="col-md-3 col-xl-2 bg-dark">
        <div className="sidebar text-white">
          <h3 className="logo">BrightStar</h3>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            {sideBarItems.map((item, key) => {
              return (
                <li className="nav-item" key={key}>
                  {/* <Link to=></Link> */}
                  <a
                    href={item.route}
                    className="nav-link align-middle px-0"
                  >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">
                      {item.name}
                    </span>
                  </a>
                </li>
              );
            })}
            {/* <li>
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-4 bi-speedometer2"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Users</span>{" "}
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Equipments</span>
              </a>
            </li> */}
          </ul>
          <hr />
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
              <span className="d-none d-sm-inline mx-1">loser</span>
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
                <a className="dropdown-item" href="/">
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
