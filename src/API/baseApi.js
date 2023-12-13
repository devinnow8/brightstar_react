import axios from "axios"


const makeApiCall = async (method, url, data = {}, headers = {}) => {
  // const headers = {
  //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  // }
  const headersWithContentType = {
    ...headers,
  }
  const config = {
    method,
    url,
    headers: headersWithContentType,
    data,
  }
  return await axios.request(config)
}

export default makeApiCall
