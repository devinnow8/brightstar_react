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
  getCrewCostCodes,
  getWeekSheet,
  addMyTimeSheetDetails,
} from "../API";
import {
  getCurrentDateTime,
  formatDateToYYYYMMDD,
  getWeekFromDate,
} from "../utils/utils";
import "react-datepicker/dist/react-datepicker.css";
import TimePickerComponent from "./TimePicker";

const RightDrawerModal = (props) => {
  const { crew_id, project_id } = props;

  console.log("crew_iddddddddd", crew_id);

  const [selectedDate, setSelectedDate] = useState({
    selectedDateLabel: "",
    selectedDateValue: "",
  });
  const [time, setTime] = useState({
    punchIn: { hours: 1, minutes: "00", ampm: "AM" },
    punchOut: { hours: 1, minutes: "00", ampm: "AM" },
    workingTimeIn: { hours: 1, minutes: "00", ampm: "AM" },
    workingTimeOut: { hours: 1, minutes: "00", ampm: "AM" },
  });

  const [allProjectTasks, setAllProjectTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [crewUsers, setCrewUsers] = useState([]);
  const [allSelectedUsers, setAllSelectedUsers] = useState([]);
  const [selectedCostCodeId, setSelectedCostCodeId] = useState();
  const [selectedProjectTaskId, setSelectedProjectTaskId] = useState();
  const [punchInOutTime, setPunchInOutTime] = useState({
    time_entry_in: "08:30",
    time_entry_out: "17:00",
  });
  const [lunchPunchInOutTime, setLunchPunchInOutTime] = useState({
    time_lunch_start: "13:00",
    time_lunch_end: "14:00",
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
  const handleTimeSelectChange = (field, value, type) => {
    console.log("handleTimeSelectChange", field, value, type);
    const copiedTime = { ...time };
    const selectedTime = copiedTime[type];
    copiedTime[type][field] = value;
    console.log("copiedTimecopiedTime", copiedTime);
    setTime(copiedTime);
  };
  const getAllCostCodes = async () => {
    await getCrewCostCodes(crew_id).then((res) => {
      if (res?.status === 200) {
        console.log("getCrewCostCodes ==>", res?.data);
        const costCodes = res?.data?.map((ele) => ({
          label: ele?.project_cost_code?.description,
          value: ele,
        }));
        setCostCodesOptions(costCodes);
      }
    });
    // await getCostCodes(project_id).then((res) => {
    //   if (res?.status === 200) {
    //     const costCodes = res?.data?.map((ele) => ({
    //       label: ele?.description,
    //       value: ele,
    //     }));
    //     setCostCodesOptions(costCodes);
    //   }
    // });
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

  const onProjectTaskChange = (e) => {
    console.log("onProjectTaskChange", e?.value?.id);
    setSelectedProjectTaskId(e?.value?.id);
  };

  const onCostCodeChange = (e) => {
    console.log("onCostCodeChange", e?.value?.id);
    setSelectedCostCodeId(e?.value?.id);
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
                console.log("eleelelel", ele);
                matchingUser.crew_user_id = ele?.id;
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
      getAllCostCodes();
    }
    if (project_id) {
      getAllProjectTasks();
    }
  }, [crew_id, project_id]);
  // Function to format time in 24-hour format
  const formatTimeForBackend = (timeData) => {
    let { hours, minutes, ampm } = timeData;
    console.log("timeDatatimeData", typeof hours, Number(hours) < 9, timeData);
    let formattedHours = ampm === "PM" ? hours + 12 : hours;

    debugger;
    if (Number(formattedHours) < 9) {
      formattedHours = "0" + formattedHours;
    }
    return `${formattedHours}:${minutes}`;
  };

  const sendDataToBackend = () => {
    const formattedTime = formatTimeForBackend();
    const date = new Date();
    console.log(`Date: ${date.toISOString()}, Time: ${formattedTime}`);
  };
  const onClickSave = async () => {
    console.log("iiiiitime", time);
    const getSelectedWeek = getWeekFromDate(selectedDate?.selectedDateValue);

    const cardpunchInTime = formatTimeForBackend(time.punchIn);
    const cardpunchOutTime = formatTimeForBackend(time.punchOut);
    const cardworkingTimeIn = formatTimeForBackend(time.workingTimeIn);
    const cardworkingTimeOut = formatTimeForBackend(time.workingTimeOut);
    console.log(
      "onClickSave",
      cardpunchInTime,
      cardpunchOutTime,
      cardworkingTimeIn,
      cardworkingTimeOut
    );

    if (getSelectedWeek) {
      await getWeekSheet(getSelectedWeek).then((res) => {
        if (res?.status === 200 && res?.data?.length > 0) {
          allSelectedUsers?.forEach(async (ele) => {
            const payload = {
              ...punchInOutTime,
              ...lunchPunchInOutTime,
              entry_time: getCurrentDateTime(),
              time_entry_type_id: 1,
              crew_user_id: ele?.value?.crew_user_id,
              crew_id,
              time_entry_date: selectedDate.selectedDateValue || "",
              is_crew_entry: true,
              time_entry_status_id: 1,
              project_task_id: selectedProjectTaskId,
              crew_project_cost_code_id: selectedCostCodeId,
              time_sheet_id: res?.data[0]?.id,
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
        } else {
          const addMyTimeSheetPayload = {
            week: getSelectedWeek,
            crew_id,
            time_sheet_status_id: 1,
          };
          addMyTimeSheetDetails(addMyTimeSheetPayload).then((res) => {
            if (res?.status === 200) {
              allSelectedUsers?.forEach(async (ele) => {
                console.log("ele?.value?.crew_user_id", ele);

                const payload = {
                  ...punchInOutTime,
                  ...lunchPunchInOutTime,
                  entry_time: getCurrentDateTime(),
                  time_entry_type_id: 1,
                  crew_user_id: ele?.value?.crew_user_id,
                  crew_id,
                  time_entry_date: selectedDate.selectedDateValue || "",
                  is_crew_entry: true,
                  time_entry_status_id: 1,
                  project_task_id: selectedProjectTaskId,
                  crew_project_cost_code_id: selectedCostCodeId,
                  time_sheet_id: res?.data?.id,
                };
                await addCrewTimeEntry(payload)
                  .then((res) => {
                    if (res?.data?.crew_id) {
                      toast.success(
                        "Time sheet successfully added for the selected week"
                      );
                      toast.success("Time entry successfully added.");
                      navigate("/time-sheet");
                    }
                  })
                  .catch((err) => toast.error("Unable to add time entry"));
              });
            }
          });
        }
      });
    }
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

  console.log("selectedDate====>1", time);

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
              Date
            </label>
            <div className="input-box">
              <DatePicker
                placeholderText="YYYY/MM/DD"
                default
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
                onChange={(item) => onProjectTaskChange(item)}
              />
            </div>
          </div>
          <div className="input-flex">
            <label htmlFor="" class="col-form-label">
              Cost Code
            </label>
            <div className="input-box d-flex align-items-center justify-content-between">
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                name="colors"
                options={costCodesOptions}
                onChange={(item) => onCostCodeChange(item)}
              />
            </div>
          </div>
          <div className="input-flex">
            <label for="recipient-name" class="col-form-label">
              Working Time
            </label>
            <div className="input-box d-flex align-items-center justify-content-between">
              <TimePickerComponent
                label={"Start Time"}
                time={time.workingTimeIn}
                type="workingTimeIn"
                handleTimeSelectChange={handleTimeSelectChange}
              />
              <TimePickerComponent
                label={"End Time"}
                time={time.workingTimeOut}
                type="workingTimeOut"
                handleTimeSelectChange={handleTimeSelectChange}
              />
            </div>
          </div>
          <div className="input-flex">
            <label htmlFor="" class="col-form-label">
              Lunch
            </label>
            <TimePickerComponent
              label={"Start Time"}
              time={time.punchIn}
              type="punchIn"
              handleTimeSelectChange={handleTimeSelectChange}
            />
            <TimePickerComponent
              label={"End Time"}
              time={time.punchOut}
              type="punchOut"
              handleTimeSelectChange={handleTimeSelectChange}
            />
            {/* <div className="input-box d-flex align-items-center justify-content-between">
              <div className="col-md-6" style={{ width: "48%" }}>
                <div>
                  <input
                    name="time_lunch_start"
                    aria-label="Time"
                    type="time"
                    className="input-field w-100"
                    onChange={(e) => onLunchTimeChange(e)}
                    value={lunchPunchInOutTime?.time_lunch_start}
                  />
                  <label for="recipient-name" class="col-form-label">
                    Start
                  </label>
                </div>
              </div>
              <div className="col-md-6" style={{ width: "48%" }}>
                <div>
                  <input
                    name="time_lunch_end"
                    aria-label="Time"
                    type="time"
                    className="input-field w-100"
                    onChange={(e) => onLunchTimeChange(e)}
                    value={lunchPunchInOutTime?.time_lunch_end}
                  />
                  <label for="recipient-name" class="col-form-label">
                    End
                  </label>
                </div>
              </div>
            </div> */}
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
