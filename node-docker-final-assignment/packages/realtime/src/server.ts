import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import app from './app';
import { web } from './socket';

const start = async (): Promise<void> => {
  const port: number = parseInt(process.env.PORT);

  const server = app.listen(port, '0.0.0.0');
  const io: Server<DefaultEventsMap> = web.init(server);

  console.log(`Starting Realtime server on port ${port}`);

  io.on('connection', (): void => {
    console.log('Websocket connection created');
  });
};

(async (): Promise<void> => {
  await start();
})();
