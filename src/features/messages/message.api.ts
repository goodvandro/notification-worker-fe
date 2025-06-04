import http from "../../api/http";
import type {
  CreateMessageDTO,
  Message,
  PaginatedResponse,
} from "./message.type";

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

  const response = await http.get(`/messages`, { params });
  return response.data;
};

export const getMessageById = async (id: string): Promise<Message> => {
  const response = await http.get(`/messages/${id}`);
  return response.data;
};

export const createMessage = async (
  data: CreateMessageDTO
): Promise<Message> => {
  const response = await http.post(`/messages`, data);
  return response.data;
};
