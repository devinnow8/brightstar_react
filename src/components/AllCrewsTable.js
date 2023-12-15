import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";
import { useState } from "react";

const tableStyleObj = {
  "/all-crews-management": "all-crew-table",
};

const AllCrewsTable = (props) => {
  const location = useLocation();
  const { crewData, isloading } = props;
  const tableHeadings = ["Name", "Boss Id", "Project Id", "Actions"];
  const navigate = useNavigate();

  const onClickCrewManagement = (item) => {
    navigate(`/crew-management/${item?.project_id}/${item?.id}`, {
      state: { project_id: item?.project_id, crew_id: item?.id },
    });
  };

  const addTableClass = tableStyleObj[location.pathname] || "";

  return (
    <div className={`table-responsive crew-table ${addTableClass}`}>
      <table className="table table-striped">
        <thead>
          {tableHeadings.map((item, key) => (
            <th scope="col" className="table-heading" key={key}>
              {item}
            </th>
          ))}
        </thead>
        <tbody>
          {isloading ? (
            <Loader />
          ) : crewData && crewData.length > 0 ? (
            crewData.map((item, key) => (
              <tr key={key}>
                <th scope="row" className="table-heading">
                  {item.name}
                </th>
                <td>{item.boss_user_id}</td>
                <td>{item.project_id}</td>
                <td className="details-td">
                  <button
                    className="btn btn-info detail-btn"
                    onClick={() => onClickCrewManagement(item)}
                  >
                    All Crews Management
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeadings.length}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllCrewsTable;
