import makeApiCall from "../API/baseApi";

const url = "https://webtime.eastus.cloudapp.azure.com";
// const url = "http://webtime.eastus.cloudapp.azure.com:3000";
// const url = "https://lacewing-living-lacewing.ngrok-free.app";

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

export const getRoleIds = async (id) => {
  const apiUrl = `${url}/api/project_role`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getProjectCrews = async (id) => {
  const apiUrl = `${url}/api/crew?project_id=${id}`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getAllCrews = async () => {
  const apiUrl = `${url}/api/crew`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getUserDetails = async (data) => {
  const apiUrl = `${url}/api/user`;
  return await makeApiCall("get", apiUrl, data, headers);
};
export const getProjectUserDetails = async (data) => {
  const apiUrl = `${url}/api/user?expand=role`;
  return await makeApiCall("get", apiUrl, data, headers);
};

export const getUserDetailsInfo = async (id) => {
  const apiUrl = `${url}/api/user/${id}`;
  return await makeApiCall("get", apiUrl, id, headers);
};

export const getAllCrewUser = async (id) => {
  const apiUrl = `${url}/api/crew_user?crew_id=${id}`;
  return await makeApiCall("get", apiUrl, id, headers);
};

export const addNewCrew = async (data) => {
  const apiUrl = `${url}/api/crew`;
  return await makeApiCall("post", apiUrl, data, headers);
};
export const addCrewUser = async (data) => {
  const apiUrl = `${url}/api/crew_user`;
  return await makeApiCall("post", apiUrl, data, headers);
};

export const addProjectUser = async (data) => {
  const apiUrl = `${url}/api/project_user`;
  return await makeApiCall("post", apiUrl, data, headers);
};

export const crewTimeEntryType = async (data) => {
  const apiUrl = `${url}/api/time_entry_type`;
  return await makeApiCall("post", apiUrl, data, headers);
};

export const addCrewTimeEntry = async (data) => {
  const apiUrl = `${url}/api/time_entry`;
  return await makeApiCall("post", apiUrl, data, headers);
};
