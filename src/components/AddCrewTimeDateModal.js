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
        class="btn btn-primary primary-btn px-3"
        data-bs-toggle="modal"
        data-bs-target="#largeModal"
      >
        + Add Crew Time/Date
      </button>
      <div
        class="modal fade time-entry-modal"
        id="largeModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title" id="largeModalLabel">
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
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="mb-3">
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
                <div className="col-md-6 col-lg-4">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Date:
                    </label>
                    <input aria-label="Date" type="Date" />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
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
                </div>
                <div className="col-md-6 col-lg-4">
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
                </div>
                <div className="col-md-6 col-lg-4">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Working Time
                    </label>
                    <input aria-label="Time" type="time" />
                    <label for="recipient-name" class="col-form-label">
                      Start
                    </label>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div class="mb-3">
                    <label
                      for="recipient-name"
                      class="col-form-label"
                      style={{ visibility: "hidden" }}
                    >
                      Working Time
                    </label>
                    <input aria-label="Time" type="time" />
                    <label for="recipient-name" class="col-form-label">
                      Start
                    </label>
                  </div>
                </div>
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
