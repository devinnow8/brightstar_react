import React, { useEffect, useState } from "react";
import { getAllProjectList } from "../API/index";
import Loader from "../pages/Loader";
import Table from "../pages/Table";

const ProjectsList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  let abc = ["S.No", "Name", "Status", "Description", "Action"];
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjectData();
  }, []);
  console.log(list);
  return (
    <div>
      {loading && <Loader />}
      <Table list={list?.data} abc={abc} />
    </div>
  );
};

export default ProjectsList;
