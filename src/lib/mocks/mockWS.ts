// pages/index.js

import { Socket } from "socket.io-client";

// Mock server behavior
export const mockWSServer = (socket: Socket) => {
    socket.on('message', (message) => {
      console.log('Message received on server:', message);
      // Echo the message back
      socket.emit('message', `Server received: ${message}`);
    });
  };