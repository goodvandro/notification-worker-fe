import http from "../../api/http";
import type { Message } from "./message.type";

export const getMessages = async (): Promise<Message[]> => {
  const response = await http.get("/messages", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
