import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCrewUserByUserId } from "../API";
import Table from "./Table";
import Loader from "./Loader";

const RoleSelect = () => {
  const [crewDetails, setCrewDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log("ididiidid", id);
  let tableHeadings = ["Crew", "Role", "Select"];

  const fetchCrewDetails = async () => {
    getCrewUserByUserId(192)
      .then((res) => {
        setLoading(false);
        if (res?.status === 200) {
          setCrewDetails(res?.data);
        }
      })
      .catch((err) => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchCrewDetails();
    }
  }, []);

  console.log("crewDetailscrewDetailscrewDetails", crewDetails);

  return (
    <>
      {loading && <Loader />}
      <div className="role-select">
      <h1 className="role-text">Select Role</h1>
      <div className="table-responsive role-table">
        <table className="table table-striped">
          <thead>
            <tr>
              {tableHeadings?.map((item, key) => (
                <th scope="col" className="table-heading" key={key}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {crewDetails && crewDetails.length > 0
              ? crewDetails.map((item, key) => (
                  <tr key={key}>
                    <td>{item?.id}</td>
                    <td>{item?.crew_role?.name}</td>
                    <td className="">
                      <button
                        className="btn btn-info detail-btn"
                        onClick={() => console.log("button clicked")}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))
              : !loading && (
                  <tr>
                    <td colSpan="5">No data found</td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
      </div>
      {}
    </>
  );
};

export default RoleSelect;
