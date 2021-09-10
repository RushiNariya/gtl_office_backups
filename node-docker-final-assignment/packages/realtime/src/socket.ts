import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

let io: Server<DefaultEventsMap>;

export const web = {
  init: (server): Server<DefaultEventsMap> => {
    io = new Server(server);

    return io;
  },
  getIO: (): Server<DefaultEventsMap> => {
    if (!io) {
      throw new Error('Websocket instance not found');
    }

    return io;
  }
};