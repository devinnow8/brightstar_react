import React, { useEffect, useState } from "react";
import { getUserDetails } from "../API/index";
import Loader from "./Loader";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getAllUsersData = async () => {
    try {
      const data = await getUserDetails();
      if (data) {
        setList(data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error===>>>", error, error.message);
      setError(true);
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
  let tableHeadings = ["S.No", "Name", "Status", "", "Action"];

  return (
    <div>
      <div>
        {loading && <Loader />}
        {error && <div>Something went wrong</div>}
        {!loading && !error && (
          <Table
            tableHeadings={tableHeadings}
            list={list?.data}
            detailHandler={detailHandler}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
