import { useState } from "react";
import { addNewCrew } from "../API";

const AddCrewModal = (props) => {
  const { onAddCrewClick, projectId } = props;
  console.log("projectId ====<><>", projectId);
  const [addCrewDetails, setAddCrewDetails] = useState({
    name: "",
    boss_user_id: "",
  });
  console.log("addCrewDetails ===>", addCrewDetails);
  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddCrewDetails({ ...addCrewDetails, [name]: value });
  };

  const onClickAddCrew = async () => {
    const payload = {
      ...addCrewDetails,
      project_id: projectId,
    };
    console.log("payload  ====>", payload);
    await addNewCrew(payload)
      .then((res) => {
        if(res?.status === 200){
            window.location.reload();
        }
      })
      .catch((err) => console.log("Error occured while adding new crew", err));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-info detail-btn primary-btn px-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => onAddCrewClick()}
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
              <h5 class="modal-title" id="exampleModalLabel">
                Add New Crew To This Project
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Name
                  </label>
                  <input
                    onChange={(e) => onHandleChange(e)}
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
                    onChange={(e) => onHandleChange(e)}
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
                    value={projectId}
                    defaultValue={projectId}
                    name="project_id"
                    type="text"
                    class="form-control"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              {/* <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
              <button
                onClick={() => onClickAddCrew()}
                type="button"
                class="btn btn-primary"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <button
        type="button"
        className="btn btn-info detail-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => onAddCrewClick()}
      >
        + Add Crew
      </button>

      <div
        className="modal fade centered"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Crew To This Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AddCrewModal;
