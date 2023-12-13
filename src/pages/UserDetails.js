import React, { useState, useEffect } from "react";
import { getUserDetailsInfo } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const UserDetails = () => {
  const [projectDetails, setProjectDetails] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();
  console.log("param", param);

  const fetchProjectDetails = async () => {
    try {
      const res = await getUserDetailsInfo(param?.id);
      if (res.status === 200) {
        setProjectDetails(res?.data);
        setLoading(false);
      }
    } catch (err) {
      console.log("Error occurred in getUserDetailsInfo", err);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  return (
    <div>
      <div className="project-details">
        <button
          className="btn btn-primary back-btn"
          onClick={() => navigate("/users")}
        >
          Back
        </button>
        <h1 className="title">User Details...</h1>
        <div className="row">
          {loading ? (
            <Loader />
          ) : (
            <div className="col-md-12 col-lg-12 project-col">
              <div className="card">
                <p>
                  <strong>Name:</strong> {projectDetails?.name}
                </p>
                <p>
                  <strong>Acumatica_employee_id:</strong>{" "}
                  {projectDetails?.employee_id}
                </p>
                <p>
                  <strong>Email:</strong> {projectDetails?.email}
                </p>
                <p>
                  <strong>External_id_source:</strong>{" "}
                  {projectDetails?.external_id_source}
                </p>
                <p>
                  <strong>Status:</strong> {projectDetails?.status}
                </p>
                <p>
                  <strong>CreatedAt:</strong> {projectDetails?.created_at}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
