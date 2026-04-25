// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/all-users";

// const getAuthHeader = () => ({
//   Authorization: `Bearer ${localStorage.getItem("jwt")}`,
// });

// export const fetchAllUsers = async () => {
//   const res = await axios.get(BASE_URL, {
//     headers: getAuthHeader(),
//   });
//   return res.data;
// };

// export const fetchVerifiedUsers = async () => {
//   const res = await axios.get(`${BASE_URL}/verified`, {
//     headers: getAuthHeader(),
//   });
//   return res.data;
// };

// export const fetchNonVerifiedUsers = async () => {
//   const res = await axios.get(`${BASE_URL}/non-verified`, {
//     headers: getAuthHeader(),
//   });
//   return res.data;
// };
