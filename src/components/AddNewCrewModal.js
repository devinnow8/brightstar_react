import { useState } from "react";
import { addNewCrew } from "../API";

const AddNewCrewModal = (addNewCrewUser) => {
  const [addCrewDetails, setAddCrewDetails] = useState({
    name: "",
    boss_user_id: "5",
    project_id: "",
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
    await addNewCrew(addCrewDetails)
      .then((res) => {
        if (res?.status === 200) {
          addNewCrewUser();
          // window.location.reload();
        }
      })
      .catch((err) => console.log("Error occured while adding new crew", err));
  };
  return (
    <>
      <button
        type="button"
        className="btn primary-btn-outlined px-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
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
                Add A New Crew
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
                  {/* <label for="recipient-name" className="col-form-label">
                    Boss_user_id
                  </label>
                  <input
                    value={addCrewDetails?.boss_user_id}
                    onChange={(e) => onHandleChange(e)}
                    name="boss_user_id"
                    type="text"
                    className="form-control"
                  /> */}
                </div>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">
                    Project_id
                  </label>
                  <input
                    onChange={(e) => onHandleChange(e)}
                    value={addCrewDetails?.project_id}
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

export default AddNewCrewModal;
