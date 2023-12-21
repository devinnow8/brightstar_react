import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";
import { getMyTimeSheetDetails } from "../API";
// import {convertWeekToDateString} from '../utils/utils'

const MyTimesheet = (props) => {
  console.log("myTimesheet ====>");
  const { timeSheets, isLoading } = props;
  const [timeSheetDetails, setTimeSheetDeatils] = useState([]);
  const [weekString, setWeekString] = useState();

  const navigate = useNavigate();
  const getTimeSheetDeatils = async () => {
    await getMyTimeSheetDetails().then((res) => {
      if (res?.status === 200) {
        setTimeSheetDeatils(res?.data);
      }
    });
  };

  const getDateInFormat = (date) => {
    var finalDate =
      date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
    return finalDate;
  };
  function getDateFromWeek(year, weekNumber) {
    const januaryFirst = new Date(year, 0, 1);
    const dayOfWeek = januaryFirst.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const firstMonday = new Date(januaryFirst);
    firstMonday.setDate(januaryFirst.getDate() + daysUntilMonday);

    // Calculate the start date of the specified week
    const daysToAdd = (weekNumber - 1) * 7;
    const resultDate = new Date(firstMonday);

    const getFirstMondayOfWeek = resultDate.setDate(
      firstMonday.getDate() + daysToAdd
    );
    const startWeekDate = new Date(getFirstMondayOfWeek);
    startWeekDate.setDate(startWeekDate.getDate() + 6);

    const startDate = getDateInFormat(resultDate);
    const endDate = getDateInFormat(startWeekDate);

    return { startDate, endDate };
  }

  useEffect(() => {
    getTimeSheetDeatils();
  }, []);

  console.log("timeSheetDetailstimeSheetDetails", timeSheetDetails);

  const onCardClick = (card) => {
    navigate(`/time-card/${card}`);
  };

  return (
    <div className="timesheet-data">
      <div className="timesheet-flex">
        <div className="timesheet-status">
          <div className="timesheet-header">
            <h3 className="txt">Open</h3>
          </div>
          <div className="timesheet-content">
            {timeSheetDetails?.length > 0 &&
              timeSheetDetails?.map((card) => {
                const week = card?.week;
                const year = week.split("-")[0];
                const cardWeek = week.split("W")[1];

                const { startDate, endDate } = getDateFromWeek(year, cardWeek);
                console.log("datt", startDate, endDate);
                return (
                  <div className="status-card">
                    <h5>{card?.crew?.name}</h5>
                    <p>{startDate + "-" + endDate}</p>
                    <div className="btn-flex">
                      <button
                        onClick={() => {
                          onCardClick(card);
                        }}
                        className="primary-btn open"
                      >
                        Open
                      </button>
                      <button className="primary-btn-outlined">Submit</button>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <div className="text-end">
            <button className="primary-btn-outlined new-btn px-3">
              + New Timesheet
            </button>
          </div> */}
        </div>
        <div className="timesheet-status">
          <div className="timesheet-header">
            <h3 className="txt">In Review</h3>
          </div>
          <div className="timesheet-content">
            {/* {[1, 2, 3, 4].map((card) => {
              return (
                <div className="status-card">
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when.
                  </p>
                  <div className="btn-flex">
                    <button
                      onClick={() => {
                        onCardClick(card);
                      }}
                      className="primary-btn open"
                    >
                      Open
                    </button>
                    <button className="primary-btn-outlined">
                      Submit
                    </button>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
        <div className="timesheet-status">
          <div className="timesheet-header">
            <h3 className="txt">Processing</h3>
          </div>
          <div className="timesheet-content">
            {/* {[1, 2, 3, 4].map((card) => {
              return (
                <div className="status-card">
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when.
                  </p>
                  <div className="btn-flex">
                    <button
                      onClick={() => {
                        onCardClick(card);
                      }}
                      className="primary-btn open"
                    >
                      Open
                    </button>
                    <button className="primary-btn-outlined">
                      Submit
                    </button>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
    // <div className="table-responsive crew-table">
    //   {isLoading && <Loader />}{" "}
    //   <table className="table table-striped">
    //     <thead>
    //       {tableHeadings.map((item, key) => (
    //         <th scope="col" className="table-heading" key={key}>
    //           {item}
    //         </th>
    //       ))}
    //     </thead>
    //     <tbody>
    //       {timeSheets?.length
    //         ? timeSheets?.map((item, key) => {
    //             return (
    //               <tr key={key}>
    //                 <td>{item?.time_entry_in}</td>
    //                 <td>{item.time_entry_out}</td>
    //                 <td>{item.crew_id}</td>
    //                 <td>{item.crew_user_id}</td>
    //               </tr>
    //             );
    //           })
    //         : !isLoading && <div>No data found</div>}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default MyTimesheet;
