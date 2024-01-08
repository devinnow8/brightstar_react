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
  const [equipmentTimeSheet, setEquipmentTimeSheet] = useState({});
  const [showAddTimeButton, setShowAddTimeButton] = useState(false);
  const [addCrewModal, setAddCrewModal] = useState(false);

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
      const filteredUserTime = res?.data?.filter(
        (ele) => ele.time_entry_type_id === 1
      );
      const filteredEquipmentTime = res?.data?.filter(
        (ele) => ele.time_entry_type_id === 2
      );
      console.log("filteredEquipmentTime ==>", filteredEquipmentTime);
      setTimeSheetWeekDetails(filteredUserTime);
      setEquipmentTimeSheet(filteredEquipmentTime);
    });
  };

  const getDetailsofCard = async () => {
    const queryParams = `id=${id}`;

    await getMyTimeSheetDetails(queryParams).then((res) => {
      if (res?.status === 200) {
        console.log("ppppp", res.data);
        setTimeSheetDetails(res?.data[0]);
        getTimeSheetWeekDetails(res?.data[0]);
      }
    });
  };

  const getPerDayDetails = (data) => {
    return _.groupBy(data, "time_entry_date");
  };

  const cachedUserValue = useMemo(() => {
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

  const cachedEquipmentValue = useMemo(() => {
    if (equipmentTimeSheet?.length > 0) {
      const data = getPerDayDetails(equipmentTimeSheet);
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
  }, [equipmentTimeSheet]);

  const CardData = useMemo(() => {
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
    return { cardStartDate, cardEndDate };
  }, [timeSheetDetails]);

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
  const onModalClick = (value) => {
    setAddCrewModal(value);
  };
  useEffect(() => {
    console.log("addddddddd", addCrewModal);
  }, [addCrewModal]);
  console.log("cachedEquipmentValueii", cachedEquipmentValue);
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
          onClick={() => onModalClick(true)}
        >
          + Add Crew Time/Date
        </button>
      </div>

      <h2>{timeSheetDetails?.crew?.name}</h2>
      {cachedUserValue && Object?.keys(cachedUserValue)?.length > 0 && (
        <h3>{CardData?.cardStartDate + "-" + CardData?.cardEndDate}</h3>
      )}
      {Object?.keys(cachedUserValue)?.length > 0 &&
        Object?.keys(cachedUserValue)?.map((dayDetails) => {
          console.log("dayDetails111", cachedUserValue[dayDetails]);
          const currentDisplayDate = new Date(dayDetails)
            .toISOString()
            .split("T");
          const day = getDayFromDate(new Date(dayDetails));
          console.log("day", new Date(dayDetails).getDay());
          return (
            <div className="crew-mgmt-card">
              <h3 className="title">{day + " " + currentDisplayDate[0]}</h3>
              {cachedUserValue[dayDetails]?.length > 0 && <>
              <h2>Team Hours</h2>
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
                      "Lunch",
                    ]?.map((item, key) => (
                      <th scope="col" className="table-heading" key={key}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cachedUserValue[dayDetails] &&
                  cachedUserValue[dayDetails]?.length > 0
                    ? cachedUserValue[dayDetails]?.map((item, key) => {
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
                            <td>{item?.lunch}hr</td>
                          </tr>
                        );
                      })
                    : !loading && <tr>No data found</tr>}
                </tbody>
              </table>
              </>}
              {cachedEquipmentValue[dayDetails]?.length > 0 && (
                <>
                  <h2>Equipment Hours</h2>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        {[
                          "Item",
                          "Equip. No.",
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
                      {cachedEquipmentValue[dayDetails] &&
                      cachedEquipmentValue[dayDetails]?.length > 0
                        ? cachedEquipmentValue[dayDetails]?.map((item, key) => {
                            console.log("fastmap ==>", item);
                            return (
                              <tr
                                //   className={selectedUser.id === item.id ? "activeRow" : ""}
                                //   onClick={() => setSelectedUser(item)}
                                key={key}
                              >
                                <td>{item?.cost_code}</td>
                                <td>{item?.cost_code}</td>
                                <td>{item?.task}</td>
                                <td>{item?.cost_code}</td>
                                <td>{item?.time_entry_in}</td>
                                <td>{item?.time_entry_out}</td>
                                <td>{item?.hours}</td>
                               
                              </tr>
                            );
                          })
                        : !loading && <tr>No data found</tr>}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          );
        })}
      <RightDrawerModal
        crew_id={timeSheetDetails?.crew_id}
        project_id={timeSheetDetails?.crew?.project_id}
        addCrewModal={addCrewModal}
        onModalClick={onModalClick}
      />
    </div>
  );
};

export default TimeCard;
