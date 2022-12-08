export const getApiUrl = (urlSegment) => {
  const projectStatus = "production";
  // const projectStatus = "development";
  const url =
    projectStatus === "development"
      ? `http://www.localhost:4000/${urlSegment}`
      : `https://compras-backend-production.up.railway.app/${urlSegment}`;
  return url;
};
