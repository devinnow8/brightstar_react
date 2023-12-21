import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/delete.png";
import ArrowLeft from "../assets/images/arrow-left.svg";
import { getMyTimeSheetDetails, getUserDetails } from "../API";
import { getDateInFormat, getDateFromWeek } from "../utils/utils";

export const TimeCard = () => {
  const navigate = useNavigate();
  const [timeSheetDetails, setTimeSheet] = useState({});

  const costCodes = [1, 2, 3, 4];
  const loading = false;
  const { id } = useParams();

  useEffect(() => {
    getDetailsofCard();
  }, []);
  const getDetailsofCard = async () => {
    const queryParams = `id=${id}`;

    await getMyTimeSheetDetails(queryParams).then((res) => {
      if (res?.status === 200) {
        console.log("ppp", res);
        setTimeSheet(res.data[0]);
        //   setTimeSheetDeatils(res?.data);
      }
    });
  };
  let cardStartDate = "";
  let cardEndDate = "";
  if (Object.keys(timeSheetDetails).length) {
    console.log("timeSheetDetails", timeSheetDetails);
    const week = timeSheetDetails?.week;
    const year = week.split("-")[0];
    const cardWeek = week.split("W")[1];
    const { startDate, endDate } = getDateFromWeek(year, cardWeek);
    console.log("startDate", startDate);
    cardStartDate = startDate;
    cardEndDate = endDate;
  }

  return (
    <div className="crew-mgmt">
      <button
        className="primary-btn back-btn mb-4"
        onClick={() => navigate(-1)}
      >
        <img src={ArrowLeft} /> Back
      </button>
      <h2>{timeSheetDetails?.crew?.name}</h2>
      <h3>{cardStartDate + "-" + cardEndDate}</h3>
      <div className="crew-mgmt-card">
        <h3 className="title">Team hours</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              {[
                "Name",
                "Title",
                "Tas",
                "Cost Code",
                "Start",
                "Stop",
                "Hour",
                "Lunch",
                "Action",
              ]?.map((item, key) => (
                <th scope="col" className="table-heading" key={key}>
                  {item}
                </th>
              ))}
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
                      <td>ffed</td>
                      <td>dcesc</td>
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
      </div>
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
