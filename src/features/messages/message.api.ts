import http from "../../api/http";
import type { Message, PaginatedResponse } from "./message.type";

export const getMessages = async (
  page = 1,
  limit = 10,
  status?: string
): Promise<PaginatedResponse<Message>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (status) params.append("status", status);

  const response = await http.get(`/messages`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    params,
  });
  return response.data;
};

export const getMessageById = async (id: string): Promise<Message> => {
  const response = await http.get(`/messages/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
