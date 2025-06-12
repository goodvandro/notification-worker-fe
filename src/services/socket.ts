import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;
const socketApiUrl = import.meta.env.VITE_SOCKET_API_URL

export function initSocket() {
 if (!socket) {
  socket = io(socketApiUrl, {
    withCredentials: true,
  });
 }
 return socket
}