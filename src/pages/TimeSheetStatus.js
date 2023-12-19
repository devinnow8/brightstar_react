import React, { useEffect, useState } from "react";
import { getTimeSheet, getUserDetails,  } from "../API";
import MyTimesheet from "../components/MyTimesheet";

export const TimeCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeSheets, setTimeSheets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getTimeSheetData();
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const result = await getUserDetails();
    setAllUsers(result.data);
    if (result.data) {
      setIsLoading(false);
    }
  };

  const getTimeSheetData = async () => {
    const result = await getTimeSheet();
    setTimeSheets(result.data);
    if (result.data) {
      setIsLoading(false);
    }
  };
  return (
    <div className="timesheet">
      <h3>My Timesheets</h3>{" "}
      <MyTimesheet
        employeeOptions={allUsers}
        timeSheets={timeSheets}
        isLoading={isLoading}
      />{" "}
      <div className="text-end">
        <button className="primary-btn save-btn">Save</button>
      </div>
    </div>
  );
};

export default TimeCards;
