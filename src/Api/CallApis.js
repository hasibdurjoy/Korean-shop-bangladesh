import axios from "axios";

export const getFunction = async (url) => {
  const response = await axios.get(url);
  return response;
};

export const postFunction = async (url, data) => {
  const response = await axios.post(url, data);
  return response;
};

export const updateFunction = async (url, data) => {
  const response = await axios.put(url, data);
  return response;
};
