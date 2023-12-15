import React from "react";
import Loader from "../pages/Loader";

const TimeSheetTable = (props) => {
  const { timeSheets, isLoading, employeeOptions } = props;
  const tableHeadings = ["Punch In", "Punch Out", "Crew Id", "User Name"];
  //   const getDate = (date) => {
  //     return new Date(date).getDate();
  //   };
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
          {timeSheets?.length ? (
            timeSheets?.map((item, key) => {
              const user = employeeOptions.find(
                (user) => user.id === item.crew_user_id
              );
              
              //   const punchIn = getDate(item.time_entry_in);
              //   const punchOut = getDate(item.time_entry_out);

              return (
                <tr key={key}>
                  <td>{item?.time_entry_in}</td>
                  <td>{item?.time_entry_out}</td>
                  <td>{item?.crew_id}</td>
                  <td>{user?.name}</td>
                </tr>
              );
            })
          ) : (
            <div>No data found</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetTable;
