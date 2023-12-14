import React, { useEffect, useState } from "react";
import AddCrewModal from "../components/AddCrewModal";
import AddCrewTimeModal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { getAllCrews } from "../API";
import ProjectCrewTable from "../components/ProjectCrewTable";
import AllCrewsTable from "../components/AllCrewsTable";

const AllCrewsManagement = () => {
  const [crewData, setCrewData] = useState([]);
  const fetchAllCrews = async () => {
    await getAllCrews()
      .then((res) => {
        console.log("response =>", res);
        if (res?.status === 200) {
          setCrewData(res?.data);
        }
      })
      .catch((err) =>
        console.log("Error occured in AllCrewsManagement component", err)
      );
  };
  useEffect(() => {
    fetchAllCrews()
  },[]);
  const navigate = useNavigate();
  console.log("crewData ===>", crewData);
  return (
    <div className="project-details">
      <button
        className="btn btn-primary back-btn"
        onClick={() => navigate("/projects")}
      >
        Back
      </button>
      <div className="crew-info">
        <h1 className="title">All Crews</h1>
        {/* <AddCrewModal
          projectId={projectDetails?.id}
          onAddCrewClick={onAddCrewClick}
        />
        <AddCrewTimeModal /> */}
      </div>
      {crewData.length > 0 && (
        <AllCrewsTable crewData={crewData} />
      )}
    </div>
  );
};

export default AllCrewsManagement;
