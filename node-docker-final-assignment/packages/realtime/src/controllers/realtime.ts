

// import Logger from '@app/lib/src/logger';

import { web } from '@app/realtime/src/socket';
import { Request, Response } from 'express';

// const logger = new Logger('Realtime', 'realtime.js');

const realtimeHandler = async (req: Request, res: Response): Promise<void> => {
  web.getIO().emit('realtimeEvent', { message: 'Sent from socket io'});
  res.end('Event Sent successfully');
};

export {
  realtimeHandler
};