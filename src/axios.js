import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const Options = axios.create({
  baseURL: "https://newsdata.io/api/1/latest",
  params: {
    apikey: apiKey,
  },
});

export default Options;
