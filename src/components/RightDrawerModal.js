import { useState, useEffect } from "react";
import React from "react";
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
import useFetch from "./AddCrew";
import { EntryTypeOptions } from "../utils/constants";

const RightDrawerModal = React.memo((props) => {
  const { crew_id, project_id, addCrewModal, onModalClick } = props;
  const { crewUsers, crewEquipments, projectTaskOptions } = useFetch(
    addCrewModal,
    crew_id,
    project_id
  );

  console.log("crewEquipmentscrewEquipments", crewEquipments);

  const [entryType, setEntryType] = useState();
  console.log("entryTypeentryType", entryType);
  const [costCodesOptions, setCostCodesOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    selectedDateLabel: "",
    selectedDateValue: "",
  });
  const [time, setTime] = useState({
    punchIn: { hours: 1, minutes: "00", ampm: "PM" },
    punchOut: { hours: 2, minutes: "00", ampm: "PM" },
    workingTimeIn: { hours: 8, minutes: "30", ampm: "AM" },
    workingTimeOut: { hours: 5, minutes: "00", ampm: "PM" },
  });

  const [allSelectedUsers, setAllSelectedUsers] = useState([]);
  const [allSelectedEquipments, setAllSelectedEquipments] = useState([]);
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

  const navigate = useNavigate();

  useEffect(() => {
    if (crew_id) {
      getAllCostCodes();
    }
  }, [entryType]);

  const handleTimeSelectChange = (field, value, type) => {
    const copiedTime = { ...time };
    const selectedTime = copiedTime[type];
    copiedTime[type][field] = value;
    setTime(copiedTime);
  };

  const getAllCostCodes = async () => {
    await getCrewCostCodes(crew_id, entryType).then((res) => {
      if (res?.status === 200) {
        console.log("getCrewCostCodes ==>", res?.data);
        const costCodes = res?.data?.map((ele) => ({
          label: ele?.project_cost_code?.description,
          value: ele,
        }));
        setCostCodesOptions(costCodes);
      }
    });
  };

  const onEntryTypeChange = (selected) => {
    console.log("eventonEntryTypeChange", selected);
    setEntryType(selected?.value);
  };

  const onChangeUserSelect = (item) => {
    setAllSelectedUsers(item);
  };

  const onChangeEquipmentSelect = (item) => {
    setAllSelectedEquipments(item);
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
    setSelectedProjectTaskId(e?.value?.id);
  };

  const onCostCodeChange = (e) => {
    setSelectedCostCodeId(e?.value?.id);
  };

  // Function to format time in 24-hour format
  const formatTimeForBackend = (timeData) => {
    let { hours, minutes, ampm } = timeData;
    let formattedHours = ampm === "PM" ? hours + 12 : hours;

    if (Number(formattedHours) < 9) {
      formattedHours = "0" + formattedHours;
    }
    return `${formattedHours}:${minutes}`;
  };

  const sendDataToBackend = () => {
    const formattedTime = formatTimeForBackend();
    const date = new Date();
  };
  const onClickSave = async () => {
    const getSelectedWeek = getWeekFromDate(selectedDate?.selectedDateValue);

    const lunchTimeIn = formatTimeForBackend(time?.punchIn);
    const lunchTimeOut = formatTimeForBackend(time?.punchOut);
    const entryTimeIn = formatTimeForBackend(time?.workingTimeIn);
    const entryTimeOut = formatTimeForBackend(time?.workingTimeOut);
    console.log(
      "onClickSave",
      entryTimeIn,
      entryTimeOut,
      lunchTimeIn,
      lunchTimeOut
    );

    if (getSelectedWeek) {
      await getWeekSheet(getSelectedWeek).then((res) => {
        if (res?.status === 200 && res?.data?.length > 0) {
          console.log("getWeekSheet ===>", res?.data);
          if (entryType === "user") {
            allSelectedUsers?.forEach(async (ele) => {
              const payload = {
                time_entry_in: entryTimeIn,
                time_entry_out: entryTimeOut,
                time_lunch_start: lunchTimeIn,
                time_lunch_end: lunchTimeOut,
                entry_time: getCurrentDateTime(),
                time_entry_type_id: 1, // user
                crew_user_equipment_id: ele?.value?.crew_user_id,
                crew_id,
                time_entry_date: selectedDate?.selectedDateValue || "",
                is_crew_entry: true,
                time_entry_status_id: 1,
                project_task_id: selectedProjectTaskId,
                crew_project_cost_code_id: selectedCostCodeId,
                time_sheet_id: res?.data[0]?.id,
              };
              await addCrewTimeEntry(payload)
                .then((res) => {
                  if (res?.data) {
                    toast.success("Time entry successfully added.");
                    navigate("/time-sheet");
                  }
                })
                .catch((err) => toast.error("Unable to add time entry"));
            });
          } else if (entryType === "equipment") {
            console.log("reaching here!!!!");
            allSelectedEquipments?.forEach(async (ele) => {
              console.log("equipment ele ==>", ele);
              const payload = {
                time_entry_in: entryTimeIn,
                time_entry_out: entryTimeOut,
                entry_time: getCurrentDateTime(),
                time_entry_type_id: 2, // equipment
                crew_user_equipment_id: ele?.value?.id,
                crew_id,
                time_entry_date: selectedDate?.selectedDateValue || "",
                is_crew_entry: true,
                time_entry_status_id: 1,
                project_task_id: selectedProjectTaskId,
                crew_project_cost_code_id: selectedCostCodeId,
                time_sheet_id: res?.data[0]?.id,
              };
              await addCrewTimeEntry(payload)
                .then((res) => {
                  if (res?.data) {
                    toast.success("Time entry successfully added.");
                    navigate("/time-sheet");
                  }
                })
                .catch((err) => toast.error("Unable to add time entry"));
            });
          }
        } else {
          const addMyTimeSheetPayload = {
            week: getSelectedWeek,
            crew_id,
            time_sheet_status_id: 1,
          };
          addMyTimeSheetDetails(addMyTimeSheetPayload).then((res) => {
            if (res?.status === 200) {
              console.log("addMyTimeSheetPayload", res?.data);
              if (entryType === "user") {
                allSelectedUsers?.forEach(async (ele) => {
                  const payload = {
                    time_entry_in: entryTimeIn,
                    time_entry_out: entryTimeOut,
                    time_lunch_start: lunchTimeIn,
                    time_lunch_end: lunchTimeOut,
                    entry_time: getCurrentDateTime(),
                    time_entry_type_id: 1, // user
                    crew_user_equipment_id: ele?.value?.crew_user_id,
                    crew_id,
                    time_entry_date: selectedDate?.selectedDateValue || "",
                    is_crew_entry: true,
                    time_entry_status_id: 1,
                    project_task_id: selectedProjectTaskId,
                    crew_project_cost_code_id: selectedCostCodeId,
                    time_sheet_id: res?.data?.id
                  };
                  console.log("payloadddddddddd", payload);
                  await addCrewTimeEntry(payload)
                    .then((res) => {
                      if (res?.data) {
                        toast.success(
                          "Time sheet successfully added for the selected week"
                        );
                        toast.success("Time entry successfully added.");
                        navigate("/time-sheet");
                      }
                    })
                    .catch((err) => toast.error("Unable to add time entry"));
                });
              } else if (entryType === "equipment") {
                allSelectedEquipments?.forEach(async (ele) => {
                  const payload = {
                    time_entry_in: entryTimeIn,
                    time_entry_out: entryTimeOut,
                    entry_time: getCurrentDateTime(),
                    time_entry_type_id: 2, // equipment
                    crew_user_equipment_id: ele?.value?.id,
                    crew_id,
                    time_entry_date: selectedDate?.selectedDateValue || "",
                    is_crew_entry: true,
                    time_entry_status_id: 1,
                    project_task_id: selectedProjectTaskId,
                    crew_project_cost_code_id: selectedCostCodeId,
                    time_sheet_id: res?.data?.id
                  };
                  console.log("payloadddddddddd", payload);
                  await addCrewTimeEntry(payload)
                    .then((res) => {
                      if (res?.data) {
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
            }
          });
        }
      });
    }
  };

  const onCloseClick = () => {
    console.log("onCloseClick");
    onModalClick(false);
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
  const myElement = document.getElementById("offcanvasRight");
  console.log("myElement", myElement);

  return (
    <>
      <div
        class="offcanvas offcanvas-end crew-mdal"
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
            onClick={() => onEntryTypeChange()}
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="input-flex">
            <label for="recipient-name" class="col-form-label">
              Select Entry Type
            </label>
            <div className="input-box">
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                name="colors"
                options={EntryTypeOptions}
                onChange={(item) => onEntryTypeChange(item)}
                defaultValue={entryType}
              />
            </div>
          </div>
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
          {entryType === "user" && (
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
          )}
          {entryType === "equipment" && (
            <div class="input-flex">
              <label for="recipient-name" class="col-form-label">
                Select Equipments
              </label>
              <div className="input-box">
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isMulti
                  name="colors"
                  options={crewEquipments}
                  onChange={(item) => onChangeEquipmentSelect(item)}
                />
              </div>
            </div>
          )}
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
            <div className="input-box">
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
            <div className="input-box d-flex align-items-center justify-content-between row">
              <div className="col-6">
                <TimePickerComponent
                  label={"Start"}
                  time={time?.workingTimeIn}
                  type="workingTimeIn"
                  handleTimeSelectChange={handleTimeSelectChange}
                />
              </div>
              <div className="col-6">
                <TimePickerComponent
                  label={"End"}
                  time={time?.workingTimeOut}
                  type="workingTimeOut"
                  handleTimeSelectChange={handleTimeSelectChange}
                />
              </div>
            </div>
          </div>
          {entryType === "user" && (
            <div className="input-flex">
              <label htmlFor="" class="col-form-label">
                Lunch
              </label>
              <div className="input-box d-flex align-items-center justify-content-between row">
                <div className="col-6">
                  <TimePickerComponent
                    label={"Start"}
                    time={time?.punchIn}
                    type="punchIn"
                    handleTimeSelectChange={handleTimeSelectChange}
                  />
                </div>
                <div className="col-6">
                  <TimePickerComponent
                    label={"End"}
                    time={time?.punchOut}
                    type="punchOut"
                    handleTimeSelectChange={handleTimeSelectChange}
                  />
                </div>
              </div>
            </div>
          )}

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
});

export default RightDrawerModal;
