import React, { useState } from "react";
import { addCrewUser, addProjectUser } from "../API";

const AddProjectCrewUser = ({ userOptions, state }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const crewTableHeadings = ["User Id", "Name"];

  const onAddNewUser = () => {
    addNewCrewMemberPromise(selectedUser);
  };

  const addNewCrewMemberPromise = async (data) => {
    console.log("daatatatatta", data);
    const crewUserPayload = {
      crew_id: state?.crew_id,
      user_id: data?.value,
    };
    const projectUserPayload = {
      user_id: data?.value,
      project_id: state?.project_id,
      project_role_id: 4,
    };

    await addCrewUser(crewUserPayload).then((res) => {
      console.log("addCrewUserRes", res);
      if (res?.status === 200) {
        console.log("addCrewUserRes success", res);
        addProjectUser(projectUserPayload).then((res) => {
          console.log("addProjectUser res", res);
          if(res?.status === 200){
            window.location.reload();
          }
        })
      }
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-info detail-btn primary-btn mb-4 px-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        // onClick={() => onAddCrewClick()}
      >
        + Add Member
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
                Add A New Member To This Crew
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <>
                <div className="table-responsive">
                  <table class="table crew-modal-table table-striped">
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
                      {userOptions?.map((item, key) => {
                        return (
                          <tr
                            className={
                              selectedUser.value === item.value
                                ? "activeRow"
                                : ""
                            }
                            onClick={() => setSelectedUser(item)}
                            key={key}
                          >
                            {/* <td>{item.id}</td> */}
                            <td>{item.value}</td>
                            <td>{item.name}</td>
                            {/* <td>{item.description}</td> */}
                            <td className="details-td"></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            </div>
            <div class="modal-footer">
              <button
                data-bs-dismiss="modal"
                type="button"
                class="primary-btn"
                aria-label="Close"
                onClick={() => onAddNewUser()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectCrewUser;
