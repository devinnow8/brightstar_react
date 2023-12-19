import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AddCrewTimeDateModal from "./AddCrewTimeDateModal";
import RightDrawerModal from "./RightDrawerModal";

const ProjectCrewTable = (props) => {
  const { projectCrews, projectId } = props;
  console.log("projectCrews ===>", projectCrews);
  const [selectedCrewId, setSelectedCrewId] = useState();

  const tableHeadings = ["Name", "Actions"];
  const navigate = useNavigate();

  const onClickCrewManagement = (item) => {
    // setProjectId(item?.project_id);
    navigate(`/crew-management/${item?.project_id}/${item?.id}`, {
      state: { project_id: item?.project_id, crew_id: item?.id },
    });
  };
  const selectCrewIdForTimeEntry = (id) => {
    setSelectedCrewId(id);
  };
  return (
    <div className="table-responsive crew-table">
      <table className="table table-striped">
        <thead>
          {tableHeadings.map((item, key) => (
            <th scope="col" className="table-heading" key={key}>
              {item}
            </th>
          ))}
        </thead>
        <tbody>
          {projectCrews.map((item, key) => {
            return (
              <tr key={key}>
                <th scope="row" className="table-heading">
                  {item.name}
                </th>
                {/* <td>{item.boss_user_id}</td>
                <td>{item.project_id}</td> */}
                <td className="details-td">
                  <button
                    className="btn btn-info detail-btn me-3"
                    onClick={() => onClickCrewManagement(item)}
                  >
                    Crew Management
                  </button>
                  {/* <AddCrewTimeDateModal crew_id={item?.id} /> */}
                  {/* <button
                    type="button"
                    class="btn btn-primary primary-btn detail-btn px-3"
                    data-bs-toggle="modal"
                    data-bs-target="#largeModal"
                    onClick={() => selectCrewIdForTimeEntry(item?.id)}
                  >
                    + Add Crew Time/Date old
                  </button> */}
                  <button
                    class="btn btn-primary primary-btn detail-btn px-3"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    onClick={() => selectCrewIdForTimeEntry(item?.id)}
                  >
                    + Add Crew Time/Date
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <AddCrewTimeDateModal crew_id={selectedCrewId} id="largeModal" /> */}
      <RightDrawerModal crew_id={selectedCrewId} id="offcanvasRight" project_id = {projectId} />
    </div>
  );
};

export default ProjectCrewTable;
