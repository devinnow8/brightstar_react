import { useState, useEffect } from "react";
import { getProjectDetails, getProjectCrews } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import AddCrewTimeDateModal from "../components/AddCrewTimeDateModal";
import ProjectCrewTable from "../components/ProjectCrewTable";
import AddCrewModal from "../components/AddCrewModal";

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState();
  const [projectCrews, setProjectCrews] = useState([]);
  // const [isCrewTimeModal, setIsCrewTimeModal] = useState(false);
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

  const onAddCrewClick = () => {};
  const addNewCrewToList = async () => {
    await fetchProjectCrews();
  };
  //   const onAddCrewTime = () => {
  //     setIsCrewTimeModal(true);
  //   };

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
      <h1 className="title">Project Details</h1>
      <div className="row">
        <div className="col-md-12 col-lg-12 project-col">
          <div className="card">
            <div className="card-data">
              <p className="heading">Name:</p>
              <p className="data">{projectDetails?.name}</p>
            </div>
            <div className="card-data">
              <p className="heading">Acumatica_project_id:</p>
              <p className="data">{projectDetails?.acumatica_project_id}</p>
            </div>
            <div className="card-data">
              <p className="heading">Description:</p>
              <p className="data">{projectDetails?.description}</p>
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
      </div>
      <div className="crew-info">
        <h1 className="title">Crew Info</h1>
        <AddCrewModal
          projectId={projectDetails?.id}
          onAddCrewClick={onAddCrewClick}
          addNewCrewToList={addNewCrewToList}
        />
        <AddCrewTimeDateModal />
        {/* <button
          onClick={() => onAddCrewTime()}
          type="button"
          className="btn btn-info detail-btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          + Add Crew Time
        </button> */}
      </div>
      {projectCrews.length > 0 && (
        <ProjectCrewTable projectCrews={projectCrews} />
      )}
      {/* {isCrewTimeModal && } */}
    </div>
  );
};

export default ProjectDetails;
