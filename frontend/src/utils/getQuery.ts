import http from "./http";

export const getQuery = async (url) => {
  const response = await http.get(url);
  return response;
};