import Select from "react-select";
const AddCrewTimeDateModal = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#largeModal"
      >
        + Add Crew Time/Date
      </button>
      <div
        class="modal fade"
        id="largeModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="largeModalLabel">
                New Time Entry
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Date:
                </label>
                <input aria-label="Date" type="Date" />
              </div>
              <div class="mb-3">
                <label htmlFor="" class="col-form-label">
                  Project Task
                </label>
                <select
                  // onChange={(e) => handleSelectChange(e, "project")}
                  class="form-select"
                  aria-label="Default select example"
                ></select>
              </div>
              <div class="mb-3">
                <label htmlFor="" class="col-form-label">
                  Cost Code
                </label>
                <select
                  // onChange={(e) => handleSelectChange(e, "project")}
                  class="form-select"
                  aria-label="Default select example"
                ></select>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Working Time
                </label>
                <br />
                <label for="recipient-name" class="col-form-label">
                  Start
                </label>
                <input aria-label="Time" type="time" />
                <label for="recipient-name" class="col-form-label">
                  End
                </label>
                <input aria-label="Time" type="time" />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Lunch
                </label>
                <br />
                <label for="recipient-name" class="col-form-label">
                  Start
                </label>
                <input aria-label="Time" type="time" />
                <label for="recipient-name" class="col-form-label">
                  End
                </label>
                <input aria-label="Time" type="time" />
              </div>
              <br />
              <div>
                <label for="recipient-name" class="col-form-label">
                  Select Team Members
                </label>
                <Select
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCrewTimeDateModal;
