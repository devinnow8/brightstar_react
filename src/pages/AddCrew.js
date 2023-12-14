import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  getAllProjectList,
  getUserDetails,
  getProjectUserDetails,
  getAllCrewUser,
} from "../API";
import Loader from "./Loader";
import AddProjectCrewUser from "../components/AddProjectCrewUser";
// import axios from "axios";

const CrewManagement = () => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  // const [data2, setData2] = useState([]);
  // const [data3, setData3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectOptions, setProjectOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  const fetchData = async () => {
    try {
      const request1 = getAllProjectList();
      const request2 = getUserDetails();
      const request3 = getAllCrewUser();
      const request4 = getProjectUserDetails();

      const [projects, employees, userOptions, empList] = await Promise.all([
        request1,
        request2,
        request3,
        request4,
      ]);

      if (projects && employees && userOptions) {
        setLoading(false);
        const projectLists = projects.data.map((project) => {
          return { value: project.id, name: project.id };
        });
        // const employeesLists = employees.data.map((project) => {
        //   return { value: project.name, name: project.name };
        // });

        let employeeArr = [];
        await empList.data.forEach((user) => {
          if (user.role.name === "member") {
            employeeArr.push({ value: user.id, name: user.name });
          }
        });
        console.log("roleList", employeeArr);
        setProjectOptions(projectLists);
        setEmployeeOptions(employeeArr);
        setUserOptions(userOptions.data);

        // setData3(response3.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("thirdApi==>>", userOptions);
  const crewDropdownData = [
    { id: "dropdown1", label: "Label 1", name: "Dropdown 1" },
    { id: "dropdown2", label: "Label 2", name: "Dropdown 2" },
    { id: "dropdown3", label: "Label 3", name: "Dropdown 3" },
    { id: "dropdown4", label: "Label 4", name: "Dropdown 4" },
  ];
  const tableHeadings = ["Name", "Boss_Id"];
  const crewTableHeadings = ["Id", "User_Id", "Crew_Id"];

  const [manageCrewDropdownData, setManageCrewDropdownData] = useState(
    crewDropdownData.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {})
  );

  const toggleCrewDropdown = (dropdownId) => {
    setManageCrewDropdownData((prevState) => ({
      ...prevState,
      [dropdownId]: !prevState[dropdownId],
    }));
  };
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  const options = [
    { name: "one", value: 1 },
    { name: "two", value: 2 },
    { name: "three", value: 3 },
  ];

  function handleSelectChange(event, dropdown) {
    console.log("lll", dropdown, selectedOptions[dropdown]);
    // { ...selectedOptions, selectedOptions[dropdown] = event.target.value})
    // ...selectedOptions,
    // (selectedOptions[dropdown] = event.target.value)
    const obj = { ...selectedOptions };
    obj[dropdown] = event.target.value;
    setSelectedOptions(obj);
    console.log("pppp", event.target.value, dropdown);
  }
  console.log("selectedOptions", selectedOptions);
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
          {projectOptions.length > 0 ? (
            <>
              <div className="col-md-6 col-lg-3">
                <div className="mb-3 mb-lg-0">
                  <label htmlFor="">Label 1</label>
                  <select
                    onChange={(e) => handleSelectChange(e, "project")}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {projectOptions &&
                      projectOptions?.map((option) => {
                        return (
                          <option
                            selected={
                              selectedOptions["project"] === option.value
                            }
                            value={option.value}
                          >
                            {option.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div>
                  <label htmlFor="">Foreman</label>
                  <select
                    onChange={(e) => handleSelectChange(e, "employee")}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {employeeOptions &&
                      employeeOptions?.map((option) => {
                        return (
                          <option
                            selected={
                              selectedOptions["foreman"] === option.value
                            }
                            value={option.value}
                          >
                            {option.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div>
                  <label htmlFor="">General Foreman</label>
                  <select
                    onChange={(e) => handleSelectChange(e, "project")}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {employeeOptions &&
                      employeeOptions?.map((option) => {
                        return (
                          <option
                            selected={
                              selectedOptions["gForeMan"] === option.value
                            }
                            value={option.value}
                          >
                            {option.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div>
                  <label htmlFor="">Ops Manager</label>
                  <select
                    onChange={(e) => handleSelectChange(e, "project")}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {employeeOptions &&
                      employeeOptions?.map((option) => {
                        return (
                          <option
                            selected={
                              selectedOptions["manager"] === option.value
                            }
                            value={option.value}
                          >
                            {option.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <Loader />
          )}
          {/* {crewDropdownData.map((dropdown) => (
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
          ))} */}
        </div>
      </div>
      <AddProjectCrewUser userOptions={userOptions} />
      {/* <div className="text-end">
        <button
          className="primary-btn mb-4"
          onClick={() => AddProjectCrewUser()}
          // onClick={() => navigate("/projects")}
        >
          Add Crew Users
        </button>
      </div> */}
      {console.log("hhhhhh", userOptions)}
      {userOptions?.map((item, key) => {
        return (
          <>
            <div className="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    {crewTableHeadings?.map((item, key) => (
                      <th scope="col" className="table-heading" key={key}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className={selectedUser.id === item.id ? "activeRow" : ""}
                    onClick={() => setSelectedUser(item)}
                    key={key}
                  >
                    <th scope="row" className="table-heading">{item.id}</th>
                    <td>{item.user_id}</td>
                    <td>{item.crew_id}</td>
                    <td>{item.description}</td>
                    <td className="details-td"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CrewManagement;
