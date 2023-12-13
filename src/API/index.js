import makeApiCall from "../API/baseApi"

const url = "https://lacewing-living-lacewing.ngrok-free.app";
const headers = `Bearer ${localStorage.getItem("accessToken")}`;

export const brightStarLogin = async (data) => {
    const apiUrl = `${url}/api/login`;
    return await makeApiCall("post", apiUrl, data);
};

export const getAllProjectList = async (data) => {
    const apiUrl = `${url}/api/project`;
    return await makeApiCall("post", apiUrl, data, headers);
};
