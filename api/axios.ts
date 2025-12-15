import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: "http://localhost:5070/api",
});

api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user && config.headers) {
    const token = await user.getIdToken();
    config.headers = new axios.AxiosHeaders(config.headers);
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default api;
