import { useNavigate } from "react-router-dom";
import AddCrewTimeDateModal from "./AddCrewTimeDateModal";

const TimeSheetTable = (props) => {
  const { timeSheets } = props;
  const tableHeadings = ["Punch In", "Punch Out", "Crew Id", "Crew User Id"];
  const getDate = (date) => {
    return new Date(date).toString();
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
          {timeSheets.length ? (
            timeSheets?.map((item, key) => {
              const punchIn = getDate(item.punch_in_date_time);
              const punchOut = getDate(item.punch_out_date_time);

              return (
                <tr key={key}>
                  <td>{punchIn}</td>
                  <td>{punchOut}</td>
                  <td>{item.crew_id}</td>
                  <td>{item.crew_user_id}</td>
                </tr>
              );
            })
          ) : (
            <div>No data found</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetTable;
