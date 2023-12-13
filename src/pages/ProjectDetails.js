import { useState, useEffect } from "react";
import { getProjectDetails } from "../API";

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState();
  console.log("projectDetails", projectDetails);
  const fetchProjectDetails = async () => {
    await getProjectDetails(8)
      .then((res) => {
        if (res.status === 200) {
          setProjectDetails(res?.data);
        }
      })
      .catch((err) => console.log("error occured in getProjectDetails", err));
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  return (
    <>
      <div style={{fontWeight: 'bold'}}>ProjectDetails</div>
      <div style={{marginBottom: '20px', fontWeight: 'bold'}}>Project Info: </div>
      <div>
        <p>Name: {projectDetails?.name}</p>
        <p>Acumatica_project_id: {projectDetails?.acumatica_project_id}</p>
        <p>Description: {projectDetails?.description}</p>
        <p>External_id_source: {projectDetails?.external_id_source}</p>
        <p>Status: {projectDetails?.status}</p>
        <p>CreatedAt: {projectDetails?.created_at}</p>
      </div>
    </>
  );
};

export default ProjectDetails;
