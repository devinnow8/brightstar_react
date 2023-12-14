import { useNavigate } from "react-router-dom";

const AllCrewsTable = (props) => {
  const { crewData } = props;
  const tableHeadings = ["Name", "Boss_Id", "Project_Id"];
  const navigate = useNavigate();

  const onClickCrewManagement = (item) => {
    navigate(`/crew-management?${item?.id}`, {
      state: { project_id: item?.project_id },
    });
  };
  
  return (
    <div className="table-responsive crew-table">
      <table class="table table-striped">
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
                <th scope="row">{item.name}</th>
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
