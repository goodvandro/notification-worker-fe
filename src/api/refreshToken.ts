import http from "./http";

export const refreshToken = async (refreshToken: string) => {
  const response = await http.post("/auth/refresh", { refreshToken });
  return response.data;
};
