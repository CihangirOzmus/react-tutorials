import axios from "axios";

const KEY = "AIzaSyDbi3hl0Hwk16Fr2I2wvhbuGn-6Ih56VRg";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 5,
    key: KEY,
  },
});
