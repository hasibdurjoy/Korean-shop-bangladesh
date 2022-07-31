import axios from "axios";

export const getFunction = async (url) => {
  console.log(url);
  const response = await axios.get(url);
  return response;
};
