import axios from "axios";
import { User } from "../types/User";

const API_URL = "http://localhost:3000/api/auth/login";

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (
  correo: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(API_URL, {
    correo,
    password,
  });

  return response.data;
};
