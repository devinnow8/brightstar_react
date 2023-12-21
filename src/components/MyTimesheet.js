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
      if(res?.status === 200){
        setTimeSheetDeatils(res?.data);
      }
    });
  };

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
            {timeSheetDetails?.length> 0 && timeSheetDetails?.map((card) => {
              return (
                <div className="status-card">
                  <p>
                    {card?.crew?.name}
                  </p>
                  <br />
                  <h2>{card?.week}</h2>
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
