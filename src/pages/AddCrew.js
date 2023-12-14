import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


const CrewManagement = () => {
  const crewDropdownData = [
    { id: "Project", label: "Project", name: "Dropdown 1" },
    { id: "Forman", label: "Forman", name: "Dropdown 2" },
    { id: "General Forman", label: "General Forman", name: "Dropdown 3" },
    { id: "Ops Manager", label: "Ops Manager", name: "Dropdown 4" },
  ];
  const tableHeadings = ["Name", "Boss_Id"];

  const dummyData = [
    { name: "Name", boss_user_id: "boss_user_id" },
    { name: "Name", boss_user_id: "boss_user_id" },
    { name: "Name", boss_user_id: "boss_user_id" },
    { name: "Name", boss_user_id: "boss_user_id" },
  ];

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
        <div className="crew-flex row">
          {crewDropdownData.map((dropdown) => (
            <div className="col-md-6 col-lg-3">
              <label htmlFor="">{dropdown.label}</label>
              <Dropdown
                key={dropdown.id}
                isOpen={manageCrewDropdownData[dropdown.id]}
                toggle={() => toggleCrewDropdown(dropdown.id)}
              >
                <DropdownToggle
                  className="primary-btn"
                  onSelect={(e) => console.log("event ===>", e)}
                  caret
                >
                  {dropdown.name}
                </DropdownToggle>
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
      <div className="table-responsive team-table">
        <table class="table table-striped">
          <thead>
            {tableHeadings.map((item, key) => (
              <th scope="col" className="table-heading" key={key}>
                {item}
              </th>
            ))}
          </thead>
          <tbody>
            {dummyData?.map((item, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{item.name}</th>
                  <td>{item.boss_user_id}</td>
                  <td>{item.project_id}</td>
                  <td className="details-td">
                    {/* <button
                      className="btn btn-info detail-btn"
                      //   onClick={() => detailHandler(item.id)}
                    >
                      Details
                    </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-end">
      <button
          className="primary-btn mb-4"
          // onClick={() => navigate("/projects")}
        >
          Add Team Projects
      </button>
      </div>
    </div>
  );
};

export default CrewManagement;
