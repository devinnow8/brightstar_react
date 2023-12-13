import makeApiCall from "../API/baseApi";

const url = "https://lacewing-living-lacewing.ngrok-free.app";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};
export const brightStarLogin = async (data) => {
  const apiUrl = `${url}/api/login`;
  return await makeApiCall("post", apiUrl, data);
};

export const getAllProjectList = async () => {
  const apiUrl = `${url}/api/project`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getProjectDetails = async (id) => {
  const apiUrl = `${url}/api/project/${id}`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getProjectCrews = async (id) => {
  const apiUrl = `${url}/api/crew?project_id=${id}`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

// export const getAllCrew = async (data) => {
//     const apiUrl = `${url}/api/crew_user`;
//     return await makeApiCall("post", apiUrl, data, headers);
// };
