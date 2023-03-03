import { DefaultEventsMap } from "@socket.io/component-emitter";
import io, { Socket } from "socket.io-client";

var socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined = undefined;

export const setupSocket = () => {
  if(!socket){
    socket = io("http://localhost:3031");
    socket.on('connection', () => {
      console.log('Connected via websocket')
    })
  }
  
  return socket;
};
