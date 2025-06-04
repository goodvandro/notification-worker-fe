export interface Message {
  id: string;
  title: string;
  content: string;
  status: "PENDING" | "SENDING" | "SENT";
  createdAt: string;
}
