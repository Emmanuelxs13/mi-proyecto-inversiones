import { User } from "../types/User";

export const saveAuthData = (token: string, user: User) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserRole = (): 'admin' | 'usuario' | null => {
  const user = localStorage.getItem("user");
  if (!user) return null;

  return JSON.parse(user).rol;
};
