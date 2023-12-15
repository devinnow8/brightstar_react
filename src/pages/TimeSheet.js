import React, { useEffect, useState } from "react";
import { getTimeSheet } from "../API";
import TimeSheetTable from "../components/TimeSheetTable";

export const TimeSheet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeSheets, setTimeSheets] = useState([]);
  useEffect(() => {
    getTimeSheetData();
  }, []);

  const getTimeSheetData = async () => {
    const result = await getTimeSheet();
    setTimeSheets(result.data);
    if (result.data) {
      setIsLoading(false);
    }
    // console.log("data", data);
  };
  return (
    <div>
      <h3>TimeSheets</h3>{" "}
      <TimeSheetTable timeSheets={timeSheets} isLoading={isLoading} />{" "}
    </div>
  );
};

export default TimeSheet;
