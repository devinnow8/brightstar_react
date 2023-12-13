import React from "react";
import { useNavigate } from "react-router-dom";

const AddCrew = () => {
  const navigate = useNavigate();
  return (
    <div className="project-details">
      <button
        className="btn btn-primary back-btn"
        onClick={() => navigate("/projects")}
      >
        Back
      </button>
      <div className="dropdown">
        <button
          className="btn btn-primary back-btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onSelect={(e) => console.log("event ===>", e)}
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddCrew;
