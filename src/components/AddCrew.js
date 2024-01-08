import { useState, useEffect } from "react";
import {
  getAllCrewUser,
  getProjectTask,
  getUserDetails,
  getCrewCostCodes,
} from "../API";
function useFetch(addCrewModal, crew_id, project_id) {
  const [crewUsers, setCrewUsers] = useState([]);
  const [projectTaskOptions, setProjectTaskOptions] = useState([]);
  // const [costCodesOptions, setCostCodesOptions] = useState([]);
  useEffect(() => {
    console.log("addCrewModaladdCrewModal", addCrewModal);

    if (addCrewModal) {
      if (crew_id) {
        onClickAddCrewTimeDate();
        // getAllCostCodes();
      }
      if (project_id) {
        getAllProjectTasks();
      }
    }
  }, [addCrewModal, crew_id, project_id]);

  const onClickAddCrewTimeDate = async () => {
    await getUserDetails()
      .then(async (res) => {
        // setAllUsers(res?.data);
        const userData = res?.data.slice();
        console.log("userData", userData);
        await getAllCrewUser(crew_id)
          .then((res) => {
            if (res?.status === 200) {
              const filteredCrewUsers = res?.data?.map((ele) => {
                const matchingUser = userData?.find(
                  (crewEle) => ele?.user_id == crewEle?.id
                );
                console.log("eleelelel", ele);
                matchingUser.crew_user_id = ele?.id;
                return {
                  value: matchingUser,
                  label: matchingUser?.name,
                };
              });
              setCrewUsers(filteredCrewUsers);
            }
          })
          .catch((err) =>
            console.log("Error Occured in AddCrewTimeDateModal", err)
          );
      })
      .catch((err) =>
        console.log("error occured in AddCrewTimeDateModal", err)
      );
  };
  const getAllProjectTasks = async () => {
    await getProjectTask(project_id).then((res) => {
      if (res?.status === 200) {
        const dropDownOptions = res?.data?.map((ele) => {
          return { label: ele?.description, value: ele };
        });
        setProjectTaskOptions(dropDownOptions);
      }
    });
  };

  // const getAllCostCodes = async () => {
  //   await getCrewCostCodes(crew_id, entryType).then((res) => {
  //     if (res?.status === 200) {
  //       console.log("getCrewCostCodes ==>", res?.data);
  //       const costCodes = res?.data?.map((ele) => ({
  //         label: ele?.project_cost_code?.description,
  //         value: ele,
  //       }));
  //       setCostCodesOptions(costCodes);
  //     }
  //   });
  // };

  return { projectTaskOptions, crewUsers };
}

export default useFetch;
