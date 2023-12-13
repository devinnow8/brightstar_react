import React, { useEffect, useState } from "react";
import { getUserDetails } from "../API/index";
import Loader from "../pages/Loader";
import Table from "../pages/Table";

const UserList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  let abc = ["S.No", "Name", "Status", "Action"];
  const getAllUsersData = async () => {
    try {
      const data = await getUserDetails();
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
    getAllUsersData();
  }, []);
  console.log(list);

  return (
    <div>
      <div>
        {loading && <Loader />}
        <Table list={list?.data} abc={abc} />
      </div>
      export default ProjectsList;
    </div>
  );
};

export default UserList;
