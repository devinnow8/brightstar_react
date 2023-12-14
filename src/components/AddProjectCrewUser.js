import React from "react";

const AddProjectCrewUser = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-info detail-btn"
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
              <form>
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
              </form>
            </div>
            <div class="modal-footer">
              <button
                // onClick={() => onClickAddCrew()}
                type="button"
                class="primary-btn"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectCrewUser;
