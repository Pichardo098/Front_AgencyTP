import axios from "axios";

export const axiosAgencyTp = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const getConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo"))?.token
      }`,
    },
  };
};
