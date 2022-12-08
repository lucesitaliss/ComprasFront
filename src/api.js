export const api = (urlSegment) => {
  const projectStatus = "production";
  const url =
    projectStatus === "development"
      ? "localhost:3000"
      : `https://compras-backend-production.up.railway.app/${urlSegment}`;
  return url;
};
