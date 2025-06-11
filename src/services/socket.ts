import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function initSocket() {
 if (!socket) {
  socket = io("http://localhost:3001", {
    withCredentials: true,
  });
 }
 return socket
}