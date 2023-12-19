import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  getAllProjectList,
  getUserDetails,
  getAllCrewUser,
  getProjectUserDetails,
  getRoleIds,
  addCrewUser,
  addProjectUser,
  getCostCodesByProjectId,
} from "../API";
import Loader from "./Loader";
import AddProjectCrewUser from "../components/AddProjectCrewUser";
import { toast } from "react-toastify";
import { Button } from "bootstrap";
// import axios from "axios";

const CrewManagement = () => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectOptions, setProjectOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [roles, setRoles] = useState([]);
  // const [selectedCostCodes, setSelectedCostCodes] = useState([]);
  const { crewId, projectId } = useParams();
  const [costCodes, setCostCodes] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const request5 = await getRoleIds();
      setRoles(request5.data);

      const [projects, employees, userOptions, empList, projectCostCodes] =
        await Promise.all([
          getAllProjectList(),
          getUserDetails(),
          getAllCrewUser(crewId),
          getProjectUserDetails(),
          getCostCodesByProjectId(projectId),
        ]);
      console.log("projectCostCodes", projectCostCodes.data);
      if (projectCostCodes?.data?.length) {
        setCostCodes(projectCostCodes.data);
      }

      if (projects && employees && userOptions) {
        setLoading(false);
        const projectLists = projects.data?.map((project) => {
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

        setProjectOptions(projectLists);
        setEmployeeOptions(employeeArr);
        const filteredCrewMembers = userOptions?.data?.filter(
          (ele) => ele.crew_role_id === 4
        );
        setUserOptions(filteredCrewMembers);
        const selectedByDefaultOptions = {
          project: projectLists[0].value,
          Forman: employeeArr[0].value,
          "General Forman": employeeArr[0].value,
          "Ops Manager": employeeArr[0].value,
        };
        setSelectedOptions(selectedByDefaultOptions);

        // setData3(response3.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const onAddNewMember = async () => {
    const userOptions = await getAllCrewUser(crewId);
    const filteredCrewMembers = userOptions?.data?.filter(
      (ele) => ele.crew_role_id === 4
    );
    setUserOptions(filteredCrewMembers);
    toast.success("New member added successfully");
  };

  const crewTableHeadings = ["User Id", "Name", "Crew Id"];

  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  function handleSelectChange(event, dropdown) {
    const obj = { ...selectedOptions };
    obj[dropdown] = Number(event.target.value);

    setSelectedOptions(obj);
    const selectedRoleUser = roles.find((role) => role.name === dropdown);
    const data = {
      user_id: Number(event.target.value),
      project_role_id: selectedRoleUser.id,
    };
    addNewCrewMember(data);
  }

  const addNewCrewMember = async (data) => {
    const crewUserPayload = {
      crew_id: Number(crewId),
      user_id: data?.user_id,
      crew_role_id: 4,
    };
    // const projectUserPayload = {
    //   user_id: data?.user_id,
    //   project_id: Number(projectId),
    //   project_role_id: data.project_role_id,
    // };

    await addCrewUser(crewUserPayload).then((res) => {
      if (res?.status === 200) {
        toast.success("Changed Successfully");
        // addProjectUser(projectUserPayload).then((res) => {
        //   if (res?.status === 200) {
        //   }
        // });
      }
    });
  };

  console.log("selectedOptions", selectedOptions);
  const navigate = useNavigate();
  const onRowSelection = (e, item) => {
    if (e.target.checked) {
      // setSelectedCostCodes(item);
    }
  };
  console.log("costCodes11", costCodes);

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
          {projectOptions?.length > 0 ? (
            <>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="mb-3 mb-lg-0">
                  <label htmlFor="">Project Id</label>
                  <select
                    disabled={true}
                    defaultValue={Number(projectId)}
                    onChange={(e) => handleSelectChange(e, "project")}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    {projectOptions &&
                      projectOptions?.map((option) => {
                        return (
                          <option
                            disabled="disabled"
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
              <div className="col-md-6 col-lg-6 col-xl-3 mb-3 mb-xl-0">
                <div>
                  <label htmlFor="">Foreman</label>
                  <select
                    onChange={(e) => handleSelectChange(e, "Forman")}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    {employeeOptions &&
                      employeeOptions?.map((option) => {
                        return (
                          <option
                            selected={
                              selectedOptions["Forman"] === option.value
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
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div>
                  <label htmlFor="">General Foreman</label>
                  <select
                    onChange={(e) => handleSelectChange(e, "General Forman")}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    {employeeOptions &&
                      employeeOptions?.map((option) => {
                        return (
                          <option
                            selected={
                              selectedOptions["General Forman"] === option.value
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
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div>
                  <label htmlFor="">Ops Manager</label>
                  <select
                    onChange={(e) => handleSelectChange(e, "Ops Manager")}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    {employeeOptions &&
                      employeeOptions?.map((option) => {
                        return (
                          <option
                            selected={
                              selectedOptions["Ops Manager"] === option.value
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
        {/* <>
          <h3>Cost codes</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                {["Team", "id", "Cost code", "Description"].map((item, key) => (
                  <th scope="col" className="table-heading" key={key}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {costCodes && costCodes.length > 0
                ? costCodes.map((costCode, key) => {
                    return (
                      <tr key={key}>
                        <td scope="col">
                          <input
                            onChange={(evt) => onRowSelection(evt, costCode)}
                            type="checkbox"
                          />
                        </td>
                        <td>{costCode.id}</td>

                        <td>{costCode?.cost_code}</td>
                        <td>{costCode?.description}</td>
                      </tr>
                    );
                  })
                : !loading && <tr>No data found</tr>}
            </tbody>
          </table>
        </> */}
      </div>
      <AddProjectCrewUser
        state={crewId}
        userOptions={employeeOptions}
        onAddNewMember={onAddNewMember}
      />

      <>
        {
          <div className="table-responsive">
            <h3>Crew members</h3>
            <table className="table table-striped">
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
                {/* {userOptions?.map((item, key) => {
                  return (
                    <tr
                      className={selectedUser.id === item.id ? "activeRow" : ""}
                      onClick={() => setSelectedUser(item)}
                      key={key}
                    >
                      <th scope="row" className="table-heading">
                        {item.id}
                      </th>
                      <td>{item.user_id}</td>
                      <td>{item.crew_id}</td>
                      <td>{item.description}</td>
                      <td className="details-td"></td>
                    </tr>
                  );
                  
                })} */}
                {userOptions && userOptions.length > 0
                  ? userOptions.map((item, key) => {
                      const user = employeeOptions.find(
                        (user) => user.value === item.user_id
                      );
                      return (
                        <tr
                          className={
                            selectedUser.id === item.id ? "activeRow" : ""
                          }
                          onClick={() => setSelectedUser(item)}
                          key={key}
                        >
                          <th scope="row" className="table-heading">
                            {item?.user_id}
                          </th>
                          <td>{user?.name}</td>
                          <td>{item?.crew_id}</td>
                          <td>{item?.description}</td>
                          <td className="details-td"></td>
                        </tr>
                      );
                    })
                  : !loading && <tr>No data found</tr>}
              </tbody>
            </table>
          </div>
        }
      </>
    </div>
  );
};

export default CrewManagement;
