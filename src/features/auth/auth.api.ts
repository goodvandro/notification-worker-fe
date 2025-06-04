import http from "../../api/http"
import type { LoginInputDTO, LoginOutputDTO } from "./auth.types"

export const register = async (username: string, password: string) => {
  const response = await http.post("/auth/register", { username, password })
  return response.data
}

export const login = async (data: LoginInputDTO): Promise<LoginOutputDTO> => {
  const response = await http.post("/auth/login", data)
  return response.data
}