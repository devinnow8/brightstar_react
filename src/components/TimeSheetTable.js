import React from "react";
import Loader from "../pages/Loader";

const TimeSheetTable = (props) => {
  const { timeSheets, isLoading } = props;
  const tableHeadings = ["Punch In", "Punch Out", "Crew Id", "Crew User Id"];
  //   const getDate = (date) => {
  //     return new Date(date).getDate();
  //   };
  return (
    // <div className="timesheet-data">
    //   <div className="timesheet-flex">
    //     <div className="timesheet-status">
    //       <h3 className="txt">Open</h3>
    //       <div className="status-card">
    //         <p>It is a long established fact that a reader will be distracted by the readable content of a page when.</p>
    //         <div className="btn-flex">
    //           <button className="primary-btn open">Open</button>
    //           <button className="primary-btn-outlined submit">Submit</button>
    //         </div>
    //       </div>
    //       <div className="text-end">
    //         <button className="primary-btn-outlined new-btn px-3">+ New Timesheet</button>
    //       </div>
    //     </div>
    //     <div className="timesheet-status">
    //       <h3 className="txt">In Review</h3>
    //       <div className="status-card">
    //         <p>It is a long established fact that a reader will be distracted by the readable content of a page when.</p>
    //         <div className="btn-flex">
    //           <button className="primary-btn open">Open</button>
    //           <button className="primary-btn-outlined submit">Submit</button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="timesheet-status">
    //       <h3 className="txt">Processing</h3>
    //       <div className="status-card">
    //         <p>It is a long established fact that a reader will be distracted by the readable content of a page when.</p>
    //         <div className="btn-flex">
    //           <button className="primary-btn open">Open</button>
    //           <button className="primary-btn-outlined submit">Submit</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
      
    // </div>
    <div className="table-responsive crew-table">
      {isLoading && <Loader />}{" "}
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
            ? timeSheets?.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item?.time_entry_in}</td>
                    <td>{item.time_entry_out}</td>
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
