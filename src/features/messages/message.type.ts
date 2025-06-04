export interface Message {
  id: string;
  title: string;
  content: string;
  status: "PENDING" | "SENDING" | "SENT";
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateMessageDTO {
  title: string;
  content: string;
}