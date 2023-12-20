import React, { useEffect, useState } from "react";
import AddCrewTimeDateModal from "../components/AddCrewTimeDateModal";
import { useNavigate } from "react-router-dom";
import { getAllCrews } from "../API";
import AllCrewsTable from "../components/AllCrewsTable";
import AddNewCrewModal from "../components/AddNewCrewModal";
import Loader from "./Loader";

const AllCrewsManagement = () => {
  const [crewData, setCrewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAllCrews = async () => {
    await getAllCrews()
      .then((res) => {
        if (res?.status === 200) {
          setCrewData(res?.data);
          setIsLoading(false);
        }
      })
      .catch((err) =>
        console.log("Error occured in AllCrewsManagement component", err)
      );
  };
  useEffect(() => {
    fetchAllCrews();
  }, []);
  const addNewCrewUser = () => {
    fetchAllCrews();
  };
  const navigate = useNavigate();
  return (
    <div className="project-details">
      <div className="crew-info">
        <h2 className="title">All Crews</h2>
        <AddNewCrewModal addNewCrewUser={addNewCrewUser} />
        <AddCrewTimeDateModal />
      </div>
      {isLoading ? (
        <Loader />
      ) : crewData && crewData.length > 0 ? (
        <AllCrewsTable crewData={crewData} isLoading={isLoading} />
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default AllCrewsManagement;
