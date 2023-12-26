import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/delete.png";
import ArrowLeft from "../assets/images/arrow-left.svg";
import {
  getMyTimeSheetDetails,
  getTimeSheetByWeek,
  getUserDetails,
} from "../API";
import { getDateInFormat, getDateFromWeek } from "../utils/utils";
import RightDrawerModal from "../components/RightDrawerModal";

export const TimeCard = () => {
  const navigate = useNavigate();
  const [timeSheetDetails, setTimeSheetDetails] = useState({});
  const [timeSheetWeekDetails, setTimeSheetWeekDetails] = useState({});
  const [showAddTimeButton, setShowAddTimeButton] = useState(false);
  const [addCrewModal, setAddCrewModal] = useState(false);

  const costCodes = [1, 2, 3, 4];
  const loading = false;
  const { id } = useParams();

  useEffect(() => {
    setShowAddTimeButton(true);
    getDetailsofCard();
  }, []);

  const getTimeSheetWeekDetails = async (timeSheetData) => {
    const data = {
      week: timeSheetData?.week,
      crew_id: timeSheetData?.crew_id,
    };
    console.log("getTimeSheetWeekDetails", data);
    await getTimeSheetByWeek(data).then((res) => {
      setShowAddTimeButton(false);
      setTimeSheetWeekDetails(res?.data);
    });
  };

  const getDetailsofCard = async () => {
    const queryParams = `id=${id}`;

    await getMyTimeSheetDetails(queryParams).then((res) => {
      if (res?.status === 200) {
        console.log("ppppp", res.data);
        setTimeSheetDetails(res?.data[0]);
        getTimeSheetWeekDetails(res?.data[0]);
        //   setTimeSheetDeatils(res?.data);
      }
    });
  };

  const getPerDayDetails = (data) => {
    return _.groupBy(data, "time_entry_date");
  };

  const cachedValue = useMemo(() => {
    if (timeSheetWeekDetails?.length > 0) {
      const data = getPerDayDetails(timeSheetWeekDetails);
      const dates = structuredClone(data);
      let orderedDates = {};
      _(dates)
        .keys()
        .sort()
        .each(function (key) {
          orderedDates[key] = dates[key];
        });

      return orderedDates;
    } else {
      return {};
    }
  }, [timeSheetWeekDetails]);

  console.log("cachedValue123", timeSheetWeekDetails, cachedValue);

  let cardStartDate = "";
  let cardEndDate = "";
  if (timeSheetDetails && Object?.keys(timeSheetDetails)?.length) {
    const week = timeSheetDetails?.week;
    const year = week?.split("-")[0];
    const cardWeek = week?.split("W")[1];
    const { startDate, endDate } = getDateFromWeek(year, cardWeek);
    console.log("startDate", startDate);
    cardStartDate = startDate;
    cardEndDate = endDate;
  }
  console.log("timeSheetWeekDetails", timeSheetWeekDetails);
  const getDayFromDate = (date) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var day = days[date.getDay()];
    console.log("dayyyy", day);
    return day;
  };
  const onModalClick = () => {
    setAddCrewModal(true);
  };
  console.log("cachedValueii", cachedValue);
  return (
    <div className="crew-mgmt">
      <div className="d-flex justify-content-between">
        <button
          className="primary-btn back-btn mb-4"
          onClick={() => navigate(-1)}
        >
          <img src={ArrowLeft} /> Back
        </button>
        <button
          class="btn crew-float-btn fixed-bottom btn-primary primary-btn detail-btn px-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          disabled={showAddTimeButton}
          onClick={() => onModalClick()}
        >
          + Add Crew Time/Date
        </button>
      </div>

      <h2>{timeSheetDetails?.crew?.name}</h2>
      {cachedValue && Object?.keys(cachedValue)?.length > 0 && (
        <h3>{cardStartDate + "-" + cardEndDate}</h3>
      )}
      {Object?.keys(cachedValue)?.length > 0 &&
        Object?.keys(cachedValue)?.map((dayDetails) => {
          console.log("dayDetails111", cachedValue[dayDetails]);
          const currentDisplayDate = new Date(dayDetails)
            .toISOString()
            .split("T");
          const day = getDayFromDate(new Date(dayDetails));
          console.log("day", new Date(dayDetails).getDay());
          return (
            <div className="crew-mgmt-card">
              <h3 className="title">{day + " " + currentDisplayDate[0]}</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    {[
                      "Name",
                      "Task",
                      "Cost Code",
                      "Start",
                      "Stop",
                      "Hour",
                    ]?.map((item, key) => (
                      <th scope="col" className="table-heading" key={key}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cachedValue[dayDetails] &&
                  cachedValue[dayDetails]?.length > 0
                    ? cachedValue[dayDetails]?.map((item, key) => {
                        console.log("fastmap ==>", item);
                        return (
                          <tr
                            //   className={selectedUser.id === item.id ? "activeRow" : ""}
                            //   onClick={() => setSelectedUser(item)}
                            key={key}
                          >
                            <td>{item?.name}</td>
                            <td>{item?.task}</td>
                            <td>{item?.cost_code}</td>
                            <td>{item?.time_entry_in}</td>
                            <td>{item?.time_entry_out}</td>
                            <td>{item?.hours}hr</td>
                          </tr>
                        );
                      })
                    : !loading && <tr>No data found</tr>}
                </tbody>
              </table>
              <RightDrawerModal
                crew_id={timeSheetDetails?.crew_id}
                id="offcanvasRight"
                project_id={timeSheetDetails?.crew?.project_id}
                addCrewModal={addCrewModal}
              />
            </div>
          );
        })}

      {/* <div className="crew-mgmt-card">
        <h3 className="title">Equipment hours</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              {["Team", "id", "Cost code", "Description", "Action"]?.map(
                (item, key) => (
                  <th scope="col" className="table-heading" key={key}>
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {costCodes && costCodes.length > 0
              ? costCodes.map((item, key) => {
                  return (
                    <tr
                      //   className={selectedUser.id === item.id ? "activeRow" : ""}
                      //   onClick={() => setSelectedUser(item)}
                      key={key}
                    >
                      <th scope="col">
                        <input
                          //   onChange={(evt) => onRowSelection(evt, item)}
                          type="checkbox"
                        />
                      </th>
                      <td>pp</td>

                      <td>ffed</td>
                      <td>dcesc</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={editIcon}
                            className="img-fluid me-3 icon"
                            alt=""
                          />
                          <img
                            src={deleteIcon}
                            className="img-fluid icon"
                            alt=""
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : !loading && <tr>No data found</tr>}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default TimeCard;
