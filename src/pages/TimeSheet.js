import React, { useEffect, useState } from "react";
import { getTimeSheet, getUserDetails, } from "../API";
import TimeSheetTable from "../components/TimeSheetTable";

export const TimeSheet = () => {
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
    <div>
      <h2 className="title">TimeSheets</h2>{" "}
      <TimeSheetTable
        employeeOptions={allUsers}
        timeSheets={timeSheets}
        isLoading={isLoading}
      />{" "}
    </div>
  );
};

export default TimeSheet;
