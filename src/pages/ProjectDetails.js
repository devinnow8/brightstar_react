import { useState, useEffect } from "react";
import { getProjectDetails, getProjectCrews } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState();
  const [projectCrews, setProjectCrews] = useState([]);
  const navigate = useNavigate();
  const param = useParams();

  const fetchProjectDetails = async () => {
    await getProjectDetails(param?.id)
      .then((res) => {
        if (res.status === 200) {
          setProjectDetails(res?.data);
        }
      })
      .catch((err) => console.log("error occured in getProjectDetails", err));
  };

  console.log("projectCrew ======>", projectCrews);

  const fetchProjectCrews = async () => {
    await getProjectCrews(param?.id)
      .then((res) => {
        if (res.status === 200) {
            setProjectCrews(res?.data);
        }
      })
      .catch((err) =>
        console.log("error occured while fetching project crews", err)
      );
  };

  useEffect(() => {
    fetchProjectDetails();
    fetchProjectCrews();
  }, []);

  return (
    <div className="project-details">
      <button
        className="btn btn-primary back-btn"
        onClick={() => navigate("/projects")}
      >
        Back
      </button>
      <h1 className="title">Project Details...</h1>
      <div className="row">
        <div className="col-md-12 col-lg-12 project-col">
          <div className="card">
            <p>
              <strong>Name:</strong> {projectDetails?.name}
            </p>
            <p>
              <strong>Acumatica_project_id:</strong>{" "}
              {projectDetails?.acumatica_project_id}
            </p>
            <p>
              <strong>Description:</strong> {projectDetails?.description}
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
      </div>
      <div>Crew Info: </div>
      <Modal />
    </div>
  );
};

export default ProjectDetails;
