import React, { useEffect, useState } from "react";
import { getAllProjectList } from "../API/index";
import Loader from "../pages/Loader";
import Table from "../pages/Table";
import { useNavigate } from "react-router-dom";

const ProjectsList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  let tableHeadings = ["S.No", "Name", "Status", "Description", "Action"];
  const getAllProjectData = async () => {
    try {
      const data = await getAllProjectList();
      if (data) {
        setList(data);
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      console.log("Error===>>>", error, error.message);
      setError(true);
      setLoading(false);
    }
  };
  const detailHandler = (id) => {
    navigate(`/project-details/${id}`, {
      state: {
        id: id,
      },
    });
  };
  useEffect(() => {
    getAllProjectData();
  }, []);
  console.log(list);
  return (
    <>
      {loading && <Loader />}
      {error && <div>Something went wrong</div>}
      {!loading && !error && (
        <Table
          list={list?.data}
          tableHeadings={tableHeadings}
          detailHandler={detailHandler}
        />
      )}
    </>
  );
};

export default ProjectsList;
