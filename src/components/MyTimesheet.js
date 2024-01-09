import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";
import { getMyTimeSheetDetails, updateMyTimeCardStatus } from "../API";
import { getDateFromWeek,getStartEndDate } from "../utils/utils";
import { toast } from "react-toastify";

const MyTimesheet = (props) => {
  console.log("myTimesheet ====>");
  const { timeSheets, isLoading } = props;

  const [timeSheetOpen, setTimeSheetOpen] = useState([]);
  const [timeSheetInReview, setTimeSheetInReview] = useState([]);
  const [timeSheetProcessing, setTimeSheetProcessing] = useState([]);
  const [weekString, setWeekString] = useState();
  console.log("timeSheetOpentimeSheetOpen", timeSheetOpen);
  const navigate = useNavigate();

  const getTimeSheetDeatils = async () => {
    await getMyTimeSheetDetails().then((res) => {
      if (res?.status === 200) {
        res?.data?.map((item) => {
          if (item?.time_sheet_status_id === 1) {
            console.log("itemInOpenTimeSheet", item);
            setTimeSheetOpen((previousValue) => [...previousValue, item]);
          }
          if (item?.time_sheet_status_id === 2) {
            setTimeSheetInReview((previousValue) => [...previousValue, item]);
          }
          if (item?.time_sheet_status_id === 3) {
            setTimeSheetProcessing((previousValue) => [...previousValue, item]);
          }
        });
      }
    });
  };

  useEffect(() => {
    getTimeSheetDeatils();
  }, []);

  const onCardClick = (card) => {
    navigate(`/timesheet-card/${card.id}`);
  };

  const onSubmitClick = async (card) => {
    console.log("asynccardcard", card);
    const payload = {
      time_sheet_status_id: card?.time_sheet_status_id + 1,
    };
    await updateMyTimeCardStatus(payload, card?.id).then((res) => {
      if (res?.status === 200) {
        toast.success("Time Card Status Updated");
        setTimeSheetOpen([]);
        setTimeSheetInReview([]);
        setTimeSheetProcessing([]);
        getTimeSheetDeatils();
      }
    });
  };

  return (
    <div className="timesheet-data">
      <div className="timesheet-flex">
        <div className="timesheet-status">
          <div className="timesheet-header">
            <h3 className="txt">Open</h3>
          </div>
          <div className="timesheet-content">
            {timeSheetOpen?.length > 0 &&
              timeSheetOpen?.map((card) => {
                const week = card?.week;
                const year = week.split("-")[0];
                const cardWeek = week.split("W")[1];

                const { startDate, endDate } = getStartEndDate(year, cardWeek);
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
                      <button
                        onClick={() => {
                          onSubmitClick(card);
                        }}
                        className="primary-btn-outlined"
                      >
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
            {timeSheetInReview?.length > 0 &&
              timeSheetInReview?.map((card) => {
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
                      <button
                        onClick={() => {
                          onSubmitClick(card);
                        }}
                        className="primary-btn-outlined"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="timesheet-status">
          <div className="timesheet-header">
            <h3 className="txt">Processing</h3>
          </div>
          <div className="timesheet-content">
            {timeSheetProcessing?.length > 0 &&
              timeSheetProcessing?.map((card) => {
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
                      {/* <button
                        onClick={() => {
                          onSubmitClick(card);
                        }}
                        className="primary-btn-outlined"
                      >
                        Submit
                      </button> */}
                    </div>
                  </div>
                );
              })}
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
