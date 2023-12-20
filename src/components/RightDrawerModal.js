import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  addCrewTimeEntry,
  getAllCrewUser,
  getProjectTask,
  getUserDetails,
  getCostCodes,
} from "../API";
import { getCurrentDateTime, formatDateToYYYYMMDD } from "../utils/utils";
import "react-datepicker/dist/react-datepicker.css";

const RightDrawerModal = (props) => {
  const { crew_id, project_id } = props;

  const [selectedDate, setSelectedDate] = useState({
    selectedDateLabel: "",
    selectedDateValue: "",
  });

  const [allProjectTasks, setAllProjectTasks] = useState([]);
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
  const [projectTaskOptions, setProjectTaskOptions] = useState([]);
  const [costCodesOptions, setCostCodesOptions] = useState([]);

  const navigate = useNavigate();

  const getAllProjectTasks = async () => {
    await getProjectTask(project_id).then((res) => {
      if (res?.status === 200) {
        const dropDownOptions = res?.data?.map((ele) => {
          return { label: ele?.description, value: ele };
        });
        setProjectTaskOptions(dropDownOptions);
      }
    });
  };

  const getAllCostCodes = async () => {
    await getCostCodes(project_id).then((res) => {
      if (res?.status === 200) {
        const costCodes = res?.data?.map((ele) => ({
          label: ele?.description,
          value: ele,
        }));
        setCostCodesOptions(costCodes);
      }
    });
  };

  const onChangeUserSelect = (item) => {
    setAllSelectedUsers(item);
  };

  const onDateChange = (e) => {
    const date = formatDateToYYYYMMDD(e);
    setSelectedDate({ selectedDateLabel: e, selectedDateValue: date });
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
    if (project_id) {
      getAllProjectTasks();
    }
    getAllCostCodes();
  }, [crew_id, project_id]);

  const onClickSave = async () => {
    allSelectedUsers?.forEach(async (ele) => {
      const payload = {
        ...punchInOutTime,
        entry_time: getCurrentDateTime(),
        time_entry_type_id: 1,
        crew_user_id: ele?.value?.id,
        crew_id,
        time_entry_date: selectedDate.selectedDateValue || "",
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

  const onCloseClick = () => {
    console.log("onCloseClick");
    setSelectedDate("");
    setPunchInOutTime({
      time_entry_in: "08:30",
      time_entry_out: "17:00",
    });
    setLunchPunchInOutTime({
      lunch_entry_in: "13:00",
      lunch_entry_out: "14:00",
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
            onClick={() => onCloseClick()}
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="input-flex">
            <label for="recipient-name" class="col-form-label">
            {"Date:(YYYY/MM/DD)"}
            </label>
            <div className="input-box">
              <DatePicker
                selected={selectedDate.selectedDateLabel}
                onChange={(e) => onDateChange(e)}
                dateFormat="yyyy/MM/dd"
                aria-label="Date"
                className="input-field"
              />
              {/* <input
                onChange={(e) => onDateChange(e)}
                aria-label="Date"
                className="input-field"
                type="Date"
              /> */}
            </div>
          </div>
          <div class="input-flex">
            <label for="recipient-name" class="col-form-label">
              Select Team Members
            </label>
            <div className="input-box">
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
          <div class="input-flex">
            <label htmlFor="" class="col-form-label">
              Project Task
            </label>
            <div className="input-box">
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                name="colors"
                options={projectTaskOptions}
                // onChange={(item) => onChangeUserSelect(item)}
              />
            </div>
          </div>
          <div className="input-flex">
            <label htmlFor="" class="col-form-label">
              Cost Code
            </label>
            <div className="input-box">
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                name="colors"
                options={costCodesOptions}
                // onChange={(item) => onChangeUserSelect(item)}
              />
            </div>
          </div>
          <div className="input-flex">
            <label htmlFor="" class="col-form-label">
              Lunch
            </label>
            <div className="input-box d-flex align-items-center justify-content-between">
              <div className="col-md-6" style={{ width: "48%" }}>
                <div>
                  <input
                    name="lunch_entry_in"
                    aria-label="Time"
                    type="time"
                    className="input-field w-100"
                    onChange={(e) => onLunchTimeChange(e)}
                    value={lunchPunchInOutTime?.lunch_entry_in}
                  />
                  <label for="recipient-name" class="col-form-label">
                    Start
                  </label>
                </div>
              </div>
              <div className="col-md-6" style={{ width: "48%" }}>
                <div>
                  <input
                    name="lunch_entry_out"
                    aria-label="Time"
                    type="time"
                    className="input-field w-100"
                    onChange={(e) => onLunchTimeChange(e)}
                    value={lunchPunchInOutTime?.lunch_entry_out}
                  />
                  <label for="recipient-name" class="col-form-label">
                    End
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="input-flex">
            <label for="recipient-name" class="col-form-label">
              Working Time
            </label>
            <div className="input-box d-flex align-items-center justify-content-between">
              <div className="col-md-6" style={{ width: "48%" }}>
                <div>
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
              <div className="col-md-6" style={{ width: "48%" }}>
                <div>
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
          <div className="input-flex">
            <label for="recipient-name" class="col-form-label">
              Notes
            </label>
            <div className="input-box">
              <textarea rows="3" className="textarea" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            onClick={() => onCloseClick()}
            type="button"
            class="primary-btn-outlined me-3"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Cancel
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
