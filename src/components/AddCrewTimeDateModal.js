import { useEffect, useState } from "react";
import Select from "react-select";
import { addCrewTimeEntry, getAllCrewUser, getUserDetails } from "../API";

const AddCrewTimeDateModal = (props) => {
  const { crew_id } = props;
  const [allUsers, setAllUsers] = useState([]);
  const [crewUsers, setCrewUsers] = useState([]);

  const [allSelectedUsers, setAllSelectedUsers] = useState([]);

  const [selectedDate, setSelectedDate] = useState();
  const [punchInOutTime, setPunchInOutTime] = useState({
    time_entry_in: "08:30",
    time_entry_out: "17:00",
  });

  const onDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  };

  const onTimeChange = (e) => {
    const name = e.target.name;
    const selectedTime = e.target.value;
    setPunchInOutTime({ ...punchInOutTime, [name]: selectedTime });
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toISOString().replace('T', ' ').slice(0, -1);
    return formattedDateTime;
  }

  const onClickAddCrewTimeDate = async () => {
    await getUserDetails()
      .then(async (res) => {
        setAllUsers(res?.data);
        const userData = res?.data.slice();
        console.log("userData", userData);
        await getAllCrewUser(crew_id)
          .then((res) => {
            if (res?.status === 200) {
              const filteredCrewUsers = res?.data?.map((ele) => {
                const matchingUser = userData?.find(
                  (crewEle) => ele?.user_id == crewEle?.id
                );
                console.log("matchingUser", matchingUser);
                return {
                  value: matchingUser,
                  label: matchingUser?.name,
                };
              });
              console.log(
                "filteredCrewUsersfilteredCrewUsers",
                filteredCrewUsers
              );
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

  useEffect(() => {
    if (crew_id) {
      onClickAddCrewTimeDate();
    }
  }, [crew_id]);

  const onChangeUserSelect = (item) => {
    setAllSelectedUsers(item);
  }


  const onClickSave = async() => {
    allSelectedUsers?.forEach(async(ele) => {
      const payload = {
        ...punchInOutTime,
        entry_time: getCurrentDateTime(),
        time_entry_type_id: 1,
        crew_user_id: ele?.value?.id,
        crew_id,
        time_entry_date: selectedDate || "",
        is_crew_entry: true,
        time_entry_status_id: 1,
      };
      await addCrewTimeEntry(payload).then((res) => console.log("API called successfully", res))
    })
  };
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
                      onChange={(item) => onChangeUserSelect(item)}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Date:
                    </label>
                    <input
                      onChange={(e) => onDateChange(e)}
                      aria-label="Date"
                      className="input-field"
                      type="Date"
                    />
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
                    <input
                      name="time_entry_in"
                      aria-label="Time"
                      type="time"
                      className="input-field"
                      onChange={(e) => onTimeChange(e)}
                      value={punchInOutTime?.time_entry_in}
                    />
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
                    <input
                      name="time_entry_out"
                      aria-label="Time"
                      type="time"
                      className="input-field"
                      onChange={(e) => onTimeChange(e)}
                      value={punchInOutTime?.time_entry_out}
                    />
                    <label for="recipient-name" class="col-form-label">
                      End
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                onClick={() => onClickSave()}
                type="button"
                class="primary-btn me-3"
                data-bs-dismiss="modal"
              >
                Save
              </button>
              <button
                type="button"
                class="primary-btn-outlined"
                data-bs-dismiss="modal"
              >
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
