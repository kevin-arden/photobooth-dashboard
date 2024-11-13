import axios from "axios";

const API_URL = "https://7la7vd3tu2.execute-api.ap-southeast-1.amazonaws.com/production/history";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
