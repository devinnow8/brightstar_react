import React, { useEffect, useState } from "react";
import { getUserDetails } from "../API/index";
import Loader from "./Loader";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let abc = ["S.No", "Name", "Status", "Description", "Action"];
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
  const detailHandler = (id) => {
    navigate(`/user-details/${id}`, {
      state: {
        id: id,
      },
    });
  };
  useEffect(() => {
    getAllUsersData();
  }, []);
  console.log(list);

  return (
    <div>
      <div>
        {loading && <Loader />}
        <Table list={list?.data} abc={abc} detailHandler={detailHandler} />
      </div>
    </div>
  );
};

export default UserList;
