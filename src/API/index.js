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
export const getCostCodesByProjectId = async (id) => {
  const apiUrl = `${url}/api/project_cost_code?project_id=${id}`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getActiveCostCodes = async (crew_id) => {
  const apiUrl = `${url}/api/crew_project_cost_code?expand=project_cost_code&crew_id=${crew_id}&is_active=true`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getRoleIds = async (id) => {
  const apiUrl = `${url}/api/crew_role`;
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

export const addCostCode = async (data) => {
  const apiUrl = `${url}/api/crew_project_cost_code`;
  return await makeApiCall("post", apiUrl, data, headers);
};

export const removeCostCode = async (data, id) => {
  const apiUrl = `${url}/api/crew_project_cost_code/${id}`;
  return await makeApiCall("put", apiUrl, data, headers);
};

export const getUserDetails = async () => {
  const apiUrl = `${url}/api/user`;
  return await makeApiCall("get", apiUrl, {}, headers);
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

export const getCrewUserByUserId = async (userId) => {
  const apiUrl = `${url}/api/crew_user?expand=crew_role%2Cuser&user_id=${userId}`;
  return await makeApiCall("get", apiUrl, {}, headers);
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

export const getTimeSheet = async (data) => {
  const apiUrl = `${url}/api/time_entry`;
  return await makeApiCall("get", apiUrl, data, headers);
};

export const getCostCodes = async (id) => {
  const apiUrl = `${url}/api/project_cost_code?project_id=${id}`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getProjectTask = async (id) => {
  const apiUrl = `${url}/api/project_task?project_id=${id}`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getCrewCostCodes = async (id) => {
  const apiUrl = `${url}/api/crew_project_cost_code?expand=project_cost_code&crew_id=${id}&is_active=true`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getMyTimeSheetDetails = async (queryParams) => {
  let apiUrl = `${url}/api/time_sheet?expand=crew`;
  if (queryParams) {
    apiUrl = `${url}/api/time_sheet?expand=crew&${queryParams}`;
  }
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getWeekSheet = async (week) => {
  const apiUrl = `${url}/api/time_sheet?expand=crew&week=${week}`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const addMyTimeSheetDetails = async (data) => {
  const apiUrl = `${url}/api/time_sheet?expand=crew`;
  return await makeApiCall("post", apiUrl, data, headers);
};

export const getTimeSheetByWeek = async (data) => {
  const apiUrl = `${url}/api/time_entry/time_sheet_by_week?week=${data?.week}&crew_id=${data?.crew_id}`;
  return await makeApiCall("get", apiUrl, data, headers);
};

// Equipment
export const getCrewEquipmentList = async (id) => {
  const apiUrl = `${url}/api/crew_equipment?expand=crew%2Cequipment&crew_id=${id}`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const getAllEquipmentList = async () => {
  const apiUrl = `${url}/api/equipment`;
  return await makeApiCall("get", apiUrl, {}, headers);
};

export const addCrewEquipment = async (data) => {
  const apiUrl = `${url}/api/crew_equipment?expand=crew%2Cequipment`;
  return await makeApiCall("post", apiUrl, data, headers);
};