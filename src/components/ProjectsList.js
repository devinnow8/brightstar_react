import React, { useEffect, useState } from "react";
import { getAllProjectList } from "../API/index";
import Loader from "../pages/Loader";
import Table from "../pages/Table";

const ProjectsList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  let abc = ["S.No", "Name", "Status", "Description", "Action"];
  const getAllProjcetData = async () => {
    try {
      const data = await getAllProjectList({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmVmZXJyZWRfdXNlcl9uYW1lIjoiYWthc2hAdGVzdC5jb20iLCJuYW1lIjoiYWthc2ggcGFuZGV5IiwiaWF0IjoxNzAyNDQ5MTY3LCJleHAiOjE3MDI2MjE5Njd9.D3zf5eF2WNkf7B7kvGncPu3U7wPvjBYdq7mAzQRzmi8",
      });
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
    getAllProjcetData();
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
