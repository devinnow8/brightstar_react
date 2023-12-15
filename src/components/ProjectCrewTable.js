import { useNavigate } from "react-router-dom";
import AddCrewTimeDateModal from "./AddCrewTimeDateModal";

const ProjectCrewTable = (props) => {
  const { projectCrews } = props;
  const tableHeadings = ["Name", "Boss Id", "Project Id"];
  const navigate = useNavigate();

  const onClickCrewManagement = (item) => {
    navigate(`/crew-management/${item?.project_id}/${item?.id}`, {
      state: { project_id: item?.project_id, crew_id: item?.id },
    });
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
                <td>{item.boss_user_id}</td>
                <td>{item.project_id}</td>
                <td className="details-td">
                  <button
                    className="btn btn-info detail-btn me-3"
                    onClick={() => onClickCrewManagement(item)}
                  >
                    Crew Management
                  </button>
                  <AddCrewTimeDateModal crew_id={item?.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectCrewTable;
