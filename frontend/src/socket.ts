import io from "socket.io-client";

export const setupSocket = () => {
  const socket = io("http://localhost:3031");
  socket.on('connection', () => {
    console.log('Connected via websocket')
  })
  // socket.emit('subscribe', "abc", "123");
  return socket;
};
