import React, { useEffect, useState } from "react";
import { getTimeSheet } from "../API";
import TimeSheetTable from "../components/TimeSheetTable";

export const TimeSheet = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  useEffect(() => {
    getTimeSheetData();
  }, []);

  const getTimeSheetData = async () => {
    const result = await getTimeSheet();
    setTimeSheets(result.data);
    // console.log("data", data);
  };
  return (
    <div>
      <h3>TimeSheets</h3> <TimeSheetTable timeSheets={timeSheets} />{" "}
    </div>
  );
};

export default TimeSheet;
