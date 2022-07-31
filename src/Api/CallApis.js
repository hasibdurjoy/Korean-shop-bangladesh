import axios from "axios";

export const getFunction = async (url) => {
  const response = await axios.get(url);
  return response;
};
