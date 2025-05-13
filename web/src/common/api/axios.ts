import axios from "axios";
import { env } from "../configurations/env";

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});
