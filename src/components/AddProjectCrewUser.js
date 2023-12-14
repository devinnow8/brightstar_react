import React, { useState } from "react";

const AddProjectCrewUser = ({ userOptions }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const crewTableHeadings = ["User Id", "Name"];

  const onAddNewUser = () => {
    console.log("selectedUser", selectedUser);
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
        + Add Crew
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
                Add New Crew To This Project
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                // onClick={() => onClickCross()}
              ></button>
            </div>
            <div class="modal-body">
              {/* <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Name
                  </label>
                  <input
                    // value={addCrewDetails?.name}
                    // onChange={(e) => onHandleChange(e)}
                    name="name"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Boss_user_id
                  </label>
                  <input
                    // value={addCrewDetails?.boss_user_id}
                    // onChange={(e) => onHandleChange(e)}
                    name="boss_user_id"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Project_id
                  </label>
                  <input
                    disabled={true}
                    // value={projectId}
                    // defaultValue={projectId}
                    name="project_id"
                    type="text"
                    class="form-control"
                  />
                </div>
              </form> */}

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
                              selectedUser.value === item.value ? "activeRow" : ""
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
