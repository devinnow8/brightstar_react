import { useState } from "react";
import { addNewCrew } from "../API";

const AddNewCrewModal = () => {
  const [addCrewDetails, setAddCrewDetails] = useState({
    name: "",
    boss_user_id: "",
    project_id: "",
  });

  console.log("AddNewCrewModal ==>", addCrewDetails);

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
          window.location.reload();
        }
      })
      .catch((err) => console.log("Error occured while adding new crew", err));
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-info detail-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
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
                Add A New Crew
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onClickCross()}
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Name
                  </label>
                  <input
                    value={addCrewDetails?.name}
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
                    value={addCrewDetails?.boss_user_id}
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
                    onChange={(e) => onHandleChange(e)}
                    value={addCrewDetails?.project_id}
                    name="project_id"
                    type="text"
                    class="form-control"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                onClick={() => onClickAddCrew()}
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

export default AddNewCrewModal;
