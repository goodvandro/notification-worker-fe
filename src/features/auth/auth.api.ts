import http from "../../api/http"

export const register = async (username: string, password: string) => {
  const response = await http.post("/auth/register", { username, password })
  return response.data
}