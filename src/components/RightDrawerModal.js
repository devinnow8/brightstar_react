import { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCrewTimeEntry, getAllCrewUser, getUserDetails } from "../API";
import { getCurrentDateTime } from "../utils/utils";

const RightDrawerModal = (props) => {
  const { crew_id } = props;
  console.log("propspropspropsprops", crew_id);
  const [selectedDate, setSelectedDate] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [crewUsers, setCrewUsers] = useState([]);
  const [allSelectedUsers, setAllSelectedUsers] = useState([]);

  const [punchInOutTime, setPunchInOutTime] = useState({
    time_entry_in: "08:30",
    time_entry_out: "17:00",
  });

  const [lunchPunchInOutTime, setLunchPunchInOutTime] = useState({
    lunch_entry_in: "13:00",
    lunch_entry_out: "14:00",
  });

  const navigate = useNavigate();

  const onChangeUserSelect = (item) => {
    setAllSelectedUsers(item);
  };

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

  const onLunchTimeChange = (e) => {
    const name = e.target.name;
    const selectedTime = e.target.value;
    setLunchPunchInOutTime({ ...lunchPunchInOutTime, [name]: selectedTime });
  };

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

  const onClickSave = async () => {
    allSelectedUsers?.forEach(async (ele) => {
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
      await addCrewTimeEntry(payload)
        .then((res) => {
          if (res?.data?.crew_id) {
            toast.success("Time entry successfully added.");
            navigate("/time-sheet");
          }
        })
        .catch((err) => toast.error("Unable to add time entry"));
    });
  };

  return (
    <>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h3 id="offcanvasRightLabel">New Time Entry</h3>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
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
                Lunch Time
              </label>
              <input
                name="time_entry_in"
                aria-label="Time"
                type="time"
                className="input-field"
                onChange={(e) => onLunchTimeChange(e)}
                value={lunchPunchInOutTime?.lunch_entry_in}
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
                Lunch Time
              </label>
              <input
                name="time_entry_out"
                aria-label="Time"
                type="time"
                className="input-field"
                onChange={(e) => onLunchTimeChange(e)}
                value={lunchPunchInOutTime?.lunch_entry_out}
              />
              <label for="recipient-name" class="col-form-label">
                End
              </label>
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
          <div className="mb-3">
            <label for="recipient-name" class="col-form-label">
              Notes
            </label>
            <textarea />
          </div>
        </div>
        <div class="modal-footer">
          <button
            onClick={() => onClickSave()}
            type="button"
            class="primary-btn-outlined"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Close
          </button>
          <button
            onClick={() => onClickSave()}
            type="button"
            class="primary-btn me-3"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default RightDrawerModal;