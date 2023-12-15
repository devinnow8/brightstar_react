import { useLocation, useNavigate } from "react-router-dom";

const tableStyleObj = {
  "/all-crews-management": "all-crew-table",
};

const AllCrewsTable = (props) => {
  const location = useLocation();
  console.log(location.pathname, "location");
  const { crewData } = props;
  const tableHeadings = ["Name", "Boss Id", "Project Id"];
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
          {crewData.map((item, key) => {
            return (
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCrewsTable;
