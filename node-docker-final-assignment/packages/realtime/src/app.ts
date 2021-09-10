import express from 'express';
import { realtimeHandler } from '@app/realtime/src/controllers/realtime';
import { cors } from '@app/lib/src/middlewares/cors';

const app = express();
app.use(express.json());
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.post('/realtime', realtimeHandler );

// Make sure this is the last middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  if (err instanceof Error) {
    res.status(500).json({ err: 'Something went wrong' });
  }
  else {
    next();
  }
});

export default app;
