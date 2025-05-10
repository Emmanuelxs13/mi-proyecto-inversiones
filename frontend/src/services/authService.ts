import axios from "axios";
import { User } from "../types/User";

const API_URL = "http://localhost:3000/api/auth";

export interface LoginResponse {
  token: string;aja
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

export const registerUser = async (
  nombre: string,
  correo: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    nombre,
    correo,
    password,
  });
  return response.data;
};