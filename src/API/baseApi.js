import axios from "axios";
import { toast } from "react-toastify";

const makeApiCall = async (method, url, data = {}, headers = {}) => {
  const commonHeaders = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
  const headersWithContentType = {
    ...commonHeaders,
  };
  const config = {
    method,
    url,
    headers: headersWithContentType,
    data,
  };
  axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (err) {
      const status = err.response?.status || 500;
      console.log("err.message", err.message);
      switch (status) {
        // authentication (token related issues)
        case 401: {
          return toast.error("Invalid authentication ");
        }
        // forbidden (permission related issues)
        case 403: {
          return toast.error("forbidden permission");
        }

        // bad request
        case 400: {
          return toast.error("Bad request");
        }

        // not found
        case 404: {
          return toast.error("Not Found");
        }

        // conflict
        case 409: {
          return toast.error("Conflict");
        }

        // unprocessable
        case 422: {
          return toast.error("Unprocessable content");
        }

        // generic api error (server related) unexpected
        default: {
          return toast.error("forbidden permission");
        }
      }
    }
  );

  return await axios.request(config);
};

export default makeApiCall;
