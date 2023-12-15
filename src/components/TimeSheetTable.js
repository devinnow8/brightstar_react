import React from "react";
import Loader from "../pages/Loader";

const TimeSheetTable = (props) => {
  const { timeSheets, isLoading } = props;
  const tableHeadings = ["Punch In", "Punch Out", "Crew Id", "Crew User Id"];
  const getDate = (date) => {
    return new Date(date).toUTCString();
  };
  console.log("timeSheets", timeSheets);
  return (
    <div className="table-responsive crew-table">
      {isLoading && (
        <Loader /> // Render your loader component here
      )}{" "}
      <table className="table table-striped">
        <thead>
          {tableHeadings.map((item, key) => (
            <th scope="col" className="table-heading" key={key}>
              {item}
            </th>
          ))}
        </thead>
        <tbody>
          {timeSheets?.length
            ? timeSheets.map((item, key) => {
                const punchIn = getDate(item.punch_in_date_time);
                const punchOut = getDate(item.punch_out_date_time);

                return (
                  <tr key={key}>
                    <td>{punchIn}</td>
                    <td>{punchOut}</td>
                    <td>{item.crew_id}</td>
                    <td>{item.crew_user_id}</td>
                  </tr>
                );
              })
            : !isLoading && <div>No data found</div>}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetTable;
