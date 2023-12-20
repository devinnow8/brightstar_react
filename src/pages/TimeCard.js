import React from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/delete.png";
import chevronLeft from "../assets/images/chevron-left.svg"

export const TimeCard = () => {
  const navigate = useNavigate();
  const costCodes = [1, 2, 3, 4];
  const loading = false;
  return (
    <div className="crew-mgmt">
      <button className="primary-btn back-btn mb-4" onClick={() => navigate(-1)}>
        <img src={chevronLeft} />   Back
      </button>
      <div className="crew-mgmt-card">
        <h3 className="title">Team hours</h3>
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
                        <img src={editIcon} className="img-fluid me-3 icon" alt="" />
                        <img src={deleteIcon} className="img-fluid icon" alt="" />
                      </div>
                    </td>
                  </tr>
                );
              })
              : !loading && <tr>No data found</tr>}
          </tbody>
        </table>
      </div>
      <div className="crew-mgmt-card">
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
                        <img src={editIcon} className="img-fluid me-3 icon" alt="" />
                        <img src={deleteIcon} className="img-fluid icon" alt="" />
                      </div>
                    </td>
                  </tr>
                );
              })
              : !loading && <tr>No data found</tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeCard;
