// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8000",
// });

// export const getRiskSummary = async () => {
//   const response = await API.get("/risk-summary");
//   return response.data;
// };

// export const getHighRiskProjects = async () => {
//   const response = await API.get("/projects/high-risk");
//   return response.data;
// };

// export const getCriticalWarnings = async () => {
//   const response = await API.get("/warnings/critical");
//   return response.data;
// };

// export const getSectorAnalytics = async () => {
//   const response = await API.get("/analytics/sectors");
//   return response.data;
// };

// export const getStateAnalytics = async () => {
//   const response = await API.get("/analytics/states");
//   return response.data;
// };

// export const getShapImportance = async () => {
//   const response = await API.get("/analytics/shap");
//   return response.data;
// };

// export const getProjects = async () => {
//   const response = await API.get("/projects");
//   return response.data;
// };



// export const searchProjects = async (query) => {
//   const response = await API.get(
//     `/projects/search?q=${encodeURIComponent(query)}`
//   );

//   return response.data;
// };


// export const getProject = async (projectCode) => {
//   const response = await API.get(
//     `/projects/${encodeURIComponent(projectCode)}`
//   );

//   return response.data;
// };


// export const getProjectExplanation = async (projectCode) => {
//   const response = await API.get(
//     `/projects/${encodeURIComponent(projectCode)}/explanation`
//   );

//   return response.data;
// };
















import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});


export const getProjects = async () => {

  const response =
    await API.get("/projects");

  return response.data;

};


export const getRiskSummary = async () => {

  const response =
    await API.get("/risk-summary");

  return response.data;

};


export const getHighRiskProjects = async () => {

  const response =
    await API.get("/projects/high-risk");

  return response.data;

};


export const getCriticalWarnings = async () => {

  const response =
    await API.get("/warnings/critical");

  return response.data;

};


export const getSectorAnalytics = async () => {

  const response =
    await API.get("/analytics/sectors");

  return response.data;

};


export const getStateAnalytics = async () => {

  const response =
    await API.get("/analytics/states");

  return response.data;

};


export const getShapImportance = async () => {

  const response =
    await API.get("/analytics/shap");

  return response.data;

};


export const searchProjects = async (
  query
) => {

  const response =
    await API.get(
      `/projects/search?q=${encodeURIComponent(query)}`
    );

  return response.data;

};


export const getProject = async (
  projectCode
) => {

  const response =
    await API.get(
      `/projects/${encodeURIComponent(projectCode)}`
    );

  return response.data;

};


export const getProjectExplanation =
  async (projectCode) => {

    const response =
      await API.get(
        `/projects/${encodeURIComponent(
          projectCode
        )}/explanation`
      );

    return response.data;

  };