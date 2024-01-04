import React, { useState } from "react";
import { addCrewUser } from "../API";
import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

const AddCrewEquipment = ({ onAddNewMember, userOptions }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const crewTableHeadings = [];
  const { crewId, projectId } = useParams();

  const onAddNewUser = () => {
    addNewCrewMemberPromise(selectedUser);
  };

  const addNewCrewMemberPromise = async (data) => {
    const crewUserPayload = {
      crew_id: crewId,
      user_id: data?.value,
      crew_role_id: 4,
    };

    await addCrewUser(crewUserPayload).then((res) => {
      if (res?.status === 200) {
        onAddNewMember();
      }
    });
  };

  console.log("userOptionsuserOptions", userOptions);

  return (
    <>
      <div className="text-end">
        <button
          type="button"
          className="btn primary-btn-outlined mb-4 px-3"
          data-bs-toggle="modal"
          data-bs-target="#addEquipmentModal"
          // onClick={() => onAddCrewClick()}
        >
          + Add Equipment
        </button>
      </div>

      <div
        className="modal fade"
        id="addEquipmentModal"
        tabindex="-1"
        aria-labelledby="addEquipmentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title font-weight-bold"
                id="addEquipmentModalLabel"
              >
                Add New Equipment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <>
                <div className="table-responsive">
                  <table className="table crew-modal-table table-striped">
                    <thead>
                      <tr>
                        {crewTableHeadings?.length > 0 &&
                          crewTableHeadings?.map((item, key) => (
                            <th scope="col" className="table-heading" key={key}>
                              {item}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {userOptions?.map((item, key) => {
                        return (
                          <tr
                            className={
                              selectedUser.value === item.value
                                ? "activeRow"
                                : ""
                            }
                            onClick={() => setSelectedUser(item)}
                            key={key}
                          >
                            {/* <td>{item.id}</td> */}
                            {/* <td>{item.value}</td> */}
                            <td>{item.name}</td>
                            {/* <td>{item.description}</td> */}
                            <td className="details-td"></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            </div>
            <div className="modal-footer">
              <button
                data-bs-dismiss="modal"
                type="button"
                className="primary-btn"
                aria-label="Close"
                onClick={() => onAddNewUser()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCrewEquipment;
