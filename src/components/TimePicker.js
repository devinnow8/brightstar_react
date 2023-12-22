import React, { useState } from "react";
// import Datetime from "react-datetime-picker";
// import "react-datetime-picker/dist/DateTimePicker.css";
import Select from "react-select";

const TimePickerComponent = ({ label, time, handleTimeSelectChange, type }) => {
  const [date, setDate] = useState(new Date());

  //   const handleDateChange = (newDate) => {
  //     setDate(newDate);
  //   };

  //   const handleTimeChange = (newTime) => {
  //     setTime({
  //       hours: newTime.getHours() % 12 || 12,
  //       minutes: newTime.getMinutes(),
  //       ampm: newTime.getHours() >= 12 ? "PM" : "AM",
  //     });
  //   };

  const hourOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));

  const minuteOptions = [
    { value: "00", label: "00" },
    { value: "30", label: "30" },
  ];

  const ampmOptions = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];
  console.log("timetime11", time.hours);

  return (
    <>
      <>
        {/* <div className="form-group col-md-6">
          <label htmlFor="date">Date</label>
          <Datetime
            onChange={handleDateChange}
            value={date}
            format="MM/dd/yyyy"
            minDate={new Date()} // Set minimum date to today
          />
        </div> */}
        <div className="">
          <label htmlFor="time">{label}</label>
          <div className="time-picker-container">
            <Select
              classNamePrefix="time-select"
              className="time-picker-select"
              options={hourOptions}
              value={{ label: time.hours.toString(), value: time.hours }}
              onChange={(selected) =>
                handleTimeSelectChange("hours", selected.value, type)
              }
            />
            <Select
              className="time-picker-select"
              classNamePrefix="time-select"
              options={minuteOptions}
              value={{
                label: time.minutes === 0 ? "00" : "30",
                value: time.minutes,
              }}
              onChange={(selected) =>
                handleTimeSelectChange("minutes", selected.value, type)
              }
            />
            <Select
              className="time-picker-select"
              options={ampmOptions}
              classNamePrefix="time-select"
              value={{ label: time.ampm, value: time.ampm }}
              onChange={(selected) =>
                handleTimeSelectChange("ampm", selected.value, type)
              }
            />
          </div>
        </div>
      </>
    </>
  );
};

export default TimePickerComponent;
