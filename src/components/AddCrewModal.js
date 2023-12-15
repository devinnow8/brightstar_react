import { useState } from "react";
import { addNewCrew } from "../API";

const AddCrewModal = (props) => {
  const { onAddCrewClick, addNewCrewToList, projectId } = props;

  const [addCrewDetails, setAddCrewDetails] = useState({
    name: "",
    boss_user_id: "",
  });

  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddCrewDetails({ ...addCrewDetails, [name]: value });
  };

  const onClickCross = () => {
    setAddCrewDetails({ name: "", boss_user_id: "" });
  };

  const onClickAddCrew = async () => {
    const payload = {
      ...addCrewDetails,
      project_id: projectId,
    };
    await addNewCrew(payload)
      .then((res) => {
        if (res?.status === 200) {
          addNewCrewToList();
          // window.location.reload();
        }
      })
      .catch((err) => console.log("Error occured while adding new crew", err));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-info primary-btn px-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        // onClick={() => onAddCrewClick()}
      >
        + Add Crew
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title font-weight-bold"
                id="exampleModalLabel"
              >
                Add New Crew To This Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onClickCross()}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">
                    Name
                  </label>
                  <input
                    value={addCrewDetails?.name}
                    onChange={(e) => onHandleChange(e)}
                    name="name"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">
                    Boss_user_id
                  </label>
                  <input
                    value={addCrewDetails?.boss_user_id}
                    onChange={(e) => onHandleChange(e)}
                    name="boss_user_id"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">
                    Project_id
                  </label>
                  <input
                    disabled={true}
                    value={projectId}
                    defaultValue={projectId}
                    name="project_id"
                    type="text"
                    className="form-control"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => onClickAddCrew()}
                type="button"
                className="primary-btn"
                data-bs-dismiss="modal"
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

export default AddCrewModal;
