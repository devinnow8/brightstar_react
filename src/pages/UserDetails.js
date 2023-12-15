import React, { useState, useEffect } from "react";
import { getUserDetailsInfo } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const UserDetails = () => {
  const [projectDetails, setProjectDetails] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();

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
        <h1 className="title">User Details</h1>
        <div className="row">
          {loading ? (
            <Loader />
          ) : (
            <div className="col-md-12 col-lg-12 project-col">
              <div className="card">
                <div className="card-data">
                  <p className="heading">Name:</p>
                  <p className="data">{projectDetails?.name}</p>
                </div>
                <div className="card-data">
                  <p className="heading">Acumatica_employee_id:</p>
                  <p className="data">{projectDetails?.employee_id}</p>
                </div>
                <div className="card-data">
                  <p className="heading">Email:</p>
                  <p className="data">{projectDetails?.email}</p>
                </div>
                <div className="card-data">
                  <p className="heading">External_id_source:</p>
                  <p className="data">{projectDetails?.external_id_source}</p>
                </div>
                <div className="card-data">
                  <p className="heading">Status:</p>
                  <p className="data">{projectDetails?.status}</p>
                </div>
                <div className="card-data">
                  <p className="heading">CreatedAt:</p>
                  <p className="data">{projectDetails?.created_at}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
