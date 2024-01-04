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
  addCostCode,
  getActiveCostCodes,
  removeCostCode,
} from "../API";
import Loader from "./Loader";
import AddProjectCrewUser from "../components/AddProjectCrewUser";
import { toast } from "react-toastify";
import { Button } from "bootstrap";
import ArrowLeft from "../assets/images/arrow-left.svg";
import { res } from "../utils/mockData";
import AddCrewEquipment from "../components/AddCrewEquipment";
// import axios from "axios";

const CrewManagement = () => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectOptions, setProjectOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [allEquipment, setAllEquipment] = useState(res?.data);
  const [roles, setRoles] = useState([]);
  // const [selectedCostCodes, setSelectedCostCodes] = useState([]);
  const { crewId, projectId } = useParams();
  const [costCodes, setCostCodes] = useState([]);
  const [activeCostCodes, setActiveCostCodes] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const request5 = await getRoleIds();
      const activeCostCodes = await getActiveCostCodes(crewId);
      setRoles(request5.data);
      setActiveCostCodes(activeCostCodes.data);

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

        let employeeArr = [];
        await empList.data.forEach((user) => {
          if (user.role.name === "member") {
            employeeArr.push({
              value: user.id,
              name: user.name,
              employee_id: user?.employee_id,
            });
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

  const crewTableHeadings = ["Name", "Employee ID"];
  const crewEquipmentHeadings = ["Items", "Equpiments"];

  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  function handleSelectChange(event, dropdown) {
    const obj = { ...selectedOptions };
    obj[dropdown] = Number(event.target.value);

    setSelectedOptions(obj);
    const selectedRoleUser = roles.find((role) => role.name === dropdown);
    const payload = {
      crew_id: Number(crewId),
      user_id: Number(event?.target?.value),
      crew_role_id: selectedRoleUser?.id,
    };
    addNewCrewMember(payload);
  }

  const addNewCrewMember = async (payload) => {
    await addCrewUser(payload).then((res) => {
      if (res?.status === 200) {
        toast.success("Changed Successfully");
      }
    });
  };
  const navigate = useNavigate();
  const onRowSelection = async (e, item, key) => {
    if (e.target.checked) {
      console.log("itemitemitem", item);
      const costCodePayload = {
        crew_id: Number(crewId),
        project_cost_code_id: item?.id,
      };

      await addCostCode(costCodePayload).then(async (res) => {
        if (res?.status === 200) {
          toast.success("Cost code added Successfully");
        }
      });
    } else {
      const costCodePayload = {
        is_active: false,
      };

      await removeCostCode(costCodePayload, item.id).then((res) => {
        if (res?.status === 200) {
          toast.success("Cost code removed Successfully");
        }
      });
    }
    const activeCostCodes = await getActiveCostCodes(crewId);
    setActiveCostCodes(activeCostCodes.data);
  };
  console.log("costCodes11", costCodes);
  console.log("userOptionssssss", userOptions);

  return (
    <div className="crew-mgmt">
      <button
        className="primary-btn back-btn mb-4"
        onClick={() => navigate("/projects")}
      >
        <img src={ArrowLeft} />
        Back
      </button>
      <div className="crew-mgmt-card">
        <div class="row">
          <div class="col-xl-5">
            <div className="crew-flex row">
              {projectOptions?.length > 0 ? (
                <>
                  <div className="row mb-3">
                    <label className="col-xl-3 col-form-label" htmlFor="">
                      Project Id
                    </label>
                    <div class="col-xl-9">
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
                  <div className="row mb-3">
                    <label className="col-xl-3 col-form-label" htmlFor="">
                      Foreman
                    </label>
                    <div class="col-xl-9">
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
                  <div className="row mb-3">
                    <label className="col-xl-3 col-form-label" htmlFor="">
                      General Foreman
                    </label>
                    <div class="col-xl-9">
                      <select
                        onChange={(e) =>
                          handleSelectChange(e, "General Forman")
                        }
                        className="form-select"
                        aria-label="Default select example"
                      >
                        {employeeOptions &&
                          employeeOptions?.map((option) => {
                            return (
                              <option
                                selected={
                                  selectedOptions["General Forman"] ===
                                  option.value
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
                  <div className="row mb-3">
                    <label className="col-xl-3 col-form-label" htmlFor="">
                      Ops Manager
                    </label>
                    <div class="col-xl-9">
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
                                  selectedOptions["Ops Manager"] ===
                                  option.value
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
            </div>
          </div>
          <div class="col-xl-7">
            <>
              <h3>Cost code</h3>
              <div className="table-responsive cost-code-table">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      {["Team", "Cost code", "Description"].map((item, key) => (
                        <th scope="col" className="table-heading" key={key}>
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {costCodes && costCodes.length > 0
                      ? costCodes.map((costCode, key) => {
                          const activeCostCode = activeCostCodes.find(
                            (code) => code.project_cost_code_id === costCode.id
                          );
                          let selectedCostCode = costCode;
                          console.log(
                            "activeCostCodes111",
                            activeCostCodes,
                            costCode,
                            activeCostCode
                          );
                          if (activeCostCode) {
                            selectedCostCode = activeCostCode;
                          }

                          return (
                            <tr key={key}>
                              <td scope="col">
                                <input
                                  onChange={(evt) =>
                                    onRowSelection(evt, selectedCostCode, key)
                                  }
                                  type="checkbox"
                                  checked={!!activeCostCode}
                                />
                              </td>
                              <td>{costCode?.cost_code}</td>
                              <td>{costCode?.description}</td>
                            </tr>
                          );
                        })
                      : !loading && <tr>No data found</tr>}
                  </tbody>
                </table>
              </div>
            </>
          </div>
        </div>
      </div>

      <>
        {
          <div className="crew-tables">
            <div className="table-responsive">
              <div className="crew-title">
                <h3>Crew members</h3>
                <AddProjectCrewUser
                  state={crewId}
                  userOptions={employeeOptions}
                  onAddNewMember={onAddNewMember}
                />
              </div>
              <div className="crew-tb">
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
                        console.log("useruseruseruser", user);
                        console.log("useruseruseruserItem", item);
                        return (
                          <tr
                            className={
                              selectedUser.id === item.id ? "activeRow" : ""
                            }
                            onClick={() => setSelectedUser(item)}
                            key={key}
                          >
                            <td>{user?.name}</td>
                            <td>{user?.employee_id}</td>
                            <td className="details-td"></td>
                          </tr>
                        );
                      })
                    : !loading && <tr>No data found</tr>}
                </tbody>
              </table>
              </div>
              
            </div>
            <div className="table-responsive">
              <div className="crew-title">
                <h3>Crew Equipments</h3>
                <AddCrewEquipment
                  state={crewId}
                  userOptions={employeeOptions}
                  onAddNewMember={onAddNewMember}
                />
              </div>
              <div className="crew-tb">
              <table className="table table-striped">
                <thead>
                  <tr>
                    {crewEquipmentHeadings?.map((item, key) => (
                      <th scope="col" className="table-heading" key={key}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allEquipment && allEquipment.length > 0
                    ? allEquipment.map((item, key) => {
                        // const user = employeeOptions.find(
                        //   (user) => user.value === item.user_id
                        // );
                        return (
                          <tr
                            className={
                              selectedUser.id === item.id ? "activeRow" : ""
                            }
                            onClick={() => setSelectedUser(item)}
                            key={key}
                          >
                            <td>{item?.name}</td>
                            <td>{item?.acumatica_id}</td>
                            <td className="details-td"></td>
                          </tr>
                        );
                      })
                    : !loading && <tr>No data found</tr>}
                </tbody>
              </table>
              </div>
              
            </div>
          </div>
        }
      </>

      
      <>{}</>
    </div>
  );
};

export default CrewManagement;
