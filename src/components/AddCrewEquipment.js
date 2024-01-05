import React, { useState } from "react";
import { addCrewEquipment } from "../API";
import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

const AddCrewEquipment = ({ onAddNewEquipment, allEquipments }) => {
  const [selectedEquipment, setSelectedEquipment] = useState({});
  const crewTableHeadings = ["Item", "Equipment Number"];
  const { crewId, projectId } = useParams();

  const onAddEquipment = () => {
    addNewEquipmentPromise(selectedEquipment);
  };

  const addNewEquipmentPromise = async (data) => {
    const payload = {
      crew_id: crewId,
      equipment_id: data?.id,
    };

    await addCrewEquipment(payload).then((res) => {
      if (res?.status === 200) {
        onAddNewEquipment();
      }
    }).catch((err) => console.log("err in addCrewEquipment =>", err))
  };

  console.log("selectedEquipment ==>", selectedEquipment);

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
                      {allEquipments?.map((item, key) => {
                        return (
                          <tr
                            className={
                              selectedEquipment.id === item.id
                                ? "activeRow"
                                : ""
                            }
                            onClick={() => setSelectedEquipment(item)}
                            key={key}
                          >
                            <td>{item.name}</td>
                            <td>{item.acumatica_id}</td>
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
                onClick={() => onAddEquipment()}
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
