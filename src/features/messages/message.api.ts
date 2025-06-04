import http from "../../api/http";
import type { Message, PaginatedResponse } from "./message.type";

export const getMessages = async (page = 1, limit = 10): Promise<PaginatedResponse<Message>> => {
  const response = await http.get(`/messages`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    params: { page, limit}
  });
  return response.data;
};
