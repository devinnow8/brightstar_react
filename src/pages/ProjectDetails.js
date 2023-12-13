import { useState, useEffect } from "react";
import { getProjectDetails } from "../API";
import { useNavigate, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState();
  console.log("projectDetails", projectDetails);
  const navigate = useNavigate();
  const param = useParams();
  console.log("param", param);

  const fetchProjectDetails = async () => {
    await getProjectDetails(param?.id)
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
    <div className="project-details">
      <button className="btn btn-primary back-btn" onClick={() => navigate("/projects")}>Back</button>
      <h1 className="title">Project Details...</h1>
      <div className="row">
        <div className="col-md-12 col-lg-12 project-col">
          <div className="card">
            <p><strong>Name:</strong> {projectDetails?.name}</p>
            <p><strong>Acumatica_project_id:</strong> {projectDetails?.acumatica_project_id}</p>
            <p><strong>Description:</strong> {projectDetails?.description}</p>
            <p><strong>External_id_source:</strong> {projectDetails?.external_id_source}</p>
            <p><strong>Status:</strong> {projectDetails?.status}</p>
            <p><strong>CreatedAt:</strong> {projectDetails?.created_at}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProjectDetails;
