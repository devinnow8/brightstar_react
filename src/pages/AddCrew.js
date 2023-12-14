import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const crewDropdownData = [
  { id: "dropdown1", label: "Label 1", name: 'Dropdown 1' },
  { id: "dropdown2", label: "Label 2", name: 'Dropdown 2' },
  { id: "dropdown3", label: "Label 3", name: 'Dropdown 3' },
  { id: "dropdown4", label: "Label 4", name: 'Dropdown 4' },
];

const AddCrew = () => {

  const [manageCrewDropdownData, setManageCrewDropdownData] = useState(
    crewDropdownData.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {})
  );

  const toggleCrewDropdown = (dropdownId) => {
    setManageCrewDropdownData((prevState) => ({
      ...prevState,
      [dropdownId]: !prevState[dropdownId],
    }));
  };

  const navigate = useNavigate();
  return (
    <div className="crew-mgmt">
      <button
        className="primary-btn mb-4"
        onClick={() => navigate("/projects")}
      >
        Back
      </button>

      <div className="crew-mgmt-card">
        <div className="crew-flex row">{crewDropdownData.map((dropdown) => (
          <div className="col-md-6 col-lg-3">
            <label htmlFor="">{dropdown.label}</label>
            <Dropdown
              key={dropdown.id}
              isOpen={manageCrewDropdownData[dropdown.id]}
              toggle={() => toggleCrewDropdown(dropdown.id)}
            >
              <DropdownToggle className="primary-btn" onSelect={(e) => console.log("event ===>", e)} caret>{dropdown.name}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCrew;
