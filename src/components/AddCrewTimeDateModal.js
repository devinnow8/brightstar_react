import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCrewUser, getUserDetails } from "../API";

const AddCrewTimeDateModal = (props) => {
  const { crew_id } = props;
  const [allUsers, setAllUsers] = useState([]);
  const [crewUsers, setCrewUsers] = useState([]);

  console.log("crewUsers ===><<><>", crewUsers);
  console.log("crew_id ===><<><>", crew_id);


  const onClickAddCrewTimeDate = async () => {
    await getUserDetails()
    .then(async (res) => {
      setAllUsers(res?.data)
      const userData = res?.data.slice()
      console.log("userData", userData)
      await getAllCrewUser(crew_id)
    .then((res) => {
      if (res?.status === 200) {
        const filteredCrewUsers = res?.data?.map((ele) => {
            const matchingUser = userData?.find((crewEle) => ele?.user_id == crewEle?.id)
            console.log("matchingUser", matchingUser)
            return {
              value: matchingUser,
              label: matchingUser?.name
            }
          });

          console.log("filteredCrewUsers", filteredCrewUsers)
          setCrewUsers(filteredCrewUsers);
        }
      })
      .catch((err) =>
        console.log("Error Occured in AddCrewTimeDateModal", err)
      );
    })
    .catch((err) =>
    console.log("error occured in AddCrewTimeDateModal", err)
    );
    
  };

  useEffect(()=> {
    if(crew_id){
      onClickAddCrewTimeDate()
    }
  }, [crew_id])

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      
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
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Select Team Members
                    </label>
                    <Select
                      className="react-select-container"
                      classNamePrefix="react-select"
                      isMulti
                      name="colors"
                      options={crewUsers}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Date:
                    </label>
                    <input aria-label="Date" className="input-field" type="Date" />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div class="mb-3">
                    <label htmlFor="" class="col-form-label">
                      Project Task
                    </label>
                    <select
                      // onChange={(e) => handleSelectChange(e, "project")}
                      class="form-select input-field"
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
                    <input aria-label="Time" type="time" className="input-field"/>
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
                    <input aria-label="Time" type="time" className="input-field" />
                    <label for="recipient-name" class="col-form-label">
                      End
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="primary-btn me-3"
              >
                Save
              </button>
              <button type="button" data-bs-dismiss="modal" class="primary-btn-outlined">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCrewTimeDateModal;
